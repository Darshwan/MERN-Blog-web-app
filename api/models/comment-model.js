import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        commentWriter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts",
            required: true,
        }
    },
    {timestamps: true}
)

const Comment = mongoose.model('Comment', commentSchema)
export default Comment