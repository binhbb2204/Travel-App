import React, { useState } from 'react';
import { Star, Heart, MessageCircle, Send, X, Trash2 } from 'lucide-react';

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    
    const addComment = () => {
        if (!newComment.trim()) return;
    
        const comment = {
        id: Date.now(),
        user: "Current User",
        content: newComment,
        rating: rating,
        hearts: 0,
        hasHearted: false,
        timestamp: new Date().toLocaleString(),
        replies: [],
        isReply: false
        };
    
        setComments([comment, ...comments]);
        setNewComment("");
        setRating(0);
    };

    const toggleHeart = (commentId) => {
        const updateHearts = (comments, targetId) => {
            return comments.map(comment => {
                if (comment.id === targetId){
                    return {
                        ...comment,
                        hearts: comment.hasHearted ? comment.hearts - 1 : comment.hearts + 1,
                        hasHearted: !comment.hasHearted
                    };
                }
                if (comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: updateHearts(comment.replies, targetId)
                    };
                }
                return comment;
            });
        };

        setComments(updateHearts(comments, commentId));
    };

    const deleteComment = () => {
        if (!commentToDelete) return;

        const deleteFromComments = (comments, targetId) => {
            return comments.filter(comment => {
                if (comment.id === targetId) {
                    return false;
                }
                if (comment.replies.length > 0) {
                    comment.replies = deleteFromComments(comment.replies, targetId);
                }
                return true;
            });
        };

        setComments(deleteFromComments(comments, commentToDelete));
        setShowDeleteDialog(false);
        setCommentToDelete(null);
    };

    const addReply = (commentId, parentComment) => {
        if (!replyContent.trim()) return;

        const reply = {
            id: Date.now(),
            user: "Current User",
            content: replyContent,
            hearts: 0,
            hasHearted: false,
            timestamp: new Date().toLocaleString(),
            replies: [],
            isReply: true
        };

        const updateReplies = (comments, targetId) => {
            return comments.map(comment => {
                if (comment.id === targetId) {
                    return {
                        ...comment,
                        replies: [...comment.replies, reply]
                    };
                }
                if (comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: updateReplies(comment.replies, targetId)
                    };
                }
                return comment;
            });
        };

        setComments(updateReplies(comments, commentId));
        setReplyingTo(null);
        setReplyContent("");
    };

    const DeleteDialog = () => (
        showDeleteDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-4 md:p-6 max-w-md w-full mx-4">
                    <h3 className="text-lg font-semibold mb-2">Delete Comment</h3>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                        Are you sure you want to delete this comment? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2 md:gap-3">
                        <button
                            onClick={() => {
                                setShowDeleteDialog(false);
                                setCommentToDelete(null);
                            }}
                            className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteComment}
                            className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    );

    const RenderComment = ({ comment, depth = 0 }) => (
        <div className={`mb-4 ${depth > 0 ? 'ml-2 md:ml-8' : ''}`}>
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <div className="flex items-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm md:text-base font-bold">
                            {comment.user[0]}
                        </div>
                        <div className="ml-2 md:ml-3">
                            <div className="font-semibold text-gray-800 text-sm md:text-base">{comment.user}</div>
                            <div className="text-xs md:text-sm text-gray-500">{comment.timestamp}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        { comment.rating ? (
                            <div className="flex items-center">
                                {[...Array(comment.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 md:w-4 h-3 md:h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                        ) 
                        : 
                        (
                            (!comment.isReply && 
                                <span className="text-gray-500 text-xs md:text-sm">
                                    Not Rated
                                </span>
                            )
                        )}
                        <button 
                            onClick={() => {
                                setCommentToDelete(comment.id);
                                setShowDeleteDialog(true);
                            }}
                            className="text-red-500 hover:text-red-600 transition-colors"
                        >
                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>
        
                <p className="text-gray-700 text-sm md:text-base mb-3">{comment.content}</p>
        
                <div className="flex items-center gap-3 md:gap-4">
                    <button 
                        onClick={() => toggleHeart(comment.id)}
                        className={`flex items-center gap-1 transition-colors ${
                            comment.hasHearted ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
                        }`}
                    >
                        <Heart className={`w-4 h-4 md:w-5 md:h-5 ${comment.hasHearted ? 'fill-current' : ''}`} />
                        <span className="text-sm md:text-base">{comment.hearts}</span>
                    </button>
          
                    <button 
                        onClick={() => setReplyingTo(comment.id)}
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">Reply</span>
                    </button>
                </div>

                {replyingTo === comment.id && (
                    <div className="mt-3 flex gap-2">
                        <input
                            type="text"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 p-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            autoFocus
                        />
                        <button
                            onClick={() => addReply(comment.id, comment)}
                            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setReplyingTo(null)}
                            className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {comment.replies.map(reply => (
                <RenderComment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto p-3 md:p-4 bg-gray-50 rounded-xl">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Tour Reviews</h2>
      
            <div className="mb-4 md:mb-6">
                <div className="flex gap-1 md:gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                        >
                            <Star 
                                className={`w-5 h-5 md:w-6 md:h-6 ${
                                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                            />
                        </button>
                    ))}
                </div>
        
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your experience..."
                        className="flex-1 p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={addComment}
                        className="bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Post
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {comments.map(comment => (
                    <RenderComment key={comment.id} comment={comment} />
                ))}
            </div>
            
            {comments.length === 0 && (
                <div className="text-center py-6 md:py-8 text-gray-500">
                    <MessageCircle className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-gray-300" />
                    <p className="text-sm md:text-base">No comments yet. Be the first to comment!</p>
                </div>
            )}
            <DeleteDialog />
        </div>
    );
};

export default CommentSection;