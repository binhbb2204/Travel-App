import mongoose from 'mongoose';


// Define the Reply schema
const replySchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    originalCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    replyingTo: {
        type: String,
        default: null, // Username being replied to
    },
    likes: {
        type: Number,
        default: 0,
    },
    hasLiked: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isReply: {
        type: Boolean,
        default: true,
    },
    replies: {
        type: [this], // Allow nested replies within replies
        default: [],
    },
});


// Define the Comment schema
const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,  // Not Rated (0), or any star rating (1-5)
    },
    likes: {
        type: Number,
        default: 0,
    },
    hasLiked: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    replies: {
        type: [replySchema], // Embed replies as subdocuments
        default: [],
    },
    isReply: {
        type: Boolean,
        default: false,  // Determines if this comment is a reply or not
    },
    replyingTo: {
        type: String,
        default: null, // User being replied to, if any (example: "@user")
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour', // Reference to the Tour model (you can link the comment to a specific tour)
        
    },
});

export const Reply = mongoose.model("Reply", replySchema);
export const Comment = mongoose.model("Comment", commentSchema);
