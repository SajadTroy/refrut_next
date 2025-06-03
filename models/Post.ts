import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    parentPost: { type: mongoose.Types.ObjectId, ref: 'Post', default: null },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likes: { type: [mongoose.Types.ObjectId] , ref: 'User', default: [] },
    childPosts: [{ type: mongoose.Types.ObjectId, ref: 'Post', default: [] }],
    tags: { type: [String], default: [] },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
