import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, Send, X, Trash2, Star, SmilePlusIcon, AlertTriangle } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { commentService } from '../../data/Service/commentService';
import {authService} from '../../data/Service/authService';
import { useNavigate } from 'react-router-dom';

const DeleteConfirmModal = ({
    isOpen, 
    onClose, 
    onConfirm, 
    commentUsername 
}) => {
    if(!isOpen) return null;

    return (
        <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        style={{ 
            touchAction: 'none',
            position: 'fixed',
            overflow: 'hidden'
        }}
        >
            <div 
            className="bg-white rounded-lg mw-full max-w-md shadow-xl transform transition-all mx-auto p-4 md:p-6 relative">
                <div className="flex items-center mb-4 text-red-500">
                    <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 mr-2"/>
                    <h2 className="text-base md:text-lg font-semibold">
                        Delete Comment
                    </h2>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mb-4">
                    Are you sure you want to delete this comment by{' '}
                    <span className="font-medium">{commentUsername}</span>? 
                    This action cannot be undone.
                </p>
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <button 
                        onClick={onClose}
                        className="w-full sm:w-auto 
                            px-4 py-2 text-sm 
                            text-gray-600 hover:bg-gray-100 
                            rounded-md mb-2 sm:mb-0
                            transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="w-full sm:w-auto 
                            px-4 py-2 text-sm 
                            bg-red-500 text-white 
                            hover:bg-red-600 
                            rounded-md
                            transition-colors duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
const CommentSection = ({ tourId, accoId, commentService, availableUsers = []  }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0);
    const [activeComment, setActiveComment] = useState(null);
    const [showMainEmojiPicker, setShowMainEmojiPicker] = useState(false);
    const [showUserTagMenu, setShowUserTagMenu] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const entityId = tourId || accoId;
    const idParamName = tourId ? 'tourId' : 'accoId';
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        commentId: null,
        commentUsername: '',
    });
    
    // console.log(comments.id);
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    useEffect(() => {
        const user = authService.getCurrentUser();
        console.log('Current User:', user);
        if (user.token) {
            setCurrentUser(user);
        }
        else {
            setCurrentUser(null);
        }
    
        const fetchComments = async () => {
            try {
                const response = await commentService.getComments(entityId);
                
                const transformedComments = response.data.map(comment => ({
                    ...comment,
                    id: comment._id,
                    username: comment.userId?.name || 'Anonymous', 
                    likes: comment.likes || [],
                    createdAt: comment.createAt,
                    isLikedByCurrentUser: comment.likes.includes(currentUser?.id),
                }));
                
                setComments(transformedComments);
            } catch (err) {
                setError("Failed to load comments");
                console.error(err);
            }
        };
    
        fetchComments();
    }, [entityId, commentService]);

    useEffect(() => {
        const saveComments = () => {
            localStorage.setItem(`tour-comments-${entityId}`, JSON.stringify(comments));
        };

        saveComments();
    }, [comments, entityId]);

    const addComment = async (text, parentId = null, replyingToUser = null, taggedUsers = []) => {
        if (!isAuthenticated()) {
            alert('Please log in to comment');
            navigate('/login');
            return;
        }
    
        // If text is empty, do nothing
        if (!text.trim()) return;
    
        try {
            const commentData = {
                body: text,
                parentId: parentId,
                replyingToUser: replyingToUser,
                rating: parentId ? null : (rating === 0 ? null : rating),
                taggedUsers: taggedUsers
            }
            
            const response = await commentService.createComment(entityId, commentData);
            console.log('Full Comment Creation Response:', response);
            console.log('Comment Data:', response.data);
            console.log('Actual Comment:', response.data.data);
            const serverComment = response.data.data;
    
            const newCommentObj = {
                id: serverComment._id,
                body: serverComment.body,
                parentId: serverComment.parentId,
                username: currentUser?.username || serverComment.userId?.name || 'Anonymous',
                userId: serverComment.userId,
                likes: serverComment.likes || [],
                rating: serverComment.rating,
                createdAt: serverComment.createdAt,
                taggedUsers: serverComment.taggedUsers || []
            };
    
            console.log('Constructed New Comment Object:', newCommentObj);
    
            setComments(prevComments => {
                const isDuplicate = prevComments.some(comment => comment.id === newCommentObj.id);

                if (isDuplicate) {
                    console.log('Duplicate comment prevented');
                    return prevComments;
                }
    
                return [newCommentObj, ...prevComments];
            });
            setNewComment("");
            setRating(0);
            setActiveComment(null);
        } catch (error) {
            console.error('Failed to add comment:', error.response ? error.response.data : error);
            alert('Failed to post comment. Please try again.');
        }
    };

    const toggleLike = async (commentId) => {

        if (!isAuthenticated()) {
            alert('Please log in to like a comment');
            navigate('/login');
            return;
        }

        try {
            await commentService.toggleLike(commentId);
            setComments(prevComments => prevComments.map(comment => {
                if(comment.id === commentId) {
                    const isLiked = comment.likes.includes(currentUser.id)
                    return{
                        ...comment,
                        likes: isLiked 
                            ? comment.likes.filter(userId => userId !== currentUser.id)
                            : [...comment.likes, currentUser.id],
                        isLikedByCurrentUser: !isLiked,
                    }
                }
                return comment;
            }))
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
        
    }

    const updateComment = async (text, commentId) => {
        try {
            const response = await commentService.updateComment(commentId, { body: text });
            console.log('Update response:', response); // Log the full response
            setComments(prevComments =>
                prevComments.map(comment => {
                    return comment.id === commentId
                        ? { ...comment, body: text }
                        : comment
                })
            );
            setActiveComment(null);
        } catch (error) {
            console.error('Failed to update comment:', error.response?.data || error.message);
            alert(`Failed to update comment: ${error.response?.data?.message || error.message}`);
        }
    };

    const deleteComment = async (commentId, commentUsername) => {
        // Open confirmation modal
        setDeleteConfirmation({
            isOpen: true,
            commentId,
            commentUsername,
        });
    };

    const confirmDeleteComment = async () => {
        try {
            const { commentId } = deleteConfirmation;
            await commentService.deleteComment(commentId);
            
            setComments(prevComments =>
                prevComments.filter(comment => comment.id !== commentId)
            );
            
            // Close the confirmation modal
            setDeleteConfirmation({
                isOpen: false,
                commentId: null,
                commentUsername: '',
            });
        } catch (error) {
            console.error('Failed to delete comment:', error);
            alert('Failed to delete comment. Please try again.');
        }
    };

    const getReplies = (commentId) => {
        return comments.filter(comment => comment.parentId === commentId)
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    };

    const CommentComponent = ({ comment, replies, depth = 0 }) => {
        const [localEmojiPicker, setLocalEmojiPicker] = useState(false);
        const [localReplyText, setLocalReplyText] = useState("");
        const [localTaggedUsers, setLocalTaggedUsers] = useState([]);
        const [editText, setEditText] = useState(comment.body);

        if (!comment) return null;

        const commentLikes = comment.likes || [];

        const isEditing = 
            activeComment && 
            activeComment.id === comment.id && 
            activeComment.type === 'editing';

        const isReplying = 
            activeComment && 
            activeComment.id === comment.id && 
            activeComment.type === 'replying';

        const canEdit = comment.userId?._id === currentUser.userId;
        const canDelete = comment.userId?._id === currentUser.userId;
        console.log("current user id currentUser?.userId",currentUser.userId);
        console.log("current user id comment.userId",comment.userId)
        const onEmojiClick = (emojiObject, isReply = false) => {
            if (isReply) {
                setLocalReplyText(prev => prev + emojiObject.emoji);
                setLocalEmojiPicker(false);
            } else {
                setNewComment(prev => prev + emojiObject.emoji);
                setShowMainEmojiPicker(false);
            }
        };
        
        const handleTagUser = (user) => {
            setLocalTaggedUsers(prev => 
                prev.includes(user)
                ? prev.filter(u => u !== user)
                : [...prev, user]
            )
            setLocalReplyText(prev => `${prev} ${user}`);
        }

        return (
            <div className={`mb-2 ${depth > 0 ? 'ml-4 md:ml-12' : ''}`}>
                <div className="flex gap-2">
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 md:w-8 md:h-8 
                            rounded-full 
                            bg-blue-600 flex items-center justify-center 
                            text-white text-xs md:text-base font-bold">
                            {comment.username?.[0] || '?'}
                        </div>
                    </div>
                    <div className="flex-grow min-w-0">
                        {!isEditing ? (
                            <div className="bg-gray-100 rounded-2xl px-2 md:px-3 py-1.5 md:py-2">
                                <div className="flex items-center justify-between flex-wrap gap-1">
                                    <div className="font-semibold text-xs md:text-sm">
                                        {comment.username}
                                    </div>
                                    {comment.rating ? (
                                        <div className="flex">
                                            {[...Array(comment.rating)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current"
                                                />
                                            ))}
                                        </div>
                                    ):
                                    (
                                        comment.parentId ? null : (
                                            <span className="text-xs text-gray-500 ml-2">Not Rated</span>
                                        )
                                    )}
                                </div>
                                <p className="text-xs md:text-sm mt-1 break-words">
                                {comment.body?.split(' ').map((word, index) =>
                                    word.startsWith('@') ? (
                                        <span key={index} className="text-blue-600 font-semibold">
                                            {word}{' '}
                                        </span>
                                    ) : (
                                        <span key={index}>{word}{' '}</span>
                                    )
                                )}
                                </p>
                                {comment.taggedUsers && comment.taggedUsers.length > 0 && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        Tagged: {comment.taggedUsers.join(', ')}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-gray-100 rounded-2xl p-2">
                                <textarea
                                    className="w-full bg-white p-2 rounded"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            updateComment(editText, comment.id);
                                        }
                                    }}
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button 
                                        onClick={() => setActiveComment(null)}
                                        className="text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={() => updateComment(editText, comment.id)}
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-[10px] md:text-xs flex-wrap">
                            {/* Like button with count */}
                            <button
                                onClick={() => toggleLike(comment.id)}
                                className={`flex items-center gap-1 
                                    ${comment.likes.includes(currentUser.id) 
                                        ? 'text-blue-600' 
                                        : 'text-gray-500'
                                    } hover:text-blue-700`}
                            >
                                <ThumbsUp 
                                    className={`w-3 h-3 md:w-4 md:h-4 
                                        ${comment.likes.includes(currentUser.id) 
                                            ? 'fill-current' 
                                            : ''
                                        }`} 
                                />
                                {comment.likes.length > 0 && comment.likes.length}
                            </button>
                            {canEdit && (
                                <button 
                                    onClick={() => setActiveComment({ 
                                        id: comment.id, 
                                        type: 'editing' 
                                    })}
                                    className="font-semibold text-gray-500 hover:text-gray-700"
                                >
                                    Edit
                                </button>
                            )}
                            <button 
                                onClick={() => setActiveComment({ 
                                    id: comment.id, 
                                    type: 'replying' 
                                })}
                                className="font-semibold text-gray-500 hover:text-gray-700"
                            >
                                Reply
                            </button>
                            {canDelete && (
                                <button 
                                    onClick={() => deleteComment(comment.id, comment.username)}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            )}
                        </div>

                        {isReplying && (
                            <div className="mt-2 flex gap-2 relative">
                                <textarea
                                    className="flex-grow px-2 py-1 bg-gray-100 rounded"
                                    placeholder={`Reply to ${comment.username}...`}
                                    value={localReplyText}
                                    onChange={(e) => setLocalReplyText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            if (localReplyText.trim()) {
                                                addComment(localReplyText, comment.id, comment.username, localTaggedUsers);
                                                setLocalReplyText("");
                                                setLocalTaggedUsers([]);
                                            }
                                        }
                                    }}
                                />
                                <div className="absolute right-16 top-1/2 -translate-y-1/2">
                                    <button 
                                        onClick={() => setLocalEmojiPicker(!localEmojiPicker)}
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                    >
                                        <SmilePlusIcon className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        if (localReplyText.trim()) {
                                            addComment(localReplyText, comment.id, comment.username, localTaggedUsers);
                                            setLocalReplyText("");
                                            setLocalTaggedUsers([]);
                                        }
                                    }}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveComment(null);
                                        setLocalReplyText("");
                                        setLocalTaggedUsers([]);
                                    }}
                                    className="text-gray-500 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                {localEmojiPicker && (
                                    <div className="absolute right-0 top-full z-50 mt-2 emoji-picker-container">
                                        <EmojiPicker
                                            onEmojiClick={(emoji) => onEmojiClick(emoji, true)}
                                            width={280}
                                            height={400}
                                        />
                                    </div>
                                )}
                                {/* User Tag Menu */}
                                {showUserTagMenu && (
                                    <div className="absolute right-0 top-full z-50 mt-2 
                                    bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto">
                                        {availableUsers.map(user => (
                                            <button
                                                key={user}
                                                onClick={() => handleTagUser(user)}
                                                className={`w-full text-left px-3 py-2 hover:bg-gray-100 
                                                    ${localTaggedUsers.includes(user) 
                                                        ? 'bg-blue-50 text-blue-600' 
                                                        : ''
                                                    }`}
                                            >
                                                @{user}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {replies.map(reply => (
                    <CommentComponent 
                        key={reply.id} 
                        comment={reply} 
                        replies={getReplies(reply.id)} 
                        depth={depth + 1} 
                    />
                ))}
            </div>
        );
    };

    // Get root comments (comments with no parentId)
    const rootComments = comments.filter(comment => comment.parentId === null);

    return (
        <div className="w-full mx-auto p-2 md:p-4 relative mt-20" style={{ marginBottom: "15rem" }}>
            {/* Rating for root comments */}
            <div className="mb-4">
                <div className="flex gap-1 mb-2 ml-8 md:ml-12">
                    {!activeComment && (
                        <>
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
                                <span className="text-xs md:text-sm text-gray-500 ml-2 self-center">
                                    Not Rated
                                </span>
                            )}
                        </>
                    )}
                </div>

                {/* Main comment input */}
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full 
                        bg-blue-600 
                        flex items-center justify-center 
                        text-white font-bold">
                        C
                    </div>
                    <div className="flex-grow flex gap-2 relative">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a review for this tour..."
                            className="flex-grow px-4 py-1.5 md:py-2 
                                bg-gray-100 rounded-md
                                text-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={1}
                        />
                        <div className="absolute right-16 top-1/2 -translate-y-1/2">
                            <button 
                                onClick={() => setShowMainEmojiPicker(!showMainEmojiPicker)}
                                className="p-1 hover:bg-gray-200 rounded-full"
                            >
                                <SmilePlusIcon className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                if (newComment.trim()) {
                                    addComment(newComment);
                                }
                            }}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Emoji Picker */}
            {showMainEmojiPicker && (
                <div className="absolute right-0 z-50 mt-2 emoji-picker-container">
                    <EmojiPicker
                        onEmojiClick={(emoji) => {
                            setNewComment(prev => prev + emoji.emoji);
                            setShowMainEmojiPicker(false);
                        }}
                        width={280}
                        height={400}
                    />
                </div>
            )}

            {/* Comments List */}
            <div>
                {rootComments.map(comment => (
                    <CommentComponent
                        key={comment.id}
                        comment={comment}
                        replies={getReplies(comment.id)}
                    />
                ))}
            </div>

            {/* Empty state */}
            {comments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No comments yet. Be the first to comment!</p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal 
                isOpen={deleteConfirmation.isOpen}
                onClose={() => setDeleteConfirmation({ 
                    isOpen: false, 
                    commentId: null, 
                    commentUsername: '' 
                })}
                onConfirm={confirmDeleteComment}
                commentUsername={deleteConfirmation.commentUsername}
            />
        </div>
    );
};

export default CommentSection;
