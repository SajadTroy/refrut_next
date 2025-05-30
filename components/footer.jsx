import Link from "next/link";
import '@/public/css/footer.css';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer__addr">
                    <img className="footer__logo" src="/img/logo/logo.png" alt="Piecom Logo" /><br /><br />
                    <div className="address">
                        Piecom, Kolathur, Perinthalmanna, Malappuram Dt-Kerala, India - 679338.<br /><br />
                        <a className="footer__btn" href="mailto:connect@piecom.in">Email Us</a>
                    </div>
                </div>

                <ul className="footer__nav">
                    {/* <li className="nav__item">
                        <h2 className="nav__title"><b>Links</b></h2>
                        <ul className="nav__ul">
                            <li><a href="/">Home</a></li>
                            <li><a href="/reasearche">Researche</a></li>
                            <li><a href="/products">Products</a></li>
                        </ul>
                    </li> */}

                    <li className="nav__item nav__item--extra">
                        <h2 className="nav__title"><b>Links</b></h2>
                        <ul className="nav__ul nav__ul--extra">
                            <li><a href="/">Home</a></li>
                            <li><a href="/reasearche">Researche</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/blogs">Blogs</a></li>
                            <li><a href="/partners">Partners</a></li>
                        </ul>
                    </li>

                    <li className="nav__item">
                        <h2 className="nav__title"><b>Legal</b></h2>
                        <ul className="nav__ul">
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li><a href="/terms-of-use">Terms of Use</a></li>
                            <li><a href="/sitemap.xml">Sitemap</a></li>
                        </ul>
                    </li>
                </ul>&nbsp;

                <div className="legal">
                    <p>&copy; 2024 - {new Date().getFullYear()} <span><b>Piecom</b></span>. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
