import Comment from "../Models/Comment.js";
import Tour from "../Models/Tour.js";


export const createComment = async(req, res) => {
    const {body, parentId, replyingToUser, rating, taggedUsers } = req.body;
    const {tourId} = req.params;
    const userId = req.user.id;
    
    try {
        if (rating && parentId) {
            return res.status(400).json({ message: "Replies cannot have ratings" });
        }
        const newComment = await Comment.create({
            body,
            tourId,
            parentId: parentId || null, // null for root comments
            userId,
            replyingToUser,
            rating: rating || null,
            taggedUsers: taggedUsers || [],
        });

        await newComment.populate('userId', 'name');

        await Tour.findByIdAndUpdate(
            tourId,
            { $push: { reviews: newComment._id } },
            { new: true }
        )

        res.status(201).json({success: true, message: "Comment added successfully", data: newComment});
    } catch (error) {
        res.status(500).json({ message: "Error creating comment", error });
    }

}
export const getComments = async(req, res) => {
    const {tourId} = req.params;
    try {
        const comments = await Comment.find({ tourId })
                    .populate("userId", "name")
                    .populate("likes", "_id");


        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching comments", error });
    }
}

export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { body, likes } = req.body;
    const userId = req.user.id;
    
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ 
                success: false, 
                message: "Comment not found" 
            });
        }
        if (likes !== undefined) {
            const isLiked = comment.likes.includes(userId);
            
            if (isLiked) {
                comment.likes = comment.likes.filter(likeId => likeId.toString() !== userId);
            } else {
                comment.likes.push(userId);
            }

            await comment.save();

            await comment.populate('userId', 'name');

            return res.status(200).json({ 
                success: true, 
                message: isLiked ? "Like removed" : "Like added", 
                data: comment 
            });
        }
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to update this comment" 
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { body },
            { new: true } 
        );

        res.status(200).json({ 
            success: true, 
            message: "Comment updated successfully", 
            data: updatedComment 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error updating comment", 
            error: error.message 
        });
    }
};


export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
  
    try {
        const comment = await Comment.findByIdAndDelete(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (String(comment.userId) !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }
  
        if (!comment.parentId) {
            await Comment.deleteMany({ parentId: commentId });
        }
        await Tour.findByIdAndUpdate(
            comment.tourId,
            {$pull: {reviews: commentId}},
            {new: true}
        )
  
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error });
    }
};