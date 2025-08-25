import { Globe, Smartphone, BrainCircuit, BarChart3, Cloud, ShieldCheck, Wrench, Paintbrush, SearchCheck, ArrowLeftRight, BookOpenCheck, Users, ShoppingCart, Code2, Zap, Link2 } from "lucide-react";
import { FaRegObjectGroup, FaRobot, FaRegLightbulb } from "react-icons/fa";

export const metadata = {
  metadataBase: new URL("https://adeelaliyousaf.vercel.app"),
  title: 'Solutions | Adeel Ali Yousaf',
  description: 'Solution Adeel provides for web development, mobile apps, and digital solutions. Located in Sialkot, Pakistan.',
  keywords: 'services, solutions, web development, mobile apps, Sialkot, Pakistan, digital solutions',
  authors: [{ name: 'Adeel Ali Yousaf' }],
  creator: 'Adeel Ali Yousaf',
  publisher: 'Adeel Ali Yousaf',
  openGraph: {
    title: 'Solutions | Adeel Ali Yousaf',
    description: 'Get Services for web development and digital solutions',
    url: 'https://adeelaliyousaf.vercel.app/solution',
    siteName: "Adeel Ali Yousaf's Portfolio",
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Solutions by Adeel Ali Yousaf',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions | Adeel Ali Yousaf',
    description: 'Get Services for web development and digital solutions',
    images: ['/Logo.png'],
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

const serviceCategories = [
  {
    category: "Web Development",
    icon: <Globe className="inline w-7 h-7 text-blue-400 mr-1" />,
    services: [
      {
        title: "Static Website",
        description: "Fast, secure, and SEO-friendly websites for portfolios, landing pages, and business sites.",
        icon: <Code2 className="w-6 h-6 text-blue-300" />
      },
      {
        title: "Dynamic Website",
        description: "Interactive, database-driven web applications tailored to your business needs.",
        icon: <FaRegObjectGroup className="w-6 h-6 text-blue-300" />
      },
      {
        title: "E-commerce Solutions",
        description: "Custom online stores and payment gateway integration.",
        icon: <ShoppingCart className="w-6 h-6 text-green-400" />
      },
      {
        title: "Custom Plugin/Extension Development",
        description: "Develop custom plugins and extensions for web platforms.",
        icon: <Wrench className="w-6 h-6 text-yellow-400" />
      },
      {
        title: "Website Maintenance & Performance",
        description: "Ongoing updates, bug fixes, speed optimization, backups, and technical support.",
        icon: <Zap className="w-6 h-6 text-orange-400" />
      },
      {
        title: "UI/UX Design",
        description: "Wireframes, prototyping, and modern UI/UX design using Figma, Adobe XD, and best practices.",
        icon: <Paintbrush className="w-6 h-6 text-pink-400" />
      },
      {
        title: "SEO & Analytics",
        description: "Improve your search ranking and set up analytics to track visitors and conversions.",
        icon: <SearchCheck className="w-6 h-6 text-green-400" />
      },
      {
        title: "Content Migration & Data Import/Export",
        description: "Seamless migration of content and data between platforms, including import/export solutions.",
        icon: <ArrowLeftRight className="w-6 h-6 text-purple-400" />
      }
    ]
  },
  {
    category: "Mobile & Cross-Platform",
    icon: <Smartphone className="inline w-7 h-7 text-pink-400 mr-1" />,
    services: [
      {
        title: "Mobile Application Development (Cross Platform)",
        description: "High-performance mobile apps for iOS and Android using cross-platform technologies like React Native and Flutter.",
        icon: <Smartphone className="w-6 h-6 text-pink-400" />
      }
    ]
  },
  {
    category: "AI & Data",
    icon: <BrainCircuit className="inline w-7 h-7 text-purple-400 mr-1" />,
    services: [
      {
        title: "AI & Automation Solutions",
        description: "Custom AI models, machine learning, chatbots, automation, and data-driven dashboards for your business.",
        icon: <FaRobot className="w-6 h-6 text-purple-400" />
      },
      {
        title: "Data Visualization Dashboards",
        description: "Interactive dashboards and data visualizations for business intelligence and reporting.",
        icon: <BarChart3 className="w-6 h-6 text-blue-400" />
      }
    ]
  },
  {
    category: "DevOps & Cloud",
    icon: <Cloud className="inline w-7 h-7 text-cyan-400 mr-1" />,
    services: [
      {
        title: "Cloud Deployment & DevOps",
        description: "Deploy, monitor, and scale your apps on AWS, Azure, or GCP. Automated deployments and continuous integration pipelines.",
        icon: <Cloud className="w-6 h-6 text-cyan-400" />
      },
      {
        title: "Security Audits & Implementation",
        description: "Comprehensive security audits and implementation of best practices to protect your digital assets.",
        icon: <ShieldCheck className="w-6 h-6 text-red-400" />
      }
    ]
  },
  {
    category: "Consulting & Support",
    icon: <FaRegLightbulb className="inline w-7 h-7 text-yellow-300 mr-1" />,
    services: [
      {
        title: "Code Review & Consulting",
        description: "Professional code review, technical consulting, and best practice recommendations.",
        icon: <Users className="w-6 h-6 text-yellow-300" />
      },
      {
        title: "Technical Documentation & Training",
        description: "Clear, concise technical documentation and training for teams and end-users.",
        icon: <BookOpenCheck className="w-6 h-6 text-blue-300" />
      }
    ]
  }
];

export default function ServicePage() {
  return (
    <div className="min-h-screen mb-16 flex flex-col items-center px-4 py-10" style={{background: "transparent"}}>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center drop-shadow-lg">Solutions</h1>
      <div className="w-full max-w-6xl flex flex-col gap-14">
        {serviceCategories.map((cat, i) => (
          <div key={i}>
              <div className="flex flex-col items-center justify-center mb-6">
                <div>{cat.icon}</div>
                <h2 className="text-2xl font-bold text-white drop-shadow-lg mt-2 text-center">{cat.category}</h2>
              </div>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {cat.services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 backdrop-blur-sm"
                  style={{background: "transparent"}}
                >
                  <div className="mb-3">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-1 text-center">{service.title}</h3>
                  <p className="text-white/70 text-base text-center">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
