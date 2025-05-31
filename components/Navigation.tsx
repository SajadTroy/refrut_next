import '@/public/css/Navigation.css';
import React from 'react';

type NavigationProps = {
  children: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = ({ children }) => {
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
            <div className="nav_item">
              <a href="/">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M14.581 9.402C16.194 10.718 17 11.375 17 12.5s-.806 1.783-2.419 3.098a23 23 0 0 1-1.292.99c-.356.25-.759.508-1.176.762-1.609.978-2.413 1.467-3.134.926-.722-.542-.787-1.675-.918-3.943A33 33 0 0 1 8 12.5c0-.563.023-1.192.06-1.833.132-2.267.197-3.401.919-3.943.721-.541 1.525-.052 3.134.926.417.254.82.512 1.176.762a23 23 0 0 1 1.292.99' /></svg>
                </div>
                <div className="nav_text">
                  <span>Home</span>
                </div>
              </a>
            </div>
            <div className="nav_item">
              <a href="/search">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M19 11.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m-2.107 5.42 3.08 3.08'/></svg>
                </div>
                <div className="nav_text">
                  <span>Search</span>
                </div>
              </a>
            </div>
            <div className="nav_item">
              <a href="/trending">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M19.27 16.202A7.81 7.81 0 0 1 12.06 21c-4.313 0-7.81-3.492-7.81-7.8S5.89 7.13 8.455 3c4.806 2.1 4.806 8.4 4.806 8.4s1.579-3.038 4.807-4.5c1.034 3.042 2.43 6.365 1.202 9.302'/><path d='M12 18a5 5 0 0 1-5-5'/></svg>
                </div>
                <div className="nav_text">
                  <span>Trending</span>
                </div>
              </a>
            </div>
            <div className="nav_item">
              <a href="/inbox">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M3.25 13h3.68a2 2 0 0 1 1.664.89l.812 1.22a2 2 0 0 0 1.664.89h1.86a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 17.07 13h3.68'/><path d='m5.45 4.11-2.162 7.847A8 8 0 0 0 3 14.082V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.918a8 8 0 0 0-.288-2.125L18.55 4.11A2 2 0 0 0 16.76 3H7.24a2 2 0 0 0-1.79 1.11'/></svg>
                </div>
                <div className="nav_text">
                  <span>Inbox</span>
                </div>
              </a>
            </div>
            <div className="nav_item red">
              <a href="/login">
                <div className="nav_icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M13.496 21H6.5c-1.105 0-2-1.151-2-2.571V5.57c0-1.419.895-2.57 2-2.57h7'/><path d='M13 15.5 9.5 12 13 8.5m6.5 3.496h-10'/></svg>
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
    </div>
  );
};

export default Navigation;
