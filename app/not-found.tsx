import '@/public/css/not-found.css';

export const metadata = {
  title: "404 - Page Not Found",
  description:" The page you are looking for does not exist or has been moved.",
  metadataBase: new URL('https://refrut.com'),
  keywords: ["404", "Page Not Found", "Error", "Not Found", "Refrut"],
  applicationName: 'Refrut',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    images: ['/img/opengraph/404.png'], // Update with actual image path
  },
};

export default function Custom404({ status = '404', message = 'The requested page was not found on this server' }) {
  return (
    <div className="children_not">
      <div data-body>
        <a href="/" aria-label="GrovixLab">
          <span className="logo" id='logo' />
        </a>
        <p>
          <b>{status}.</b> <ins>That's an error.</ins>
        </p>
        <p>
          {message}. <ins>That's all we know.</ins>
        </p>
      </div>
    </div>
  );
}