import React, { useState } from 'react';
import { Star, Heart, MessageCircle, Send, X, Trash2 } from 'lucide-react';

const CommentSection = () => {
    const [comments, setComments] = useState([
    
    ]);

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
        replies: []
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
            replies: []
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-lg font-semibold mb-2">Delete Comment</h3>
                    <p className="text-gray-600 mb-4">
                        Are you sure you want to delete this comment? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                        onClick={() => {
                        setShowDeleteDialog(false);
                        setCommentToDelete(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                        onClick={deleteComment}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    );

    const RenderComment = ({ comment, depth = 0 }) => (
        <div className={`mb-4 ${depth > 0 ? 'ml-8' : ''}`}>
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            {comment.user[0]}
                        </div>
                        <div className="ml-3">
                            <div className="font-semibold text-gray-800">{comment.user}</div>
                                <div className="text-sm text-gray-500">{comment.timestamp}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {comment.rating ? 
                                (
                                <div className="flex items-center">
                                {[...Array(comment.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                                </div>)
                                : (<span className="text-gray-500 text-sm">Not Rated</span>)}
                            <button 
                                onClick={() => {
                                    setCommentToDelete(comment.id);
                                    setShowDeleteDialog(true);
                                }}
                                className="text-red-500 hover:text-red-600 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
        
                    <p className="text-gray-700 mb-3">{comment.content}</p>
        
                    <div className="flex items-center gap-4">
                        <button 
                        onClick={() => toggleHeart(comment.id)}
                        className={`flex items-center gap-1 transition-colors ${
                        comment.hasHearted ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
                        }`}
                        >
                            <Heart className={`w-5 h-5 ${comment.hasHearted ? 'fill-current' : ''}`} />
                            <span>{comment.hearts}</span>
                        </button>
          
                        <button 
                        onClick={() => setReplyingTo(comment.id)}
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Reply</span>
                        </button>
                    </div>

                    {replyingTo === comment.id && (
                        <div className="mt-3 flex gap-2">
                            <input
                            type="text"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            autoFocus
                            />
                        <button
                        onClick={() => addReply(comment.id, comment)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                        <button
                        onClick={() => setReplyingTo(null)}
                        className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
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
        <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tour Reviews</h2>
      
            <div className="mb-6">
                <div className="flex gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                        >
                            <Star 
                            className={`w-6 h-6 ${star <= rating ? 
                                        'text-yellow-400 fill-current' : 'text-gray-300'}`}
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
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                    onClick={addComment}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
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
                <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No comments yet. Be the first to comment!</p>
                </div>
            )}
            <DeleteDialog />
        </div>
    );
};

export default CommentSection;