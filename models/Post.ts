import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likes: { type: [mongoose.Types.ObjectId] , ref: 'User', default: [] },
    comments: [{
        user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
