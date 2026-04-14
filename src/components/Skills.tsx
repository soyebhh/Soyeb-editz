import React from 'react';
import { 
  Code2, 
  Globe, 
  Database, 
  Framer, 
  Terminal, 
  Layers, 
  Figma, 
  Video,
  ShoppingBag
} from 'lucide-react';

const Skills: React.FC = () => {
  const skills = [
    { name: 'Shopify Liquid', icon: <ShoppingBag className="w-8 h-8" /> },
    { name: 'JavaScript', icon: <Code2 className="w-8 h-8" /> },
    { name: 'React', icon: <Globe className="w-8 h-8" /> },
    { name: 'Node.js', icon: <Terminal className="w-8 h-8" /> },
    { name: 'Tailwind CSS', icon: <Layers className="w-8 h-8" /> },
    { name: 'MongoDB / SQL', icon: <Database className="w-8 h-8" /> },
    { name: 'Figma', icon: <Figma className="w-8 h-8" /> },
    { name: 'Video Editing', icon: <Video className="w-8 h-8" /> },
  ];

  return (
    <section id="skills" className="section-padding bg-dark">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Tech Stack</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              className="fade-in-section p-8 rounded-2xl glass border border-white/5 flex flex-col items-center justify-center gap-4 hover:border-accent/40 group transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-white/60 group-hover:text-accent transition-colors duration-300">
                {skill.icon}
              </div>
              <span className="text-sm font-medium tracking-wider uppercase text-white/50 group-hover:text-white transition-colors duration-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
