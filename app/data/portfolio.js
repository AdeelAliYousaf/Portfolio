export const portfolio = {
  
  projects: {
    categories: ["Real Client", "Open Source GitHub"],
    realClient: [
      {
        title: "Dynamic B2B Product Catalog Web Application",
        description:
          "A web application that showcases a dynamic product catalog for B2B clients, built with Laravel Breeze, Inertia.js, React.js, and Tailwind CSS.",
        url: "https://topinworldleather.com/",
        image: "/TIWLAnimation.gif",
        languages: ["Laravel", "React", "Tailwind CSS"],
      },
      {
        title: "Modern Product Portfolio Web Application",
        description:
          "A web application that showcases a modern product portfolio for a US-based client, built with Laravel Breeze, Inertia.js, React.js, and Tailwind CSS.",
        url: "https://veritasedgeglobal.com/",
        image: "/VEGAnimation.gif",
        languages: ["Laravel", "React", "Tailwind CSS"],
      },
    ],
    openSource: [
      {
        repo: "AdeelAliYousaf/TheSmartWebCam",
        url: "https://github.com/AdeelAliYousaf/TheSmartWebCam",
        name: "The Smart WebCam",
        description:
          "Face Attendance System made in Python using OpenCV and Deep Learning with real-time email alerts.",
        stars: 2,
        forks: 45,
        languages: ["Python"],
      },
      {
        repo: "AdeelAliYousaf/ViolenceDetectionSystem",
        url: "https://github.com/AdeelAliYousaf/ViolenceDetectionSystem",
        name: "Violence Detection System",
        description:
          "Detects violence in videos using machine learning with a Gradio Web UI.",
        stars: 8,
        forks: 12,
        languages: ["Python"],
      },
      {
        repo: "AdeelAliYousaf/webrtc-app",
        url: "https://github.com/AdeelAliYousaf/webrtc-app",
        name: "WebRTC Web App",
        description:
          "Real-time communication app using WebRTC, React.js frontend, PHP backend, and a TURN server.",
        stars: 12,
        forks: 5,
        languages: ["React", "PHP"],
      },
      {
        repo: "AdeelAliYousaf/LearningManagementSystem",
        url: "https://github.com/AdeelAliYousaf/LearningManagementSystem",
        name: "Learning Management System",
        description:
          "A dynamic LMS built with ASP.NET Core MVC (C#) and MSSQL, with dashboards for Admin, Teacher, and Student.",
        stars: 15,
        forks: 24,
        languages: ["ASP.NET", "C#", "MSSQL"],
      },
      {
        repo: "AdeelAliYousaf/FinalYearProjectManagementSystem",
        url: "https://github.com/AdeelAliYousaf/FinalYearProjectManagement",
        name: "Final Year Project Management System",
        description:
          "A project management system built with core PHP and MySQL for managing student final year projects.",
        stars: 6,
        forks: 2,
        languages: ["PHP", "MySQL"],
      },
      {
        repo: "AdeelAliYousaf/usktgpacalculator",
        url: "https://github.com/AdeelAliYousaf/usktgpacalculator",
        name: "USKT GPA Calculator",
        description:
          "A React + Tailwind web app that calculates GPA/CGPA for University of Sialkot students.",
        stars: 6,
        forks: 2,
        languages: ["React", "Tailwind CSS"],
      },
    ],
  },

  education: [
    {
      id: 1,
      degree: "Bachelors of Science in Computer Science",
      institution: "University of Sialkot",
      location: "Sialkot, Punjab, Pakistan",
      duration: "2024 - 2026",
      status: "Ongoing",
      specialization: "Computer Science",
      achievements: [
        "Created a Learning Management System using ASP.NET Core MVC",
        "Created a mobile application for local businesses",
      ],
      skills: [
        "Python",
        "TensorFlow",
        "Deep Learning",
        "Research",
        "Data Science",
        "ASP.NET Core MVC",
        "Mobile Development",
        "React",
        "Node.js",
        "Software Engineering",
        "Operating Systems",
      ],
    },
    {
      id: 2,
      degree: "Associate Degree in Computer Studies",
      institution: "University of Sialkot",
      location: "Sialkot, Punjab, Pakistan",
      duration: "2022 - 2024",
      status: "Completed",
      specialization: "Computer Science",
      achievements: [
        "Created Face Attendance System",
        "Built a project management web app for FYP records",
      ],
      skills: [
        "JavaScript",
        "C++",
        "Python",
        "System Design",
        "Software Engineering",
        "Docker",
      ],
    },
  ],

  certifications: {
    courses: [
      {
        title: "AI For Everyone",
        issuer: "Coursera / DeepLearning.AI",
        date: "2024",
        image: "/My Certifications/courseraaiforeveryone.png",
        url: "https://www.coursera.org/account/accomplishments/verify/7GKE32L7LW1J",
      },
      {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        date: "2025",
        image: "/My Certifications/ciscocybersecuritycert.png",
        url: "https://www.credly.com/badges/0d3308bc-e46b-43ec-a074-9885b5ec1ea4/public_url",
      },
    ],

    certificates: [
      {
        title: "Foundational C# with Microsoft",
        issuer: "freeCodeCamp / Microsoft",
        date: "July 2025",
        image: "/My Certifications/foundationalcsharp.webp",
        url: "https://www.freecodecamp.org/certification/fcc-92a05b6e-5327-408a-b87a-dde88e663e66/foundational-c-sharp-with-microsoft",
      },
      {
        title: "Scientific Computing with Python",
        issuer: "freeCodeCamp",
        date: "July 2025",
        image: "/My Certifications/scientificcomputing.webp",
        url: "https://www.freecodecamp.org/certification/fcc-92a05b6e-5327-408a-b87a-dde88e663e66/scientific-computing-with-python-v7",
      },
      {
        title: "Getting Started with AI on Jetson Nano",
        issuer: "Nvidia",
        date: "August 2025",
        image: "/My Certifications/nvidiagetstartwithai.webp",
        url: "https://learn.nvidia.com/certificates?id=ng4oMzZWSZeANQ6lASqylQ",
      },
    ],

    skillTests: [
      {
        title: "Software Engineer",
        issuer: "HackerRank",
        date: "July 2025",
        image: "/My Certifications/hackerranksoftwareengineer.webp",
        url: "https://www.hackerrank.com/certificates/d775a0d73a6d",
      },
      {
        title: "Python",
        issuer: "TestDome",
        date: "July 2025",
        image: "/My Certifications/testdomepython.webp",
        url: "https://www.testdome.com/certificates/6c11bd96dd264cffb249ac8304157593",
      },
      {
        title: "ASP.NET Core MVC",
        issuer: "TestDome",
        date: "July 2025",
        image: "/My Certifications/testdomeaspnet.webp",
        url: "https://www.testdome.com/certificates/299aa2c51f8a4f87a5e6ac1f731dfa8d",
      },
      {
        title: "SQL",
        issuer: "TestDome",
        date: "September 2024",
        image: "/My Certifications/testdomesql.jpg",
        url: "https://www.testdome.com/certificates/948f951cb8284eeb971f0f7fc496a692",
      },
    ],

    badges: [
      {
        title: "AWS Educate Introduction to Cloud 101",
        issuer: "Amazon Web Services",
        date: "2024",
        image: "/My Certifications/awsintrotocloudbadge.png",
        url: "https://www.credly.com/badges/39fa9520-1288-44f4-ad2b-0d4a01aa3e44/public_url",
      },
      {
        title: "AWS Educate Introduction to Generative AI",
        issuer: "Amazon Web Services",
        date: "2024",
        image: "/My Certifications/awsintrotogenai.png",
        url: "https://www.credly.com/badges/f8199c32-08a5-4f68-8f8f-64a289ccc13e/public_url",
      },
      {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco",
        date: "2025",
        image: "/My Certifications/ciscointrotocybersecurity.png",
        url: "https://www.credly.com/badges/0d3308bc-e46b-43ec-a074-9885b5ec1ea4/public_url",
      },
    ],

    internships: [
      {
        title: "Solution Architecture Job Simulation",
        issuer: "Forage / Amazon Web Services (AWS)",
        date: "July 2025",
        image: "/My Certifications/amazonjobsim.webp",
        url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_EyEWnFY4YWTWSAJBW_1753449738321_completion_certificate.pdf",
      },
      {
        title: "Software Engineering Job Simulation",
        issuer: "Forage / Electronic Arts (EA)",
        date: "July 2025",
        image: "/My Certifications/eajobsim.webp",
        url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_EyEWnFY4YWTWSAJBW_1753448518818_completion_certificate.pdf",
      },
      {
        title: "Software Engineering Job Simulation",
        issuer: "Forage / JP Morgan Chase & Co.",
        date: "July 2025",
        image: "/My Certifications/jpmorganjobsim.webp",
        url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_EyEWnFY4YWTWSAJBW_1753399701894_completion_certificate.pdf",
      },
    ],
  },
  socialLinks: {
    github: "https://github.com/AdeelAliYousaf",
    linkedin: "https://www.linkedin.com/in/adeel-ali-yousaf-b10b87232",
    twitter: "https://twitter.com/AdeelAliYousaf",
    instagram: "https://www.instagram.com/adeelportfolio/",
    email: "adeelaliyousaf.dev@gmail.com",
    facebook: "https://www.facebook.com/adeelstopshate",
    freelance: "https://contra.com/adeel_ali_yousaf_266gxcxu",
    whatsapp: "https://wa.me/+923390113811",
    ContactNumber: "+923390113811"
  }
};
