import '@/public/css/index.css';
import Header from '@/components/stable_header';
import ModernCarousel from '@/components/ModernCarousel';


export const metadata = {
  title: "Revolutionizing Internet with Laser Beam Technology",
  description: "A Kerala-based startup delivering high-speed internet through advanced Laser beam solutions. Experience the future of connectivity—ultra-fast, secure, and cable-free with Piecom.",
  metadataBase: new URL('https://piecom.in'),
  keywords: ['Piecom', 'Wireless Beam Technology', 'High-Speed Internet', 'Kerala Startup', 'Cable-Free Connectivity', 'Secure Internet', 'Future of Connectivity', 'Laser Technology', 'Internet Solutions'],
  applicationName: 'Piecom',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    images: ['/img/opengraph/image.png'],
  }
};

export default function Maintenance() {
  return (
    <>
      <Header />
      <ModernCarousel />
      <div className="main_container">
        <section className="intro-section">
          <p className="intro-text">
            Delivering high-speed wireless internet with zero cables—fast, reliable, and built for everyone, everywhere.
          </p>
        </section>

        {/* <section className="why-us-section">
          <div className="why-us-content">
            <h2 className="why-us-heading">Why Choose Us?</h2>
            <p className="why-us-intro">
            We bring super-fast internet to rural and urban areas across India with laser beam technology, no cables needed. Our affordable plans make reliable connectivity accessible to everyone, and it’s also great for disaster areas when staying connected is critical.
            </p>
          </div>
        </section> */} 

        <section className="intro-section black">
          {/* <div className="intro-title">
            Why Choose Us?
          </div> */}
          <p className="intro-text">
            We bring super-fast internet to rural and urban areas across India with laser beam technology, no cables needed. Our affordable plans make reliable connectivity accessible to everyone, and it’s also great for disaster areas when staying connected is critical.
          </p>
        </section>
      </div>
    </>
  )
}