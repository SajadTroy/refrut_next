import { formatDistanceToNow } from "date-fns";
import LikeButton from "./like-button";
import CommentButton from "./comment-button";
import ReportButton from "./report-button";
import styles from "./post-card.module.css";

interface PostCardProps {
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  publishedAt: Date
  likeCount: number
  commentCount?: number
}

export default function PostCard({ user, content, publishedAt, likeCount, commentCount = 0 }: PostCardProps) {
  const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true })

  const imageSrc = user.avatar?.startsWith('http')
    ? user?.avatar
    : '/img/avatars/default.png';

  return (
    <div className={styles.postCard}>
      <div className={styles.postContent}>
        {/* User profile row */}
        <div className={styles.userRow}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <img
                src={imageSrc}
                alt={user.name}
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userHandle}>@{user.username}</div>
            </div>
          </div>
          <div className={styles.timestamp}>{timeAgo}</div>
        </div>

        {/* Post content */}
        <div className={styles.textContent}>{content}</div>
      </div>

      {/* Action buttons */}
      <div className={styles.actionButtons}>
        <LikeButton likeCount={likeCount} />
        <CommentButton commentCount={commentCount} />
        <ReportButton />
      </div>
    </div>
  )
}
