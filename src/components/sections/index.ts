import dynamic from 'next/dynamic';

export const AboutMeSection = dynamic(() => import('./AboutMe'), { ssr: false });