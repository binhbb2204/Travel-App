import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, Send, X, Trash2, Star, Heart, Smile, Frown, Meh, SmilePlusIcon } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import './comment-section.css'

const ReactionIcons = {
    like: ThumbsUp,
    heart: Heart,
    haha: Smile,
    wow: Meh,
    sad: Frown,
};

const CommentSection = ({ tourId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [replyingToUser, setReplyingToUser] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState(false);
    useEffect(() => {
        // fetch comments for this specific tour
        // For now, just reset comments when tourId changes
        setComments([]);
    }, [tourId]);
    const addComment = () => {
        if (!newComment.trim()) return;
    
        const comment = {
            id: Date.now(),
            tourId: tourId,
            user: "Current User",
            content: newComment,
            rating: rating,
            likes: 0,
            hasLiked: false,
            timestamp: new Date().toLocaleString(),
            replies: [],
            isReply: false
        };
    
        setComments([comment, ...comments]);
        setNewComment("");
        setRating(0);
        // Here you would typically save the reply to your backend
    };

    const onEmojiClick = (emojiObject, isReply = false) => {
        if(isReply){
            setReplyContent(prevContent => prevContent + emojiObject.emoji);
            setShowReplyEmojiPicker(false);
        }
        else{
            setNewComment(prevComment => prevComment + emojiObject.emoji);
            setShowEmojiPicker(false);
        }
    };

    const startReply = (commentId, username) => {
        setReplyingTo(commentId);
        setReplyingToUser(username);
        setReplyContent("");
    };

    const toggleLike = (commentId) => {
        const updateLikes = (comments, targetId) => {
            return comments.map(comment => {
                if (comment.id === targetId) {
                    return {
                        ...comment,
                        likes: comment.hasLiked ? comment.likes - 1 : comment.likes + 1,
                        hasLiked: !comment.hasLiked
                    };
                }
                if (comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: updateLikes(comment.replies, targetId)
                    };
                }
                return comment;
            });
        };

        setComments(updateLikes(comments, commentId));
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

    const addReply = (commentId) => {
        let finalReplyContent = replyContent.trim();

        if (!finalReplyContent && replyingToUser) {
        finalReplyContent = " ";
        }
        
        const hasMention = finalReplyContent.startsWith(`@${replyingToUser}`);

        if (!finalReplyContent) return;
        const reply = {
            id: Date.now(),
            user: "Current User",
            tourId: tourId,
            content: finalReplyContent,
            replyingTo:  hasMention ? replyingToUser : null,
            likes: 0,
            hasLiked: false,
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
        setReplyingToUser(null);
        setReplyContent("");

        // Here you would typically save the reply to your backend
    };
    const handleInputChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handgleReplyKeyDown = (e) => {
        if(e.key === 'Backspace' && 
            replyingToUser && 
            replyContent === `@${replyingToUser}` && 
            e.target.selectionStart === e.target.selectionEnd){
            
            e.preventDefault();
            setReplyingToUser(null);
            setReplyContent('');
        }
    }
    useEffect(() => {
        // Set initial value when replyingToUser changes
        if (replyingToUser) {
          setReplyContent(`@${replyingToUser}`);
        }
    }, [replyingToUser]);

    const DeleteDialog = () => (
        showDeleteDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                    <h3 className="text-base md:text-lg font-semibold mb-2">Delete Comment</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4">
                        Are you sure you want to delete this comment? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => {
                                setShowDeleteDialog(false);
                                setCommentToDelete(null);
                            }}
                            className="px-3 md:px-4 py-1.5 md:py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteComment}
                            className="px-3 md:px-4 py-1.5 md:py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    );


    const RenderComment = ({ comment, depth = 0 }) => (
        <div className={`mb-2 ${depth > 0 ? 'ml-4 md:ml-12' : ''}`}>
            <div className="flex gap-2">
                <div className="flex-shrink-0">
                    <div className="w-6 h-6 md:w-8 md:h-8 
                                rounded-full 
                                bg-blue-600 flex items-center justify-center 
                                text-white text-xs md:text-base font-bold">
                        {comment.user[0]}
                    </div>
                </div>
                <div className="flex-grow min-w-0">
                    <div className="bg-gray-100 rounded-2xl px-2 md:px-3 py-1.5 md:py-2">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                            <div className="font-semibold text-xs md:text-sm">{comment.user}</div>
                            {!comment.isReply && (
                                <div className="flex items-center">
                                    {comment.rating === 0 ? (
                                        <span className="text-xs md:text-sm text-gray-500">Not Rated</span>
                                    ):
                                    (
                                        <div className="flex">
                                            {[...Array(comment.rating)].map((_, i) => (
                                                <Star key={i} className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current"/>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <p className=" text-xs md:text-sm mt-1 break-words">
                            {comment.replyingTo ? (
                                <span>
                                    <span className="font-semibold text-blue-600">{comment.replyingTo}</span>
                                    {' '}
                                    {comment.content.replace(`@${comment.replyingTo}`, '').trim()}
                                </span>
                            ): (
                                <span>{comment.content}</span>
                            )}
                            
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs flex-wrap">
                        <button 
                            onClick={() => toggleLike(comment.id)}
                            className={`font-semibold ${comment.hasLiked ? 
                                                        'text-blue-600' : 
                                                        'text-gray-500 hover:text-gray-700'}`}
                        >
                            Like
                        </button>
                        <button 
                            onClick={() => startReply(comment.id, comment.user)}
                            className="font-semibold text-gray-500 hover:text-gray-700"
                        >
                            Reply
                        </button>
                        <span className="text-gray-500 text-[10px] md:text-xs">{comment.timestamp}</span>
                        {comment.likes > 0 && (
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-600 flex items-center justify-center">
                                    <ThumbsUp className="w-2 h-2 text-white" />
                                </div>
                                <span className="text-gray-500">{comment.likes}</span>
                            </div>
                        )}
                        <button 
                            onClick={() => {
                                setCommentToDelete(comment.id);
                                setShowDeleteDialog(true);
                            }}
                            className="text-gray-500 hover:text-red-500"
                        >
                            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                    </div>

                    {replyingTo === comment.id && (
                        <div className="mt-2 flex gap-2">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full 
                                        bg-blue-600 
                                        flex items-center justify-center 
                                        text-white text-xs font-bold">
                                C
                            </div>
                            <div className="flex-grow flex gap-2 min-w-0">
                                <div className="flex-grow relative">
                                    
                                    <input
                                        type="text"
                                        value={replyContent}
                                        onChange={handleInputChange}
                                        onKeyDown={handgleReplyKeyDown}
                                        placeholder="Write a reply..."
                                        className="w-full px-2 md:px-3 py-1 
                                                bg-gray-100 rounded-full 
                                                text-xs md:text-sm 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                        <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowReplyEmojiPicker(!showReplyEmojiPicker);
                                        }}
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                        >
                                            <SmilePlusIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                                
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => addReply(comment.id)}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        setReplyingTo(null);
                                        setReplyingToUser(null);
                                    }}
                                    className="text-gray-500 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            {showReplyEmojiPicker && (
                                <div className="absolute right-0 z-50 mt-5">
                                    <EmojiPicker 
                                    onEmojiClick={(emojiObject) => onEmojiClick(emojiObject, true)} 
                                    width={280}
                                    height={400}/>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {comment.replies.map(reply => (
                <RenderComment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
        </div>
    );

    return (
        <div className="w-full mx-auto p-2 md:p-4 relative " style={{ marginBottom: "15rem" }}>
            <div className="mb-4">
                <div className="flex gap-1 mb-2 ml-8 md:ml-12">
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
                    {rating === 0 && (
                        <span className="text-xs md:text-sm text-gray-500 ml-2 self-center">Not Rated</span>
                    )}
                </div>
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full 
                                bg-blue-600 
                                flex items-center justify-center 
                                text-white font-bold">
                        C
                    </div>
                    <div className="flex-grow flex gap-2 relative">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a review for this tour..."
                            className="flex-grow px-4 py-1.5 md:py-2 
                                    bg-gray-100 rounded-full 
                                    text-sm 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute right-16 top-1/2 -translate-y-1/2">
                            <button 
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-1 hover:bg-gray-200 rounded-full"
                            >
                                <SmilePlusIcon className="w-5 h-5 text-gray-500" />
                                
                            </button>
                        </div>
                        <button
                            onClick={addComment}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* This will show emoji option like Fb */}
            {showEmojiPicker && (
                <div className="absolute right-0 z-50 mt-2 emoji-picker-container">
                    <div className="transform scale-75 md:scale-100 origin-top-right">
                        <EmojiPicker
                            onEmojiClick={(emojiObject) => {
                                setNewComment(prev => prev + emojiObject.emoji);
                                setShowEmojiPicker(false);
                            }}
                            width={280}
                            height={400}
                        />
                    </div>
                </div>
            )}

            <div>
                {comments.map(comment => (
                    <RenderComment key={comment.id} comment={comment} />
                ))}
            </div>
            
            {comments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No comments yet. Be the first to comment!</p>
                </div>
            )}
            <DeleteDialog />
        </div>
    );
};

export default CommentSection;