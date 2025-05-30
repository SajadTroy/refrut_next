"use client";

import Link from "next/link";
import "@/public/css/stable_header.css";
import { useState, useEffect } from "react";
import Script from "next/script";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
    //   setIsScrolled(scrollPosition > 50);
    setIsScrolled(true)
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header>
        <div
          className={`header-container header-desktop ${
            isScrolled ? "scrolled" : ""
          }`}
        >
          <div className="header-left">
            <Link href="/">
              <img id="logo-desk" src="/img/logo/logo.png" alt="Piecom Logo" />
            </Link>
          </div>
          <div className="header-center">
            <nav>
              <Link href="/about">About</Link>    
              <Link href="/services">Services</Link>    
              <Link href="/coverage">Coverage</Link>    
              <Link href="/blog">Blog</Link>    
              <Link href="/partners">Partners</Link>    
              <Link href="/support">Support</Link>
            </nav>
          </div>
          <div className="header-right">
            <Link href="/waitlist">Join Waitlist</Link>
          </div>
        </div>
      </header>
      <header
        className={`header-container header-mobile ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        <div className="header-left">
          <Link href="/">
            <img id="logo-mobi" src="/img/logo/logo.png" alt="Piecom Logo" />
          </Link>
        </div>
        <div className="header-right">
          <button id="navBtn">
            <div className="menu_line">
                <div className="line"></div>
                <div className="line"></div>
            </div>
          </button>
        </div>
      </header>
      <div className="nav-drawer" id="navBar">
        <div className="nav-drawer-close" id="closeBtn">
          <div className="menu_cross_line">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <nav>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/coverage">Coverage</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/support">Support</Link>
          <Link href="/waitlist">Join Waitlist</Link>
        </nav>
      </div>
      <Script src="/js/stable_script.js" />
    </>
  );
};

export default Header;