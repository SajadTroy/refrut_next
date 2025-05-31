import '@/styles/Navigation.css';
import React from 'react';
import { usePathname } from 'next/navigation';

type NavigationProps = {
  children: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="container">
      <div className="desktop_nav_container">
        <div className="left_section">
          <div className="header_logo">
            <a href="/">
              <img src="/img/res/logo.png" alt="Logo" className="logo_image" />
            </a>
          </div>
          <div className="menu_items">
            <div className={`nav_item ${pathname === '/' ? 'active' : ''}`}>
              <a href="/">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M6.133 21C4.955 21 4 20.02 4 18.81v-8.802c0-.665.295-1.295.8-1.71l5.867-4.818a2.09 2.09 0 0 1 2.666 0l5.866 4.818c.506.415.801 1.045.801 1.71v8.802c0 1.21-.955 2.19-2.133 2.19z' /><path d='M9.5 21v-5.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V21' /></svg>
                </div>
                <div className="nav_text">
                  <span>Home</span>
                </div>
              </a>
            </div>
            <div className={`nav_item ${pathname === '/search' ? 'active' : ''}`}>
              <a href="/search">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M19 11.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m-2.107 5.42 3.08 3.08' /></svg>
                </div>
                <div className="nav_text">
                  <span>Search</span>
                </div>
              </a>
            </div>
            <div className={`nav_item ${pathname === '/trending' ? 'active' : ''}`}>
              <a href="/trending">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M19.27 16.202A7.81 7.81 0 0 1 12.06 21c-4.313 0-7.81-3.492-7.81-7.8S5.89 7.13 8.455 3c4.806 2.1 4.806 8.4 4.806 8.4s1.579-3.038 4.807-4.5c1.034 3.042 2.43 6.365 1.202 9.302' /><path d='M12 18a5 5 0 0 1-5-5' /></svg>
                </div>
                <div className="nav_text">
                  <span>Trending</span>
                </div>
              </a>
            </div>
            <div className={`nav_item ${pathname === '/inbox' ? 'active' : ''}`}>
              <a href="/inbox">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M7.75 3.5C5.127 3.5 3 5.76 3 8.547 3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79-.78-1.654-2.39-2.79-4.25-2.79' /></svg>
                </div>
                <div className="nav_text">
                  <span>Inbox</span>
                </div>
              </a>
            </div>
            <div className={`nav_item red ${pathname === '/login' ? 'active' : ''}`}>
              <a href="/login">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M13.496 21H6.5c-1.105 0-2-1.151-2-2.571V5.57c0-1.419.895-2.57 2-2.57h7' /><path d='M13 15.5 9.5 12 13 8.5m6.5 3.496h-10' /></svg>
                </div>
                <div className="nav_text">
                  <span>Login</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="content_section">
          {children}
        </div>
      </div>

      <div className="mobile_nav_container">
        <div className="header">
          <div className="header_logo">
            <a href="/">
              <img src="/img/res/logo.png" alt="Logo" className="logo_image" />
            </a>
          </div>
        </div>
        <div className="content_section">
          {children}
        </div>
        <div className="nav_container">
          <div className={`nav_item ${pathname === '/' ? 'active' : ''}`}>
            <a href="/">
              <div className="nav_icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M6.133 21C4.955 21 4 20.02 4 18.81v-8.802c0-.665.295-1.295.8-1.71l5.867-4.818a2.09 2.09 0 0 1 2.666 0l5.866 4.818c.506.415.801 1.045.801 1.71v8.802c0 1.21-.955 2.19-2.133 2.19z' /><path d='M9.5 21v-5.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V21' /></svg>
              </div>
              <div className="nav_text">
                <span>Home</span>
              </div>
            </a>
          </div>
          <div className={`nav_item ${pathname === '/search' ? 'active' : ''}`}>
            <a href="/search">
              <div className="nav_icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M19 11.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08' /></svg>
              </div>
              <div className="nav_text">
                <span>Search</span>
              </div>
            </a>
          </div>
          <div className={`nav_item ${pathname === '/trending' ? 'active' : ''}`}>
            <a href="/trending">
              <div className="nav_icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M19.27 16.202A7.81 7.81 0 0 1 12.06 21c-4.313 0-7.81-3.492-7.81-7.8S5.89 7.13 8.455 3c4.806 2.1 4.806 8.4 4.806 8.4s1.579-3.038 4.807-4.5c1.034 3.042 2.43 6.365 1.202 9.302' /><path d='M12 18a5 5 0 0 1-5-5' /></svg>
              </div>
              <div className="nav_text">
                <span>Trending</span>
              </div>
            </a>
          </div>
          <div className={`nav_item ${pathname === '/inbox' ? 'active' : ''}`}>
            <a href="/inbox">
              <div className="nav_icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M7.75 3.5C5.127 3.5 3 5.76 3 8.547 3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79-.78-1.654-2.39-2.79-4.25-2.79' /></svg>
              </div>
              <div className="nav_text">
                <span>Inbox</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;