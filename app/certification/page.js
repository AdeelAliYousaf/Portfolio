import Image from "next/image";


import React from "react";
import { SiCoursera, SiCisco, SiFreecodecamp, SiNvidia, SiHackerrank, SiAmazon, SiOracle } from "react-icons/si";
import { portfolio } from '../data/portfolio';

export const metadata = {
  metadataBase: new URL("https://adeelaliyousaf.vercel.app"),
  title: 'Certifications | Adeel Ali Yousaf',
  description: 'A list of my professional certifications.',
  keywords: 'certifications, web development, mobile apps, Sialkot, Pakistan, digital solutions',
  authors: [{ name: 'Adeel Ali Yousaf' }],
  creator: 'Adeel Ali Yousaf',
  publisher: 'Adeel Ali Yousaf',
  openGraph: {
    title: 'Certifications | Adeel Ali Yousaf',
    description: 'A list of my professional certifications.',
    url: 'https://adeelaliyousaf.vercel.app/certification',
    siteName: "Adeel Ali Yousaf's Portfolio",
    images: [
      {
        url: '/LogoDark.png',
        width: 1200,
        height: 630,
        alt: 'Certifications | Adeel Ali Yousaf',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certifications | Adeel Ali Yousaf',
    description: 'A list of my professional certifications.',
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


// Map issuer keywords to icon components or local image paths
const issuerIconMap = {
  coursera: <SiCoursera className="inline mr-1 align-text-bottom text-lg text-blue-400" title="Coursera" />,
  "cisco networking academy": <SiCisco className="inline mr-1 align-text-bottom text-lg text-blue-400" title="Cisco" />,
  cisco: <SiCisco className="inline mr-1 align-text-bottom text-lg text-blue-400" title="Cisco" />,
  freecodecamp: <SiFreecodecamp className="inline mr-1 align-text-bottom text-lg text-green-500" title="freeCodeCamp" />,
  // No icon for Microsoft, will use image only
  nvidia: <SiNvidia className="inline mr-1 align-text-bottom text-lg text-green-400" title="Nvidia" />,
  hackerrank: <SiHackerrank className="inline mr-1 align-text-bottom text-lg text-green-600" title="HackerRank" />,
  "amazon web services": <SiAmazon className="inline mr-1 align-text-bottom text-lg text-yellow-400" title="AWS" />,
  aws: <SiAmazon className="inline mr-1 align-text-bottom text-lg text-yellow-400" title="AWS" />,
  oracle: <SiOracle className="inline mr-1 align-text-bottom text-lg text-red-500" title="Oracle" />,
  // No icon for Testdome, will use image only
  // No icon for Forage, will use image only
  // No icon for Electronic Arts, will use image only
  // No icon for JP Morgan Chase, will use image only
};

// Map issuer keywords to local image paths (for those without react-icons)
const issuerImageMap = {
  "deeplearning.ai": "/My Certifications/courseraaiforeveryone.png",
  microsoft: "/Certificate Icons/Microsoft.jpg",
  testdome: "/Certificate Icons/Testdome.svg",
  forage: "/Certificate Icons/Forage.png",
  "electronic arts": "/My Certifications/eajobsim.webp",
  "jp morgan": "/My Certifications/jpmorganjobsim.webp",
};

function getIssuerIcon(issuer) {
  if (!issuer) return null;
  // Try to find a matching icon by keyword
  const lower = issuer.toLowerCase();
  for (const key in issuerIconMap) {
    if (lower.includes(key)) return issuerIconMap[key];
  }
  // Try to find a matching image by keyword
  for (const key in issuerImageMap) {
    if (lower.includes(key)) {
      return (
  <Image src={issuerImageMap[key]} alt={key+" logo"} className="inline mr-1 align-text-bottom h-5 w-5 object-contain rounded-sm bg-white/10" style={{display:'inline-block'}} width={20} height={20} />
      );
    }
  }
  return null;
}

// Use portfolio.certifications for all certification data
const courses = portfolio.certifications.courses;
const certificates = portfolio.certifications.certificates;
const SkillTests = portfolio.certifications.skillTests;
const badges = portfolio.certifications.badges;
const Internships = portfolio.certifications.internships;


function sortByDateDesc(arr) {
  // Accepts date as 'Month YYYY' or 'YYYY', sorts newest first
  return arr.slice().sort((a, b) => {
    // Try to parse as YYYY or Month YYYY
    const parse = d => {
      if (!d) return 0;
      const parts = d.split(" ");
      if (parts.length === 2) {
        // Month YYYY
        return new Date(parts[1] + '-' + parts[0] + '-01').getTime();
      } else if (parts.length === 1) {
        // Just year
        return new Date(parts[0] + '-01-01').getTime();
      }
      return 0;
    };
    return parse(b.date) - parse(a.date);
  });
}

export default function CertificatesPage() {
  const sortedCertificates = sortByDateDesc(certificates);
  const sortedSkillTests = sortByDateDesc(SkillTests);
  const sortedInternships = sortByDateDesc(Internships);
  const sortedCourses = sortByDateDesc(courses);
  const sortedBadges = sortByDateDesc(badges);
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center drop-shadow-lg">Achievements & Certifications</h1>

      {/* Certificates Section */}
      <h2 className="text-3xl font-bold text-white mb-6 mt-2 w-full text-center max-w-6xl">Certificates</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mb-14">
  {sortedCertificates.map((cert, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 backdrop-blur-sm"
            style={{ background: "transparent" }}
          >
            <div className="w-full mb-4 flex items-center justify-center" style={{ aspectRatio: '4/3', minHeight: 180, background: 'transparent' }}>
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  className="object-contain max-h-full max-w-full w-auto h-auto rounded-lg border border-white/20 shadow-md hover:scale-105 transition-transform duration-300 bg-white/0 mx-auto"
                  style={{ maxHeight: 250, maxWidth: '90%' }}
                  width={400}
                  height={250}
                  loading="lazy"
                />
              </a>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1 text-center">{cert.title}</h2>
            <div className="text-white/70 text-sm mb-1 text-center">
              {getIssuerIcon(cert.issuer)}
              {cert.issuer}
            </div>
            <div className="text-white/40 text-xs text-center">{cert.date}</div>
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium shadow hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>

      {/* Skill Tests Section */}
      <h2 className="text-3xl font-bold text-white mb-6 mt-2 w-full text-center max-w-6xl">Skill Tests</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mb-14">
  {sortedSkillTests.map((test, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 backdrop-blur-sm"
            style={{ background: "transparent" }}
          >
            <div className="w-full mb-4 flex items-center justify-center" style={{ aspectRatio: '4/3', minHeight: 180, background: 'transparent' }}>
              <a href={test.url} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                <Image
                  src={test.image}
                  alt={test.title}
                  className="object-contain max-h-full max-w-full w-auto h-auto rounded-lg border border-white/20 shadow-md hover:scale-105 transition-transform duration-300 bg-white/0 mx-auto"
                  style={{ maxHeight: 250, maxWidth: '90%' }}
                  width={400}
                  height={250}
                  loading="lazy"
                />
              </a>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1 text-center">{test.title}</h2>
            <div className="text-white/70 text-sm mb-1 text-center">
              {getIssuerIcon(test.issuer)}
              {test.issuer}
            </div>
            <div className="text-white/40 text-xs text-center">{test.date}</div>
            <a
              href={test.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium shadow hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>

      {/* Internships Section */}
      <h2 className="text-3xl font-bold text-white mb-6 mt-2 w-full text-center max-w-6xl">Internships</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
  {sortedInternships.map((intern, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 backdrop-blur-sm"
            style={{ background: "transparent" }}
          >
            <div className="w-full mb-4 flex items-center justify-center" style={{ aspectRatio: '4/3', minHeight: 180, background: 'transparent' }}>
              <a href={intern.url} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                <Image
                  src={intern.image}
                  alt={intern.title}
                  className="object-contain max-h-full max-w-full w-auto h-auto rounded-lg border border-white/20 shadow-md hover:scale-105 transition-transform duration-300 bg-white/0 mx-auto"
                  style={{ maxHeight: 250, maxWidth: '90%' }}
                  width={400}
                  height={250}
                  loading="lazy"
                />
              </a>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1 text-center">{intern.title}</h2>
            <div className="text-white/70 text-sm mb-1 text-center">
              {getIssuerIcon(intern.issuer)}
              {intern.issuer}
            </div>
            <div className="text-white/40 text-xs text-center">{intern.date}</div>
            <a
              href={intern.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium shadow hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>
      {/* Courses Section */}
      <h2 className="text-3xl font-bold text-white mb-6 mt-10 w-full text-center max-w-6xl">Courses</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mb-14">
  {sortedCourses.map((course, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 backdrop-blur-sm"
            style={{ background: "transparent" }}
          >
            <div className="w-full mb-4 flex items-center justify-center" style={{ aspectRatio: '4/3', minHeight: 180, background: 'transparent' }}>
              <a href={course.url} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                <Image
                  src={course.image}
                  alt={course.title}
                  className="object-contain max-h-full max-w-full w-auto h-auto rounded-lg border border-white/20 shadow-md hover:scale-105 transition-transform duration-300 bg-white/0 mx-auto"
                  style={{ maxHeight: 250, maxWidth: '90%' }}
                  width={400}
                  height={250}
                  loading="lazy"
                />
              </a>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1 text-center">{course.title}</h2>
            <div className="text-white/70 text-sm mb-1 text-center">
              {getIssuerIcon(course.issuer)}
              {course.issuer}
            </div>
            <div className="text-white/40 text-xs text-center">{course.date}</div>
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium shadow hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
            >
              View Course
            </a>
          </div>
        ))}
      </div>

      {/* Badges Section */}
      <h2 className="text-3xl font-bold text-white mb-6 mt-10 w-full text-center max-w-6xl">Badges</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mb-14">
  {sortedBadges.map((badge, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 backdrop-blur-sm"
            style={{ background: "transparent" }}
          >
            <div className="w-full mb-4 flex items-center justify-center" style={{ aspectRatio: '4/3', minHeight: 180, background: 'transparent' }}>
              <a href={badge.url} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                <Image
                  src={badge.image}
                  alt={badge.title}
                  className="object-contain max-h-full max-w-full w-auto h-auto rounded-lg border border-white/20 shadow-md hover:scale-105 transition-transform duration-300 bg-white/0 mx-auto"
                  style={{ maxHeight: 250, maxWidth: '90%' }}
                  width={400}
                  height={250}
                  loading="lazy"
                />
              </a>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1 text-center">{badge.title}</h2>
            <div className="text-white/70 text-sm mb-1 text-center">
              {getIssuerIcon(badge.issuer)}
              {badge.issuer}
            </div>
            <div className="text-white/40 text-xs text-center">{badge.date}</div>
            <a
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium shadow hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
            >
              View Badge
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
