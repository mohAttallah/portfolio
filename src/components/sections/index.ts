'use client';

import dynamic from 'next/dynamic';

export const LandingSection = dynamic(() => import('./Landing'), { ssr: false });
export const MySkillsSection = dynamic(() => import('./MySkills'), { ssr: false });
export const ExperienceSection = dynamic(() => import('./MyExperience'), { ssr: false });
export const AboutMeSection = dynamic(() => import('./AboutMe'), { ssr: false }); 
export const ProjectsSection = dynamic(() => import('./MyProjects'), { ssr: false });
export const TestimonialsSection = dynamic(() => import('./Testimonial'), { ssr: false });
export const ContactSection = dynamic(() => import('./ContactMe'), { ssr: false });