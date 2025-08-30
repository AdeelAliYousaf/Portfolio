import "./globals.css";
import { Poppins } from 'next/font/google';
import ClientRoot from "./ClientRoot";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function RootLayout({children}) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className="antialiased flex flex-col">
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}