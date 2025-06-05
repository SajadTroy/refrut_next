"use client"

import { useState } from "react"
import styles from "./action-button.module.css"

interface LikeButtonProps {
  likeCount: number
}

export default function LikeButton({ likeCount: initialLikeCount }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <button className={`${styles.actionButton} ${liked ? styles.liked : ""}`} onClick={handleLike}>
      {liked ? (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.148 9.175c-.55.294-.898.865-.898 1.493v9.385c0 .95.78 1.697 1.714 1.697h12.521c.579 0 1.024-.404 1.304-.725.317-.362.618-.847.894-1.383.557-1.08 1.08-2.494 1.459-3.893.376-1.392.628-2.832.607-3.956-.01-.552-.087-1.11-.312-1.556-.247-.493-.703-.882-1.364-.882h-5.25c.216-.96.51-2.497.404-3.868-.059-.758-.246-1.561-.723-2.189-.509-.668-1.277-1.048-2.282-1.048-.582 0-1.126.31-1.415.822m0 0-1.28 2.266c-.512.906-1.3 1.58-2.258 2.176-.638.397-1.294.727-1.973 1.07a50 50 0 0 0-1.148.591" />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.54 10.105h5.533c2.546 0-.764 10.895-2.588 10.895H4.964A.956.956 0 0 1 4 20.053v-9.385c0-.347.193-.666.502-.832C6.564 8.73 8.983 7.824 10.18 5.707l1.28-2.266A.87.87 0 0 1 12.222 3c3.18 0 2.237 4.63 1.805 6.47a.52.52 0 0 0 .513.635" />
        </svg>
      )}
      <span>{likeCount}</span>
    </button>
  )
}
