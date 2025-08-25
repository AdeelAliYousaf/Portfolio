import Image from "next/image";
import { SiLaravel, SiReact, SiTailwindcss, SiPython, SiPhp, SiDotnet, SiMysql } from 'react-icons/si';


export const metadata = {
  metadataBase: new URL("https://adeelaliyousaf.vercel.app"),
  title: 'Projects | Adeel Ali Yousaf',
  description: 'Showcasing projects in web development, mobile apps, and digital solutions. Located in Sialkot, Pakistan.',
  keywords: 'projects, web development, mobile apps, Sialkot, Pakistan, digital solutions',
  authors: [{ name: 'Adeel Ali Yousaf' }],
  creator: 'Adeel Ali Yousaf',
  publisher: 'Adeel Ali Yousaf',
  openGraph: {
    title: 'Projects | Adeel Ali Yousaf',
    description: 'Showcasing projects in web development and digital solutions',
    url: 'https://adeelaliyousaf.thedev.id/project',
    siteName: 'Adeel Ali Yousaf Portfolio',
				images: [
					{
						url: '/LogoDark.png',
				width: 1200,
				height: 630,
				alt: 'Projects | Adeel Ali Yousaf',
			},
		],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Adeel Ali Yousaf',
    description: 'Showcasing projects in web development and digital solutions',
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

const projects = [
	{
		title: "Dynamic B2B Product Catalog Web Application",
		description:
			"A web application that showcases a dynamic product catalog for B2B clients, built with Laravel Breeze, inertia js, React js and Tailwind CSS.",
		url: "https://topinworldleather.com/",
		image: "/TIWLAnimation.gif",
		languages: ["Laravel", "React", "Tailwind CSS"]
	},
	{
		title: "Modern Product Portfolio Web Application",
		description:
			"A web application that showcases a modern product portfolio for a US-based client, built with Laravel Breeze, inertia js, React js and Tailwind CSS.",
		url: "https://veritasedgeglobal.com/",
		image: "/VEGAnimation.gif",
		languages: ["Laravel", "React", "Tailwind CSS"]
	},
];

const githubProjects = [
	{
		repo: "AdeelAliYousaf/TheSmartWebCam",
		url: "https://github.com/AdeelAliYousaf/TheSmartWebCam",
		name: "The Smart WebCam",
		description:
			"Face Attendance System Made in Python using OpenCV and Deep Learning and Sending realtime emails to the logged in Admin using SendGrid.",
		stars: 2,
		forks: 45,
		languages: ["Python"]
	},
	{
		repo: "AdeelAliYousaf/ViolenceDetectionSystem",
		url: "https://github.com/AdeelAliYousaf/ViolenceDetectionSystem",
		name: "Violence Detection System",
		description:
			"A project that uses machine learning to detect violence in videos with Web UI interface using Gradio.",
		stars: 8,
		forks: 12,
		languages: ["Python"]
	},
  {
		repo: "AdeelAliYousaf/webrtc-app",
		url: "https://github.com/AdeelAliYousaf/webrtc-app",
		name: "WebRTC Web App",
		description:
			"A basic WebRTC-based application for real-time communication. using React JS for Frontend and PHP at backend. also used Turn Server for firewall",
		stars: 12,
		forks: 5,
		languages: ["React", "PHP"]
	},
  {
		repo: "AdeelAliYousaf/LearningManagementSystem",
		url: "https://github.com/AdeelAliYousaf/LearningManagementSystem",
		name: "Learning Management System",
		description:
			"A LMS Dynamic Web Application made with ASP.NET Core MVC using C# and MSSQL Server. with Admin, Teacher and Student Dashboard.",
		stars: 15,
		forks: 24,
		languages: ["ASP.NET", "C#", "MySQL"]
	},
  {
		repo: "AdeelAliYousaf/FinalYearProjectManagementSystem",
		url: "https://github.com/AdeelAliYousaf/FinalYearProjectManagement",
		name: "Final Year Project Management System",
		description:
			"A Dynamic Project Management System for Final Year. This Web Application made with core PHP and MySQL. with Admin, Teacher and Student Dashboard.",
		stars: 6,
		forks: 2,
		languages: ["PHP", "MySQL"]
	},
];

const languageIcons = {
  Laravel: <SiLaravel title="Laravel" color="#ff2d20" size={20} />,
  React: <SiReact title="React" color="#61dafb" size={20} />,
  'Tailwind CSS': <SiTailwindcss title="Tailwind CSS" color="#38bdf8" size={20} />,
  Python: <SiPython title="Python" color="#3776ab" size={20} />,
  PHP: <SiPhp title="PHP" color="#777bb4" size={20} />,
  'ASP.NET': <SiDotnet title="ASP.NET" color="#512bd4" size={20} />,
  MySQL: <SiMysql title="MySQL" color="#4479a1" size={20} />,
  'C#': <span title="C#" style={{color:'#239120',fontWeight:'bold',fontSize:20}}>C#</span>,
};

export default function ProjectsPage() {
		return (
			<div className="mt-2 mb-16 min-h-screen flex flex-col items-center justify-center py-10 px-4">
				<h1 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
					Projects Portfolio
				</h1>

				{/* Live Projects Section */}
				<h2 className="text-2xl font-bold text-white mb-6 mt-2 w-full text-center max-w-6xl">Client Projects</h2>
				<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mb-14">
					{projects.map((project, idx) => (
						<div
							key={idx}
							className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.03] focus:outline-none"
							style={{
								boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
							}}
						>
							{/* MacBook browser chrome */}
							<div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-white/10">
								<span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
								<span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
								<span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
								<span className="ml-4 text-xs text-white/50 truncate">
									{project.url.replace(/^https?:\/\//, "")}
								</span>
							</div>
							{/* Project screenshot */}
							<div className="aspect-w-16 aspect-h-9 w-full bg-black/30 flex items-center justify-center">
															<Image
																src={project.image}
																alt={project.title}
																className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
																loading="lazy"
																width={640}
																height={360}
															/>
							</div>
							<div className="p-6">
								<h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
									{project.title}
								</h2>
								<p className="text-white/70 text-base mb-2">
									{project.description}
								</p>
								<div className="flex items-center gap-2 mt-4">
									{project.languages && project.languages.map(lang => (
										<span key={lang}>{languageIcons[lang] || lang}</span>
									))}
								</div>
								<div className="mt-4 flex justify-center">
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 group"
									>
										<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
										<span className="tracking-wide">View Live</span>
									</a>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* GitHub Projects Section */}
				<h2 className="text-2xl font-bold text-white mb-6 mt-2 w-full text-center max-w-6xl">Open-Source Projects</h2>
				<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
					{githubProjects.map((gh, idx) => (
						<div
							key={gh.repo}
							className="group block rounded-2xl overflow-hidden border border-white/10 bg-[#161b22] hover:bg-[#22272e] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.03] focus:outline-none"
							style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}
						>
							{/* GitHub repo chrome */}
							<div className="bg-[#0d1117] px-4 py-2 flex items-center gap-2 border-b border-white/10">
								<svg
									viewBox="0 0 16 16"
									width="20"
									height="20"
									fill="white"
									className="mr-2"
								>
									<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
								</svg>
								<span className="ml-1 text-xs text-white/80 truncate font-mono">
									{gh.repo}
								</span>
								<span className="ml-auto text-xs text-white/40">GitHub</span>
							</div>
							<div className="p-6">
								<h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
									{gh.name}
								</h2>
								<p className="text-white/70 text-base mb-2">
									{gh.description}
								</p>
								<div className="flex items-center gap-2 mt-4">
									{gh.languages && gh.languages.map(lang => (
										<span key={lang}>{languageIcons[lang] || lang}</span>
									))}
								</div>
								<div className="flex items-center gap-4 mt-2">
									<span className="flex items-center text-white/60 text-sm">
										<svg
											viewBox="0 0 16 16"
											width="16"
											height="16"
											fill="currentColor"
											className="mr-1"
										>
											<path d="M8 12.027c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.21-1.79 4-4 4zm0-7.027c-1.654 0-3 1.346-3 3 0 1.654 1.346 3 3 3s3-1.346 3-3c0-1.654-1.346-3-3-3z" />
										</svg>
										{gh.stars}
									</span>
									<span className="flex items-center text-white/60 text-sm">
										<svg
											viewBox="0 0 16 16"
											width="16"
											height="16"
											fill="currentColor"
											className="mr-1"
										>
											<path d="M5 3.09V1.5A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1.59A5.978 5.978 0 0 1 14 8c0 3.314-2.686 6-6 6s-6-2.686-6-6a5.978 5.978 0 0 1 3-4.91zM6.5 1a.5.5 0 0 0-.5.5v1.09A5.978 5.978 0 0 1 8 2c.69 0 1.36.1 2 .28V1.5a.5.5 0 0 0-.5-.5h-3z" />
										</svg>
										{gh.forks}
									</span>
								</div>
								<div className="mt-6 flex justify-center">
									<a
										href={gh.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold shadow-lg hover:from-gray-900 hover:to-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 active:scale-95 group"
									>
										<svg width="20" height="20" fill="white" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
										<span className="tracking-wide">View on GitHub</span>
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
}
