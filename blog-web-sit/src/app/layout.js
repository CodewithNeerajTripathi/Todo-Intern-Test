// app/layout.js (or layout.tsx if using TypeScript)

export const metadata = {
  title: 'My Newsboard',
  description: 'Post & manage your news',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 font-sans bg-gray-50 text-gray-900">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-4 shadow-md">
          <a
            href="/todos"
            className="text-xl font-bold tracking-wide hover:text-gray-300 transition"
          >
            📰 MyNews
          </a>
          <a
            href="/add-todo"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
           Create Post
          </a>
        </nav>

        {/* Page Content */}
        <main className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-full flex items-center justify-center px-5 md:px-80 bg-white shadow-lg rounded-lg ">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
