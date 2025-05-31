import '@/styles/home.css';

export const metadata = {
  title: "Refrut",
  description: "A social media platform where you can share your thoughts, ideas, and experiences with the world. Join us to connect, engage, and explore a diverse community of individuals.",
  metadataBase: new URL('https://refrut.com'),
  keywords: ['Refrut', 'Social Media', 'Community', 'Engagement', 'Connection', 'Sharing', 'Ideas', 'Experiences'],
  applicationName: 'Refrut',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    images: ['/img/opengraph/image.png'],
  },
};

export default function Home() {
  // Demo posts data (static for now, can be replaced with API data)
  const posts = [
    {
      id: 1,
      user: {
        name: 'Refrut',
        username: 'refrut',
        avatar: 'https://i.postimg.cc/vBBTqPyq/file-00000000e3ec61f8a6f2d4d086e.jpg',
        profileLink: '/refrut',
      },
      content: 'Refrut is currently undergoing maintenance. We are working hard to bring you a better experience. Thank you for your patience!',
      likes: 0,
      comments: 0,
    },
    // Repeat for other posts (simplified for brevity)
    {
      id: 2,
      user: {
        name: 'Refrut',
        username: 'refrut',
        avatar: 'https://i.postimg.cc/vBBTqPyq/file-00000000e3ec61f8a6f2d4d086e.jpg',
        profileLink: '/refrut',
      },
      content: 'Refrut is currently undergoing maintenance. We are working hard to bring you a better experience. Thank you for your patience!',
      likes: 0,
      comments: 0,
    },
    {
      id: 3,
      user: {
        name: 'Refrut',
        username: 'refrut',
        avatar: 'https://i.postimg.cc/vBBTqPyq/file-00000000e3ec61f8a6f2d4d086e.jpg',
        profileLink: '/refrut',
      },
      content: 'Refrut is currently undergoing maintenance. We are working hard to bring you a better experience. Thank you for your patience!',
      likes: 0,
      comments: 0,
    },
    {
      id: 4,
      user: {
        name: 'Refrut',
        username: 'refrut',
        avatar: 'https://i.postimg.cc/vBBTqPyq/file-00000000e3ec61f8a6f2d4d086e.jpg',
        profileLink: '/refrut',
      },
      content: 'Refrut is currently undergoing maintenance. We are working hard to bring you a better experience. Thank you for your patience!',
      likes: 0,
      comments: 0,
    },
  ];

  return (
    <div className="content_container">
      <div className="posts_scroll">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="top_post">
              <a href={post.user.profileLink} className="post_user" aria-label={`View ${post.user.name}'s profile`}>
                <div className="user_image">
                  <img src={post.user.avatar} alt={`${post.user.name}'s avatar`} loading="lazy" />
                </div>
                <div className="user_name">
                  <span className="name">
                    {post.user.name}
                    <div className="verified">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Verified badge"
                      >
                        <path d="M10.565 2.075c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03c.412.145.885.182 1.547.235l.102.008c.629.05 1.09.238 1.58.655l.079.066c.505.431.866.74 1.26.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.48-.41.939-.604 1.58-.655l.102-.008c.662-.053 1.135-.09 1.547-.236a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928a3.33 3.33 0 0 0-2.87 0m5.208 6.617a.75.75 0 0 1 .168 1.047l-3.597 4.981a1.75 1.75 0 0 1-2.736.128l-1.506-1.72a.75.75 0 0 1 1.13-.989l1.505 1.721a.25.25 0 0 0 .39-.018l3.598-4.981a.75.75 0 0 1 1.048-.169" />
                      </svg>
                    </div>
                  </span>
                  <span className="username">{post.user.username}</span>
                </div>
              </a>
            </div>
            <div className="post_content">
              <p>{post.content}</p>
            </div>
            <div className="post_buttons">
              <div className="post_button" aria-label="Like post">
                <div className="icon">
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
                </div>
                <span>{post.likes}</span>
              </div>
              <div className="post_button" aria-label="Comment on post">
                <div className="icon">
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
                    <path d="M12 21a9 9 0 1 0-9-9c0 1.44.338 2.8.94 4.007.453.911-.177 2.14-.417 3.037a1.17 1.17 0 0 0 1.433 1.433c.897-.24 2.126-.87 3.037-.416A9 9 0 0 0 12 21" />
                  </svg>
                </div>
                <span>{post.comments}</span>
              </div>
              <div className="post_button" aria-label="Report post">
                <div className="icon">
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
                    <path d="m4.75 14 13.78-4.04c.96-.282.96-1.638 0-1.92L4.75 4m0 10V4m0 10v7m0-17V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}