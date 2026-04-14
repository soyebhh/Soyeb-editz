import React from 'react';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      company: 'Binary Web Solutions India Pvt. Ltd',
      role: 'Shopify Developer',
      period: 'July 2025 - Present',
      description: [
        'Building and customizing responsive eCommerce storefronts using HTML, CSS, JavaScript, and Shopify Liquid.',
        'Implementing UI enhancements and theme customizations.',
        'Collaborating with designers and developers in fast-paced environments.'
      ]
    },
    {
      company: 'COMNet Solutions Pvt. Ltd.',
      role: 'Networking Support',
      period: 'October 2023 - 2024',
      description: [
        'Performed IP configuration and networking tasks for Axis Bank ATM and CCTV systems.',
        'Supported network setup and operational activities in accordance with project requirements.'
      ]
    }
  ];

  return (
    <section id="experience" className="section-padding bg-dark">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Work Experience</h2>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={exp.company}
              className="fade-in-section relative pl-8 md:pl-12 border-l border-white/10"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-accent"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                <span className="text-sm font-medium uppercase tracking-widest text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/20">
                  {exp.period}
                </span>
              </div>
              
              <p className="text-lg font-medium text-white/80 mb-4">{exp.role}</p>
              
              <ul className="space-y-3">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-white/60 text-sm flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
