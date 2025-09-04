import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/home">Home</a>
            <a href="/login">Login</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>© 2025 Puja Prasad Portal</footer>
      </body>
    </html>
  );
}
