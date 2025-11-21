export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  technologies: string[];
  imageUrl?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface UserProfile {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl?: string;
  skills: string[];
  goals: string;
  socials: SocialLinks;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}

export const INITIAL_PROFILE: UserProfile = {
  fullName: "Alex Design",
  title: "Creative Developer",
  bio: "Passionate about building accessible web applications and stunning user interfaces.",
  email: "alex@example.com",
  location: "San Francisco, CA",
  skills: ["React", "TypeScript", "Node.js", "UI/UX"],
  goals: "To lead a frontend team in a product-led company.",
  socials: {
    github: "github.com/alex",
    linkedin: "linkedin.com/in/alex",
  },
  experiences: [],
  education: [],
  projects: []
};