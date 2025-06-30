// This file should only contain your data exports.

// --- 1. The Featured Project ---
export const featuredProject = {
  id: "featured",
  image: "/project1.png",
  title: "Enterprise SaaS Platform",
  description: "A multi-tenant SaaS application for project management.",
  technologies: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "AWS",
  ],
  keyFeatures: [
    { icon: "FiUsers", text: "User Authentication & Roles" },
    { icon: "FiDatabase", text: "RESTful API & Data Persistence" },
    { icon: "FiLayers", text: "Microservices Architecture" },
  ],
  repoLink: "https://github.com/teddy-ctrl/Evangadi_Forum",
  liveLink: "https://evangadi-forum-three.vercel.app/",
  caseStudy: {
    problem:
      "Businesses needed a centralized, secure platform to manage complex projects and user permissions.",
    solution:
      "I architected and built a cloud-native SaaS platform with a React SPA front-end and separate microservices for the back-end, all containerized with Docker and deployed on AWS.",
    role: "Lead Full-Stack Developer.",
  },
};

// --- 2. The List of Other Main Projects ---
// NOW WITH 5 UNIQUE PROJECTS
export const otherProjects = [
  {
    id: 2,
    image: "/project2.png",
    title: "Netflix Clone",
    description:
      "A full-stack chat app using WebSockets for instant messaging.",
    technologies: ["React", "Node.js", "Socket.IO", "Redis"],
    repoLink: "https://github.com/teddy-ctrl/Netflix_Clone.git",
    liveLink: "https://netflix-clone-eight-nu-45.vercel.app/",
    caseStudy: {
      problem:
        "Users wanted to browse and preview movies and series in an intuitive, responsive interface inspired by Netflix.",
      solution:
        "I built a dynamic streaming UI with React and integrated TMDB API for real-time movie data.",
      role: "Front-End Developer | API Integration | Responsive UI",
    },
  },
  {
    id: 3,
    image: "/project3.png",
    title: "Apple Clone",
    description: "Apple clone using React.",
    technologies: ["Node.js", "Express", "Stripe API", "MYSQL"],
    repoLink: "https://github.com/your-username/chat-app",
    liveLink: "https://chat-app.your-domain.com",
    caseStudy: {
      problem:
        "A client wanted a responsive Apple clone with seamless web and mobile experiences.",
      solution:
        "I built a full-stack clone using React (front end), Express.js (back end), and Stripe for payments — all optimized for performance and cross-platform use.",
      role: "Full-Stack Developer.",
    },
  },
  {
    id: 4,
    image: "/aba.png",
    title: "Manage Garage Management",
    description: "Real-time management and time tracking.",
    technologies: ["React", "Express", "Node.js", "MYSQL", "REST APIs", "Vite"],
    repoLink: "https://github.com/your-username/chat-app",
    liveLink: "https://chat-app.your-domain.com",
    caseStudy: {
      problem:
        "A client needed a responsive web and mobile app to manage garage clients, inventory, employee availability, and track work hours.",
      solution:
        "I built a full-stack solution using React, Express.js, and a database for real-time management and time tracking.",
      role: "Front-End Developer.",
    },
  },
  {
    id: 5,
    image: "/uber.png", // Use a new image
    title: "DevOps CI/CD Pipeline",
    description:
      "Automated build, test, and deployment pipeline for a Node.js application.",
    technologies: ["GitHub Actions", "Docker", "AWS S3", "Nginx"],
    repoLink: "https://github.com/your-username/chat-app",
    liveLink: "https://chat-app.your-domain.com",
    caseStudy: {
      problem:
        "The development team was spending too much time on manual deployments, which were slow and error-prone.",
      solution:
        "I implemented a complete CI/CD pipeline using GitHub Actions. On every push to the main branch, the pipeline automatically runs tests, builds a Docker image, and deploys the new version to an AWS S3 bucket with zero downtime.",
      role: "DevOps Engineer.",
    },
  },
  {
    id: 6,
    image: "/paypal.png", // Use a new image
    title: "DevOps CI/CD Pipeline",
    description:
      "Automated build, test, and deployment pipeline for a Node.js application.",
    technologies: ["GitHub Actions", "Docker", "AWS S3", "Nginx"],
    repoLink: "https://github.com/your-username/chat-app",
    liveLink: "https://chat-app.your-domain.com",
    caseStudy: {
      problem:
        "The development team was spending too much time on manual deployments, which were slow and error-prone.",
      solution:
        "I implemented a complete CI/CD pipeline using GitHub Actions. On every push to the main branch, the pipeline automatically runs tests, builds a Docker image, and deploys the new version to an AWS S3 bucket with zero downtime.",
      role: "DevOps Engineer.",
    },
  },
  {
    id: 7,
    image: "/zoom.png", // Use a new image
    title: "DevOps CI/CD Pipeline",
    description:
      "Automated build, test, and deployment pipeline for a Node.js application.",
    technologies: ["GitHub Actions", "Docker", "AWS S3", "Nginx"],
    repoLink: "https://github.com/your-username/chat-app",
    liveLink: "https://chat-app.your-domain.com",
    caseStudy: {
      problem:
        "The development team was spending too much time on manual deployments, which were slow and error-prone.",
      solution:
        "I implemented a complete CI/CD pipeline using GitHub Actions. On every push to the main branch, the pipeline automatically runs tests, builds a Docker image, and deploys the new version to an AWS S3 bucket with zero downtime.",
      role: "DevOps Engineer.",
    },
  },
  {
    id: 8,
    image: "/project8.png", // Use a new image
    title: "GraphQL API for Mobile App",
    description:
      "A flexible GraphQL API to serve data to both iOS and Android clients.",
    technologies: ["Node.js", "Apollo Server", "GraphQL", "Prisma"],
    repoLink: "https://github.com/teddy-ctrl/amazon-project.git",
    liveLink: "https://amazon-project-nine-jade.vercel.app",
    caseStudy: {
      problem:
        "Users wanted a scalable, responsive e-commerce experience similar to Amazon with real-time features.",
      solution:
        "I built a full-stack Amazon clone using React.js , Firebase , Node.js , and Express.js — featuring product browsing, search, cart functionality, and secure authentication.",
      role: "Full Stack Developer | Firebase & API Integration | Responsive UI",
    },
  },
];

// NOTE: The `otherNoteworthyProjects` array is not included here as your component code did not use it.
