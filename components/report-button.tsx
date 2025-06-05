"use client"

import { useState } from "react"
import styles from "./action-button.module.css"

export default function ReportButton() {
  const [reported, setReported] = useState(false)

  const handleReport = () => {
    setReported(!reported)
    // Add your report logic here
  }

  return (
    <button className={`${styles.actionButton} ${reported ? styles.reported : ""}`} onClick={handleReport}>
      {reported ? (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.538 3.723c-1.3 1.016-2.469 1.246-3.594 1.124-1.18-.127-2.342-.64-3.638-1.218l-.053-.024c-1.235-.552-2.6-1.162-4.036-1.317-1.511-.163-3.07.176-4.679 1.434a.75.75 0 0 0-.288.591V21a.75.75 0 0 0 1.5 0v-4.936c1.186-.835 2.264-1.023 3.306-.91 1.18.126 2.342.639 3.638 1.218l.053.023c1.235.553 2.6 1.162 4.036 1.317 1.511.163 3.07-.176 4.679-1.434a.75.75 0 0 0 .288-.591V4.313a.75.75 0 0 0-1.212-.59" />
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
          <path d="M4 21v-5.313m0 0c5.818-4.55 10.182 4.55 16 0V4.313c-5.818 4.55-10.182-4.55-16 0z" />
        </svg>
      )}
      <span>Report</span>
    </button>
  )
}
