'use client';
import '@/styles/Profile.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export interface ClientUser {
  _id: string;
  name: string;
  email: string;
  handle: string;
  bio: string;
  profilePicture: string;
  dateOfBirth: string | null;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  lastLogin: string | null;
  roles: string[]; // e.g., ['user', 'admin']
  status: 'active' | 'inactive' | 'banned';
  socialLinks: {
    x: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    github: string;
  };
}

export default function UserProfileClient() {

  const [user, setUser] = useState<ClientUser | null>(null);

  useEffect(() => {
    fetch('/api/user/profile', {
      method: 'POST',
    }).then(res => {
      if (res.ok) return res.json();
      throw new Error('Unauthorized');
    }).then(data => setUser(data.user))
      .catch(() => {
        window.location.href = '/auth/login.rf';
      });
  }, []);

  return (
    <div className="profile-container">
      <div className="top_profile">
        <div className="profile_header">
          <div className="profile_image">
            {user ? (
              <img
                src={user.profilePicture || `/img/avatars/${user.handle}.png`}
                alt={`Avatar of ${user.name}`}
                onError={(e) => {
                  e.currentTarget.src = '/img/avatars/default.png';
                }}
                className="profile_avatar"
              />
            ) : (
              <Skeleton circle={true} height={100} width={100} />
            )}
          </div>
          <div className="profile_details">
            <h1 className="profile_name">
              {user ? (
                <>
                  {user.name}
                  {user.roles.includes('creator') && (
                    <div className="verified">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d='M10.565 2.075c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03c.412.145.885.182 1.547.235l.102.008c.629.05 1.09.238 1.58.655l.079.066c.505.431.866.74 1.26.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.48-.41.939-.604 1.58-.655l.102-.008c.662-.053 1.135-.09 1.547-.236a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928a3.33 3.33 0 0 0-2.87 0m5.208 6.617a.75.75 0 0 1 .168 1.047l-3.597 4.981a1.75 1.75 0 0 1-2.736.128l-1.506-1.72a.75.75 0 1 1 1.13-.989l1.505 1.721a.25.25 0 0 0 .39-.018l3.598-4.981a.75.75 0 0 1 1.048-.169' /></svg>
                    </div>
                  )}
                </>
              ) : <Skeleton width={150} />}
            </h1>
            <span style={{ marginTop: '2px' }} className="profile_handle">
              {user ? `@${user.handle}` : <Skeleton width={100} />}
            </span>
          </div>
        </div>
        <div className="profile_about">
          <p className="profile_bio">
            {user ? user.bio || "This user has not set a bio yet." : <Skeleton width={200} />}
          </p>
        </div>
        <div className="profile_stats">
          <div className="stat_item">
            <span className="stat_value">123</span>
            <span className="stat_label">Posts</span>
          </div>
          <div className="stat_item">
            <span className="stat_value">456</span>
            <span className="stat_label">Followers</span>
          </div>
          <div className="stat_item">
            <span className="stat_value">789</span>
            <span className="stat_label">Following</span>
          </div>
        </div>
        <div className="profile_button">
          <button className="follow_button">Edit Profile</button>
        </div>
      </div>
      <div className="tabs">
        {user ? (
          <>
            <div className="tab active">
              <Link href={`/u/${user.handle}`}>Posts</Link>
            </div>
            <div className="tab">
              <Link href={`/u/${user.handle}/replies`}>Replies</Link>
            </div>
          </>
        ) : (
          <>
            <div className="tab active">
              <Skeleton width={50} />
            </div>
            <div className="tab">
              <Skeleton width={50} />
            </div>
          </>
        )}
      </div>

      {/* User Posts */}
      {/* <div className="posts_container">

        <div className="post">
          <Link href={`/u/${handle}`} className="post_header">
            <div className="user_image">
              <img
                src={`/img/avatars/${handle}.png`}
                alt={`Avatar of ${handle}`}
                className="user_avatar"
              />
            </div>
            <div className="user_info">
              <h1 className="post_author_name">{handle.toUpperCase()}
                <div className="verified">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d='M10.565 2.075c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03c.412.145.885.182 1.547.235l.102.008c.629.05 1.09.238 1.58.655l.079.066c.505.431.866.74 1.26.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.48-.41.939-.604 1.58-.655l.102-.008c.662-.053 1.135-.09 1.547-.236a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928a3.33 3.33 0 0 0-2.87 0m5.208 6.617a.75.75 0 0 1 .168 1.047l-3.597 4.981a1.75 1.75 0 0 1-2.736.128l-1.506-1.72a.75.75 0 1 1 1.13-.989l1.505 1.721a.25.25 0 0 0 .39-.018l3.598-4.981a.75.75 0 0 1 1.048-.169' /></svg>
                </div>
              </h1>
              <span className="post_author_handle">@{handle}</span>
            </div>
          </Link>
          <Link href={`/post/abcd`} className="post_content">
            <p>This is a sample post content from @{handle}. It can be about anything interesting or engaging.</p>
          </Link>
          <div className="post_details">
            <span className="post_time">Posted 2 hours ago</span>
            <span className="location">India</span>
          </div>
          <div className="post_actions">
            <button className="like_button">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M7.75 3.5C5.127 3.5 3 5.76 3 8.547 3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79-.78-1.654-2.39-2.79-4.25-2.79' /></svg>
              <span className="like_count">10</span>
            </button>
            <button className="comment_button">
              <Link href={`/post/abcd`}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M3.464 16.828C2 15.657 2 14.771 2 11s0-5.657 1.464-6.828C4.93 3 7.286 3 12 3s7.071 0 8.535 1.172S22 7.229 22 11s0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96' /></svg>
                <span className="comment_count">5</span>
              </Link>
            </button>
            <button className="flag_button red">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='m4.75 14 13.78-4.04c.96-.282.96-1.638 0-1.92L4.75 4m0 10V4m0 10v7m0-17V3' /></svg>
            </button>
          </div>
        </div>

        <div className="post">
          <Link href={`/u/${handle}`} className="post_header">
            <div className="user_image">
              <img
                src={`/img/avatars/${handle}.png`}
                alt={`Avatar of ${handle}`}
                className="user_avatar"
              />
            </div>
            <div className="user_info">
              <h1 className="post_author_name">{handle.toUpperCase()}
                <div className="verified">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d='M10.565 2.075c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03c.412.145.885.182 1.547.235l.102.008c.629.05 1.09.238 1.58.655l.079.066c.505.431.866.74 1.26.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.48-.41.939-.604 1.58-.655l.102-.008c.662-.053 1.135-.09 1.547-.236a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928a3.33 3.33 0 0 0-2.87 0m5.208 6.617a.75.75 0 0 1 .168 1.047l-3.597 4.981a1.75 1.75 0 0 1-2.736.128l-1.506-1.72a.75.75 0 1 1 1.13-.989l1.505 1.721a.25.25 0 0 0 .39-.018l3.598-4.981a.75.75 0 0 1 1.048-.169' /></svg>
                </div>
              </h1>
              <span className="post_author_handle">@{handle}</span>
            </div>
          </Link>
          <Link href={`/post/abcd`} className="post_content">
            <p>This is a sample post content from @{handle}. It can be about anything interesting or engaging.</p>
          </Link>
          <div className="post_details">
            <span className="post_time">Posted 2 hours ago</span>
            <span className="location">India</span>
          </div>
          <div className="post_actions">
            <button className="like_button">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M7.75 3.5C5.127 3.5 3 5.76 3 8.547 3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79-.78-1.654-2.39-2.79-4.25-2.79' /></svg>
              <span className="like_count">10</span>
            </button>
            <button className="comment_button">
              <Link href={`/post/abcd`}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M3.464 16.828C2 15.657 2 14.771 2 11s0-5.657 1.464-6.828C4.93 3 7.286 3 12 3s7.071 0 8.535 1.172S22 7.229 22 11s0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96' /></svg>
                <span className="comment_count">5</span>
              </Link>
            </button>
            <button className="flag_button red">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='m4.75 14 13.78-4.04c.96-.282.96-1.638 0-1.92L4.75 4m0 10V4m0 10v7m0-17V3' /></svg>
            </button>
          </div>
        </div>

      </div> */}
    </div>
  );
}
