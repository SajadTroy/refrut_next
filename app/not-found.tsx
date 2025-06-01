import '@/styles/not-found.css';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist on this server.',
  keywords: ['404', 'not found', 'error', 'Refrut', 'page missing'],
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <div className="children_not">
      <div data-body>
        <a href="/" aria-label="GrovixLab">
          <span className="logo" id="logo" />
        </a>
        <p>
          <b>404.</b> <ins>That's an error.</ins>
        </p>
        <p>
          The requested page was not found on this server. <ins>That's all we know.</ins>
        </p>
      </div>
    </div>
  );
}