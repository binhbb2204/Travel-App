import Tour from "../Models/Tour.js"
import Comment from '../Models/Comment.js'


export const createComment = async (req, res) => {
    const tourId = req.params.tourId;
    const newComment = new Comment({
        ...req.body,
        
    });
    try {
        const savedComment = await newComment.save();

        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedComment._id },
        });

        res.status(201).json({ success: true, message: 'Comment added', data: savedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add comment', error });
    }
}

export const createReply = async(req, res) => {
    const { commentId } = req.params; // ID of the parent comment
    const { 
        content, 
        user, 
        replyingTo, 
        parentReplyId // Optional: if replying to a specific nested reply
    } = req.body;

    const newReply = {
        user,
        content,
        replyingTo: replyingTo || null, // Tag the user being replied to
        parentCommentId: commentId,
        parentReplyId: parentReplyId || null, // ID of the reply being replied to
        timestamp: Date.now(),
    };

    try {
        // Find the parent comment and add the reply
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $push: { replies: newReply } },
            { new: true, runValidators: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        res.status(201).json({ success: true, message: "Reply added", data: updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add reply", error });
    }
}