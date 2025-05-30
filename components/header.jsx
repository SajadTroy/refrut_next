import Link from "next/link";
import '@/public/css/header.css';
import Script from "next/script";

const Header = () => {
    return (
        <>
            {/* Desktop Header */}
            <header>
                <div className="header-container header-desktop">
                    <div className="header-left">
                        <Link href="/">
                            <img id="logo-desk" src="/img/logo/logo.png" alt="Ovita Lab. Logo" />
                        </Link>
                    </div>
                    <div className="header-center">
                        <nav>
                            <Link href="/about">About</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link href="/research">Research</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link href="/products">Products</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link href="/blog">Blog</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link href="/partners">Partners</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link href="/contact">Contact</Link>
                        </nav>
                    </div>
                    <div className="header-right">
                        <Link href="https://careers.grovixlab.com/">
                            Careers
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="header-container header-mobile">
                <div className="header-left">
                    <Link href="/">
                        <img id="logo-mobi" src="/img/logo/logo.png" alt="Ovita Lab. Logo" />
                    </Link>
                </div>
                <div className="header-right">
                    <button id="navBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#fff"><path d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z" /></svg>
                    </button>
                </div>
            </header>
            <div className="nav-drawer" id="navBar">
                <div className="nav-drawer-close" id="closeBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" /></svg>
                </div>
                <nav>
                    <Link href="/about">About</Link>
                    <Link href="/research">Research</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/partners">Partners</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="https://careers.grovixlab.com/">Careers</Link>
                </nav>
            </div>
            <Script src="/js/script.js"></Script>
        </>
    );
};

export default Header;
