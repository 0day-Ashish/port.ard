export interface Project {
  id: string;
  name: string;
  slug: string;
  year: string;
  description: string;
  longDescription?: string;
  websiteUrl: string;
  githubUrl?: string;
  image: string;
  bgColor: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "01",
    name: "BROSKIE.AI",
    slug: "broskie-ai",
    year: "2026",
    description: "A full-stack AI-powered job application platform for autonomous recruitment.",
    longDescription: "Broskie.ai is a cutting-edge platform engineered to transform the recruitment landscape through automation and artificial intelligence. The system employs autonomous agents capable of performing deep-web job searches, analyzing job descriptions to match candidate profiles, and dynamically tailoring resumes and cover letters for every application. \n\nThe technical architecture leverages Next.js for a seamless frontend experience, integrated with OpenAI's GPT-4o for natural language processing and agentic reasoning. A robust Node.js backend handles complex task scheduling and high-frequency API interactions, ensuring that the autonomous application process remains efficient and reliable. This project demonstrates high-level proficiency in AI integration, full-stack development, and system automation.",
    websiteUrl: "https://broskie-ai-gtic.vercel.app/",
    githubUrl: "https://github.com/0day-Ashish/broskie.ai",
    image: "/projects/broskie.png",
    bgColor: "#0f172a",
    tags: ["Next.js", "AI", "OpenAI", "Full-stack"],
  },
  {
    id: "02",
    name: "RATNADIPA",
    slug: "ratnadipa",
    year: "2026",
    description: "A premium, high-impact portfolio for content creator Ratnadipa.",
    longDescription: "Ratnadipa is a high-fidelity digital showcase designed for a leading content creator, emphasizing visual storytelling and editorial excellence. The project challenges the standard portfolio layout by implementing a multi-layered parallax architecture and staggered GSAP animations that react to the user's scroll depth. \n\nKey features include a bespoke image gallery with lazy-loading optimization, custom cursor interactions, and a typography-first design system that ensures readability across all devices. Built with Next.js and Tailwind CSS, the site achieves near-perfect performance scores while maintaining a heavy emphasis on high-quality visual assets. It represents a perfect blend of modern front-end engineering and premium UI/UX design.",
    websiteUrl: "https://ratnadipa-portfolio-m9l9.vercel.app/",
    githubUrl: "https://github.com/0day-Ashish/ratnadipa",
    image: "/projects/ratnadipa-port.png",
    bgColor: "#1c1917",
    tags: ["GSAP", "Next.js", "Animation", "Minimalist"],
  },
  {
    id: "03",
    name: "ZERO UI",
    slug: "zero-ui",
    year: "2026",
    description: "An open-source React component library built for speed and aesthetics.",
    longDescription: "Zero UI is a developer-centric component library built to bridge the gap between rapid prototyping and production-ready code. Unlike bloated frameworks, Zero UI focuses on atomic design principles, providing a collection of lightweight, accessible, and highly performant React components. \n\nThe library is built using TypeScript for strict type safety and Tailwind CSS for utility-first styling, allowing developers to customize themes with minimal overhead. It includes advanced components like interactive data tables, animated modals, and complex form handlers. By open-sourcing this project, I've contributed to the developer community while demonstrating deep knowledge of component architecture, documentation, and maintainable code practices.",
    websiteUrl: "https://zeroui.vercel.app",
    githubUrl: "https://github.com/0day-Ashish/zeroui",
    image: "/projects/zeroui.png",
    bgColor: "#111111",
    tags: ["React", "UI Library", "Open Source", "Tailwind"],
  },
  {
    id: "04",
    name: "KRYPTOS",
    slug: "kryptos",
    year: "2026",
    description: "The only platform you need to decide about a web3 wallet.",
    longDescription: "Kryptos is a strategic Web3 onboarding platform designed to simplify the entry point into the decentralized ecosystem. It serves as a comprehensive discovery engine for blockchain wallets, providing real-time data on security protocols, chain compatibility, and user sentiment. \n\nThe application integrates with various Web3 APIs to fetch live network data and security audits. From a design perspective, Kryptos utilizes a futuristic dark-mode aesthetic with neon accents to resonate with the blockchain community. The platform is optimized for performance and security, ensuring that users can make informed decisions about their digital assets in an ever-evolving market.",
    websiteUrl: "https://kryptos-v1.vercel.app/",
    githubUrl: "https://github.com/0day-Ashish/kryptos",
    image: "/projects/kryptos-v1.png",
    bgColor: "#1a1a1a",
    tags: ["Web3", "Blockchain", "Crypto", "Next.js"],
  },
  {
    id: "05",
    name: "SIGNIFIYA'26",
    slug: "signifiya-26",
    year: "2026",
    description: "SOET's most awaited annual techfest.",
    longDescription: "Signifiya '26 is the digital backbone of one of the largest technical festivals in the region. The platform was engineered to handle thousands of concurrent users, facilitating seamless registration for over 50+ diverse technical and cultural events. \n\nTechnical challenges included building a real-time event management dashboard, a secure payment gateway integration, and a dynamic scheduling system. The frontend features high-energy animations and a mobile-first approach to ensure students can access event information on the go. This project showcases my ability to deliver enterprise-scale event solutions under tight deadlines, managing both the technical complexity and the high-stakes user experience of a major public event.",
    websiteUrl: "https://signifiya.in",
    githubUrl: "https://github.com/0day-Ashish/Signifiya",
    image: "/projects/signifiya.png",
    bgColor: "#222222",
    tags: ["Event Management", "React", "Techfest", "Animations"],
  },
  {
    id: "06",
    name: "MDROP",
    slug: "mdrop",
    year: "2026",
    description: "A premium streetwear e-commerce platform specializing in customizable apparel.",
    longDescription: "Mdrop is a dynamic streetwear e-commerce brand designed to empower self-expression through customizable apparel. The platform features an interactive design customizer allowing customers to personalize streetwear pieces in real-time. Built upon a high-performance stack of Next.js and TypeScript, the site is optimized for conversion, page speed, and interactive responsiveness. A robust PostgreSQL database serves as the backend data store for user profiles, order tracking, and custom design metadata, ensuring a scalable and reliable e-commerce infrastructure.",
    websiteUrl: "https://mrdop.in",
    image: "/projects/mdrop.png",
    bgColor: "#0d0d0d",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "E-commerce"],
  },
  {
    id: "07",
    name: "ARTSY CAFE",
    slug: "artsy-cafe",
    year: "2025",
    description: "A gorgeous, interactive website for Kolkata's popular art-themed cafe, Artsy.",
    longDescription: "Artsy Cafe is a premium web application designed and built for Kolkata's most iconic art-themed cafe, Artsy. The website serves as a digital representation of the cafe's aesthetic space, featuring an interactive digital menu, a table reservation booking flow, and a gallery showcasing local art exhibitions hosted at the venue. \n\nThe layout focuses heavily on a minimalist and editorial design system, incorporating smooth page transitions and responsive grid layouts. The system is built using Next.js and Tailwind CSS for optimized load speeds and SEO rankings, enabling local cafe-goers to discover the menu, explore current art exhibitions, and book their visits seamlessly. It exemplifies high-quality front-end engineering custom-tailored for the hospitality and food industry.",
    websiteUrl: "https://artsy-cafe.vercel.app",
    image: "/projects/artsy.png",
    bgColor: "#78350f",
    tags: ["Next.js", "Tailwind CSS", "UI/UX Design", "Hospitality"],
  },
];
