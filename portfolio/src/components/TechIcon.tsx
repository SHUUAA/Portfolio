import type { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiNodedotjs,
  SiSpringboot,
  SiVite,
  SiNextdotjs,
  SiSupabase,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiN8N,
  SiClaude,
  SiTailwindcss,
  SiThreedotjs,
  SiGreensock,
  SiGit,
  SiFigma,
  SiPostman,
  SiVercel,
  SiExpo,
  SiGooglesheets,
  SiChartdotjs,
  SiEspressif,
  SiElevenlabs,
} from 'react-icons/si';
import { Cpu, Database, Brain, MessageSquare, Cog } from 'lucide-react';

// Map tech-tag string → react-icons component.
// Names below match the values used in PROJECTS.tech and CAPABILITIES.tags.
const ICONS: Record<string, IconType> = {
  React: SiReact,
  'React Native': SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  Java: SiOpenjdk,
  'Node.js': SiNodedotjs,
  'Spring Boot': SiSpringboot,
  Vite: SiVite,
  'Next.js': SiNextdotjs,
  'Next.js 16': SiNextdotjs,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  PLpgSQL: SiPostgresql,
  n8n: SiN8N,
  'Claude AI': SiClaude,
  TailwindCSS: SiTailwindcss,
  'Three.js': SiThreedotjs,
  GSAP: SiGreensock,
  Git: SiGit,
  Figma: SiFigma,
  Postman: SiPostman,
  Vercel: SiVercel,
  Expo: SiExpo,
  'Google Sheets API': SiGooglesheets,
  'Chart.js': SiChartdotjs,
  'ElevenLabs AI': SiElevenlabs,
  ESP32: SiEspressif,
  // Lucide fallback for hardware-class tags
  IoT: Cpu as unknown as IconType,
  RFID: Cpu as unknown as IconType,
  // AI / chatbot tags
  RAG: Database as unknown as IconType,
  LLM: Brain as unknown as IconType,
  Chatbot: MessageSquare as unknown as IconType,
  OpenClaw: Cog as unknown as IconType,
};

export const TechIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-3 h-3',
}) => {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
};

export default TechIcon;
