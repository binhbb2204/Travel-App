import { BaseItem, Comment, Reply } from '../Models/Comment.js';
import Tour from '../Models/Tour.js';
import Accommodation from '../Models/Accommodation.js';


export const createComment = async (req, res) => {
    const { tourId } = req.params;
    
    try {
        // Create a new comment with its own unique ID
        const newComment = new Comment({
            ...req.body,
            type: 'Comment',
            tourId
        });

        const savedComment = await newComment.save();

        // Update the tour with the new comment
        // await Tour.findByIdAndUpdate(tourId, {
        //     $push: { reviews: savedComment._id }
        // });

        // await Accommodation.findByIdAndUpdate(tourId, {
        //     $push: { reviews: savedComment._id }
        // });

        const tour = await Tour.findById(tourId);
        if (tour) {
            await Tour.findByIdAndUpdate(tourId, {
                $push: { reviews: savedComment._id },
            });
        }

        // Check and update reviews for Accommodation
        const accommodation = await Accommodation.findById(tourId);
        if (accommodation) {
            console.log("really tried");
            await Accommodation.findByIdAndUpdate(tourId, {
                $push: { reviews: savedComment._id },
            });
        }


        res.status(201).json({
            success: true, 
            message: 'Comment created',
            data: savedComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create comment',
            error: error.message
        });
    }
};

export const createReply = async (req, res) => {
    const { commentId, parentReplyId } = req.params;
    
    try {
        // Find the parent comment or reply
        let parentItem;
        if (parentReplyId) {
            parentItem = await BaseItem.findById(parentReplyId);
        } else {
            parentItem = await Comment.findById(commentId);
        }

        if (!parentItem) {
            return res.status(404).json({
                success: false,
                message: 'Parent item not found'
            });
        }

        // Create a new reply
        const newReply = new Reply({
            ...req.body,
            type: parentReplyId ? 'NestedReply' : 'Reply',
            parentId: parentItem._id,
            parentType: parentItem.type,
            originalCommentId: commentId
        });

        // Save the reply
        const savedReply = await newReply.save();

        // Add the reply to the parent's nested replies
        parentItem.nestedReplies.push(savedReply._id);
        await parentItem.save();

        res.status(201).json({
            success: true,
            message: 'Reply created',
            data: savedReply
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create reply',
            error: error.message
        });
    }
};

export const likeItem = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user.id;

    try {
        // Find the item (comment or reply)
        const item = await BaseItem.findById(itemId);
        
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        // Check if user has already liked
        const likeIndex = item.likes.findIndex(
            like => like.toString() === userId
        );

        if (likeIndex === -1) {
            // Add like
            item.likes.push(userId);
            item.hasLiked = true;
        } else {
            // Remove like
            item.likes.splice(likeIndex, 1);
            item.hasLiked = false;
        }

        // Save the updated item
        const savedItem = await item.save();

        res.status(200).json({
            success: true,
            message: 'Like toggled',
            data: savedItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to process like',
            error: error.message
        });
    }
};

export const getTourComments = async (req, res) => {
    const { tourId } = req.params;
    const userId = req.user.id;

    // Pagination parameters with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    try {
        // Find total number of comments
        const totalComments = await Comment.countDocuments({ tourId });

        // Find comments for the specific tour with pagination
        const comments = await Comment.find({ tourId })
            .populate({
                path: 'nestedReplies',
                populate: {
                    path: 'nestedReplies',
                    populate: {
                        path: 'nestedReplies',
                        populate: {
                            path: 'nestedReplies',
                            populate: {
                                path: 'nestedReplies' // Continue to populate all nested levels
                            }
                        } // Continue to populate all nested levels
                        },
                        
                }
            })
            .populate('likes');

        // Mark likes for comments and their nested replies
        const markHasLiked = (items) => {
            return items.map(item => {
                const processedItem = item.toObject ? item.toObject() : item; // Handle Mongoose documents and plain objects
                processedItem.likes = processedItem.likes || []; // Ensure likes is an array
                processedItem.hasLiked = processedItem.likes.some(
                    like => like.toString() === userId
                );
        
                // Process nested replies if available
                if (processedItem.nestedReplies && processedItem.nestedReplies.length) {
                    processedItem.nestedReplies = markHasLiked(processedItem.nestedReplies);
                    processedItem.hasMoreReplies = processedItem.nestedReplies.length >= 3;
                }
        
                return processedItem;
            });
        };

        const processedComments = markHasLiked(comments);

        res.status(200).json({
            success: true,
            data: processedComments,
            pagination: {
                currentPage: page,
                totalComments,
                totalPages: Math.ceil(totalComments / limit),
                totalComments,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tour comments',
            error: error.message
        });
    }
};

export const getMoreReplies = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user.id;

    // Pagination for replies
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skipIndex = (page - 1) * limit;

    try {
        // Find the parent item and its total number of replies
        const parentItem = await BaseItem.findById(itemId);
        const totalReplies = parentItem.nestedReplies.length;

        // Fetch additional replies with pagination
        const moreReplies = await BaseItem.findById(itemId)
            .populate({
                path: 'nestedReplies',
                populate: {
                    path: 'nestedReplies',
                    populate: { path: 'nestedReplies' }
                }
            }).populate('likes');

        // Mark likes for replies
        const markHasLiked = (items) => {
            return items.map(item => {
                const processedItem = item.toObject();
                processedItem.hasLiked = processedItem.likes.some(
                    like => like.toString() === userId
                );

                return processedItem;
            });
        };

        const processedReplies = markHasLiked(moreReplies.nestedReplies);

        res.status(200).json({
            success: true,
            data: processedReplies,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalReplies / limit),
                totalReplies,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch more replies',
            error: error.message
        });
    }
};