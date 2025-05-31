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
            </div>
            <div className="content_section">
                {children}
            </div>
        </div>
    </div>
  );
};

export default Navigation;
