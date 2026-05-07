export interface Project {
  id: string;
  name: string;
  slug: string;
  year: string;
  description: string;
  longDescription?: string;
  websiteUrl: string;
  githubUrl: string;
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
    longDescription: "Broskie.ai is a revolutionary platform designed to automate the job application process using advanced AI. It features autonomous agents that can search for jobs, tailor resumes, and submit applications on behalf of the user. Built with Next.js, OpenAI API, and a robust backend to handle high-frequency interactions.",
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
    longDescription: "A high-fidelity editorial portfolio for a premium content creator. Focused on high-impact typography, smooth GSAP animations, and a seamless mobile experience. The design follows a strict minimalist aesthetic to highlight the creator's work.",
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
    longDescription: "Zero UI is an open-source React component library designed for developers who value speed, aesthetics, and accessibility. It provides a set of highly customizable components that follow modern design principles, making it easy to build stunning user interfaces quickly.",
    websiteUrl: "https://zeroui.vercel.app",
    githubUrl: "https://github.com/0day-Ashish/zeroui",
    image: "/projects/zero-ui2.png",
    bgColor: "#111111",
    tags: ["React", "UI Library", "Open Source", "Tailwind"],
  },
  {
    id: "04",
    name: "KRYPTOS",
    slug: "kryptos",
    year: "2026",
    description: "The only platform you need to decide about a web3 wallet.",
    longDescription: "Kryptos is a comprehensive guide and platform for Web3 enthusiasts. It helps users compare and choose the best cryptocurrency wallets based on security, features, and user reviews. Built to simplify the complex world of Web3 onboarding.",
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
    longDescription: "The official website for Signifiya '26, the annual tech festival of SOET. The platform handles event registrations, schedules, and live updates for thousands of participants. Designed with a futuristic tech theme to match the festival's spirit.",
    websiteUrl: "https://signifiya.in",
    githubUrl: "https://github.com/0day-Ashish/Signifiya",
    image: "/projects/signifiya.png",
    bgColor: "#222222",
    tags: ["Event Management", "React", "Techfest", "Animations"],
  },
  {
    id: "06",
    name: "AURA",
    slug: "aura",
    year: "2026",
    description: "Adamas University's personal student guide rag bot.",
    longDescription: "Aura is an AI-powered student guide for Adamas University. Using RAG (Retrieval-Augmented Generation), it provides students with accurate information about campus life, academics, and administrative processes in a conversational manner.",
    websiteUrl: "https://aura-au-bot.vercel.app",
    githubUrl: "https://github.com/0day-Ashish/aura",
    image: "/projects/aura.png",
    bgColor: "#222222",
    tags: ["AI", "RAG", "Education", "Bot"],
  },
];
