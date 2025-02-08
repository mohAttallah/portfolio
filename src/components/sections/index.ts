import dynamic from 'next/dynamic';

export const AboutMeSection = dynamic(() => import('./AboutMe'), { ssr: false });
export const MySkillsSection = dynamic(() => import('./MySkills'), { ssr: false });
export  const ExperienceSection = dynamic(() => import('./MyExperience'), { ssr: false });