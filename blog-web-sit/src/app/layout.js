export const metadata = {
  title: 'My Newsboard',
  description: 'Post & manage your news',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#1a202c',
          color: 'white',
          padding: '1rem 2rem',
        }}>
          <a href="/todos" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
            📰 MyNews
          </a>
          <a href="/add-todo" style={{
            color: '#fff',
            background: '#3182ce',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            textDecoration: 'none'
          }}>
            ➕ Create Post
          </a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
