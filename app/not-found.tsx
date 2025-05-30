import '@/public/css/not-found.css';


export const metadata = {
    title: "404 - Page Not Found",
    description: "The page you're looking for does not exist. Explore our cutting-edge laser beam technology and discover high-speed internet solutions at Piecom.",
    metadataBase: new URL('https://refrut.com'),
    keywords: ['Piecom', '404 Error', 'Page Not Found', 'Laser Beam Technology', 'Internet Solutions', 'High-Speed Internet', 'Kerala Startup'],
    applicationName: 'Piecom',
    referrer: 'origin-when-cross-origin',
    openGraph: {
        images: ['/img/opengraph/404.png'],
    }
};


export default function Custom404() {
    return (
        <>
            <div className="notfound-container">
                <img src="/img/icons/graphics/error.png" alt="Not Found Image" className="notfound-image" />
                <h1 className="notfound-title">404 - Not Found</h1>
                <p className="notfound-message">The page you are looking for doesn’t exist or an error occurred.</p>
            </div>
        </>
    )
}