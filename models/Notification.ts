import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: [ 'like', 'comment', 'follow', 'mention', 'official' ] },
    content: { type: String, required: true },
    post: { type: mongoose.Types.ObjectId, ref: 'Post', default: null },
    isRead: { type: Boolean, default: false }, 
    createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default Notification;