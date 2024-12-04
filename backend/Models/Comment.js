import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
            trim: true,
        },

        tourId: {
            type: mongoose.Types.ObjectId,
            ref: "Tour",
            required: true
        },

        parentId: {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
            default: null,
        },

        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: null,
        },

        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            },
        ],

        taggedUsers: [
            {
                type: String,
                trim: true
            }
        ],

        createAt: {
            type: Date,
            default: Date.now
        },

        updatedAt: {
            type: Date,
            default: Date.now,
          },
    },
    { timestamps: true }
)

export default mongoose.model("Comment", commentSchema);