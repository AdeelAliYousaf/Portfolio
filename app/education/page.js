import EducationTimeline from "./educationpage";

export const metadata = {
  metadataBase: new URL("https://adeelaliyousaf.vercel.app"),
  title: 'Education | Adeel Ali Yousaf',
  description: 'Explore my educational background, degrees, and certifications.',
  keywords: 'education, degrees, certifications, Sialkot, Pakistan',
  authors: [{ name: 'Adeel Ali Yousaf' }],
  creator: 'Adeel Ali Yousaf',
  publisher: 'Adeel Ali Yousaf',
  openGraph: {
    title: 'Education | Adeel Ali Yousaf',
    description: 'Explore my educational background, degrees, and certifications.',
    url: 'https://adeelaliyousaf.vercel.app/education',
    siteName: "Adeel Ali Yousaf's Portfolio",
    images: [
      {
        url: '/LogoDark.png',
        width: 1200,
        height: 630,
        alt: 'Education | Adeel Ali Yousaf',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education | Adeel Ali Yousaf',
    description: 'Explore my educational background, degrees, and certifications',
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


const EducationPage = () => {
  return (
    <div>
      <EducationTimeline />
    </div>
  );
};

export default EducationPage;