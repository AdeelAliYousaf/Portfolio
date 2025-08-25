import ModernContactPage from "./contactform";

export const metadata = {
  metadataBase: new URL("https://adeelaliyousaf.vercel.app"),
  title: 'Contact | Adeel Ali Yousaf',
  description: 'Get in touch for web development, mobile apps, and digital solutions. Located in Sialkot, Pakistan.',
  keywords: 'contact, web development, mobile apps, Sialkot, Pakistan, digital solutions',
  authors: [{ name: 'Adeel Ali Yousaf' }],
  creator: 'Adeel Ali Yousaf',
  publisher: 'Adeel Ali Yousaf',
  openGraph: {
    title: 'Contact | Adeel Ali Yousaf',
    description: 'Get in touch for web development and digital solutions',
    url: 'https://adeelaliyousaf.vercel.app/contact',
    siteName: "Adeel Ali Yousaf's Portfolio",
    images: [
      {
        url: '/LogoDark.png',
        width: 1200,
        height: 630,
        alt: 'Contact Adeel Ali Yousaf',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Adeel Ali Yousaf',
    description: 'Get in touch for web development and digital solutions',
  images: ['/LogoDark.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function ContactPage() {
  return (
    <div>
      <ModernContactPage />
    </div>
  );
}