// components/Navigation.tsx
import '@/styles/Navigation.css';
import Link from 'next/link';

type NavigationProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  pathname: string;
};

export default function Navigation({
  children,
  isAuthenticated,
  pathname,
}: NavigationProps) {
  return (
    <div className="container">
      <div className="desktop_nav_container">
        <div className="left_section">
          <div className="header_logo">
            <Link href="/">
              <img src="/img/res/logo.png" alt="Logo" className="logo_image" />
            </Link>
          </div>
          <div className="menu_items">
            <div className={`nav_item ${pathname === '/' ? 'active' : ''}`}>
              <Link href="/">
                <div className="nav_icon">
                  {/* Home SVG */}
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
                    <path d="M6.133 21C4.955 21 4 20.02 4 18.81v-8.802c0-.665.295-1.295.8-1.71l5.867-4.818a2.09 2.09 0 0 1 2.666 0l5.866 4.818c.506.415.801 1.045.801 1.71v8.802c0 1.21-.955 2.19-2.133 2.19z" />
                    <path d="M9.5 21v-5.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V21" />
                  </svg>
                </div>
                <div className="nav_text">
                  <span>Home</span>
                </div>
              </Link>
            </div>

            <div className={`nav_item ${pathname === '/search' ? 'active' : ''}`}>
              <Link href="/search">
                <div className="nav_icon">
                  {/* Search SVG */}
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
                    <path d="M19 11.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08" />
                  </svg>
                </div>
                <div className="nav_text">
                  <span>Search</span>
                </div>
              </Link>
            </div>

            {isAuthenticated && (
              <>
                <div className={`nav_item ${pathname === '/post/new' ? 'active' : ''}`}>
                  <Link href="/post/new">
                    <div className="nav_icon">
                      {/* New Post SVG */}
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
                        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0m-5.5 0H12m0 0H8.5m3.5 0V8.5m0 3.5v3.5" />
                      </svg>
                    </div>
                    <div className="nav_text">
                      <span>New Post</span>
                    </div>
                  </Link>
                </div>

                <div className={`nav_item ${pathname === '/inbox' ? 'active' : ''}`}>
                  <Link href="/inbox">
                    <div className="nav_icon">
                      {/* Inbox SVG */}
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
                        <path d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547 3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79-.78-1.654-2.39-2.79-4.25-2.79" />
                      </svg>
                    </div>
                    <div className="nav_text">
                      <span>Inbox</span>
                    </div>
                  </Link>
                </div>

                <div className={`nav_item ${pathname === '/u/profile' ? 'active' : ''}`}>
                  <Link href="/u/profile">
                    <div className="nav_icon">
                      {/* Profile SVG */}
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
                        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
                        <path d="M14.5 9.25a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M17 19.5c-.317-6.187-9.683-6.187-10 0" />
                      </svg>
                    </div>
                    <div className="nav_text">
                      <span>Profile</span>
                    </div>
                  </Link>
                </div>
              </>
            )}

            {!isAuthenticated && (
              <div className={`nav_item red ${pathname === '/auth/login' ? 'active' : ''}`}>
                <Link href="/auth/login">
                  <div className="nav_icon">
                    {/* Login SVG */}
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
                      <path d="M13.496 21H6.5c-1.105 0-2-1.151-2-2.571V5.57c0-1.419.895-2.57 2-2.57h7" />
                      <path d="M13 15.5 9.5 12 13 8.5m6.5 3.496h-10" />
                    </svg>
                  </div>
                  <div className="nav_text">
                    <span>Login</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="content_section">{children}</div>
        <div className="right_section"></div>
      </div>

      {/* Mobile Layout */}
      <div className="mobile_nav_container">
        <div className="header">
          <div className="header_logo">
            <Link href="/">
              <img src="/img/res/logo.png" alt="Logo" className="logo_image" />
            </Link>
          </div>
        </div>
        <div className="content_section">{children}</div>
        <div className="nav_container">
          <div className={`nav_item ${pathname === '/' ? 'active' : ''}`}>
            <Link href="/">
              <div className="nav_icon">
                {/* Home SVG */}
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
                  <path d="M6.133 21C4.955 21 4 20.02 4 18.81v-8.802c0-.665.295-1.295.8-1.71l5.867-4.818a2.09 2.09 0 0 1 2.666 0l5.866 4.818c.506.415.801 1.045.801 1.71v8.802c0 1.21-.955 2.19-2.133 2.19z" />
                  <path d="M9.5 21v-5.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V21" />
                </svg>
              </div>
              <div className="nav_text">
                <span>Home</span>
              </div>
            </Link>
          </div>

          <div className={`nav_item ${pathname === '/search' ? 'active' : ''}`}>
            <Link href="/search">
              <div className="nav_icon">
                {/* Search SVG */}
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
                  <path d="M19 11.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08" />
                </svg>
              </div>
              <div className="nav_text">
                <span>Search</span>
              </div>
            </Link>
          </div>

          {isAuthenticated && (
            <>
              <div className={`nav_item ${pathname === '/post/new' ? 'active' : ''}`}>
                <Link href="/post/new">
                  <div className="nav_icon">
                    {/* New Post SVG */}
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
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0m-5.5 0H12m0 0H8.5m3.5 0V8.5m0 3.5v3.5" />
                    </svg>
                  </div>
                  <div className="nav_text">
                    <span>New Post</span>
                  </div>
                </Link>
              </div>

              <div className={`nav_item ${pathname === '/inbox' ? 'active' : ''}`}>
                <Link href="/inbox">
                  <div className="nav_icon">
                    {/* Inbox SVG */}
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
                      <path d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547 3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79-.78-1.654-2.39-2.79-4.25-2.79" />
                    </svg>
                  </div>
                  <div className="nav_text">
                    <span>Inbox</span>
                  </div>
                </Link>
              </div>

              <div className={`nav_item ${pathname === '/u/profile' ? 'active' : ''}`}>
                <Link href="/u/profile">
                  <div className="nav_icon">
                    {/* Profile SVG */}
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
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
                      <path d="M14.5 9.25a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M17 19.5c-.317-6.187-9.683-6.187-10 0" />
                    </svg>
                  </div>
                  <div className="nav_text">
                    <span>Profile</span>
                  </div>
                </Link>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <div className={`nav_item red ${pathname === '/auth/login' ? 'active' : ''}`}>
              <Link href="/auth/login">
                <div className="nav_icon">
                  {/* Login SVG */}
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
                    <path d="M13.496 21H6.5c-1.105 0-2-1.151-2-2.571V5.57c0-1.419.895-2.57 2-2.57h7" />
                    <path d="M13 15.5 9.5 12 13 8.5m6.5 3.496h-10" />
                  </svg>
                </div>
                <div className="nav_text">
                  <span>Login</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
