import mongoose from 'mongoose';

// Create a base schema for comments and replies with a discriminator
const baseItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    type: {
        type: String,
        enum: ['Comment', 'Reply', 'NestedReply'],
        required: true
    },
    user: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    hasLiked: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'parentType',
        default: null
    },
    parentType: {
        type: String,
        enum: ['Comment', 'Reply', 'NestedReply'],
        default: null
    },
    // Nested replies will be stored as references
    nestedReplies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BaseItem'
    }]
}, { discriminatorKey: 'kind', collection: 'comments' });

// Create the base model
const BaseItem = mongoose.model('BaseItem', baseItemSchema);

// Comment model
const CommentSchema = new mongoose.Schema({
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'Tour',
        ref: 'Accommodation',
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    }
});

const Comment = BaseItem.discriminator('Comment', CommentSchema);

// Reply model 
const ReplySchema = new mongoose.Schema({
    originalCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    replyingTo: {
        type: String,
        default: null,
    }
});

const Reply = BaseItem.discriminator('Reply', ReplySchema);

export { BaseItem, Comment, Reply };