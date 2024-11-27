import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming `tourId` refers to a Tour document
    ref: 'Tour',
    required: true,
  },
  user: {
    type: String, // Alternatively, reference a User schema if have authentication
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  hasLiked: {
    type: Boolean,
    default: false,
  },
  replyingTo: {
    type: String, // Username or ID of the comment being replied to
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', // Self-referencing the Comment model
    },
  ],
  isReply: {
    type: Boolean,
    default: false,
  },
});

// const Comment = mongoose.model('Comment', commentSchema);

// module.exports = Comment;
export default mongoose.model("Comment", commentSchema);
