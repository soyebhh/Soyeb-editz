import React from 'react';
import { Instagram, Github, Linkedin, Mail, ArrowUpRight, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section-padding bg-dark pb-32">
      <div className="container-custom text-center">
        <div className="fade-in-section max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">Let's Connect</h2>
          <p className="text-white/50 mb-12 text-lg font-light">
            Open to collabs — developers, creators, brands
          </p>

          <a 
            href="https://ig.me/m/soyebhx" 
            className="btn-primary !px-12 !py-5 text-lg mb-16 shadow-2xl shadow-accent/20"
            target="_blank" 
            rel="noopener noreferrer"
          >
            DM on Instagram
            <ArrowUpRight size={22} />
          </a>

          <div className="flex justify-center gap-10 flex-wrap">
            <a 
              href="mailto:soyeb882818@gmail.com" 
              className="text-white/40 hover:text-accent transition-colors flex items-center gap-2"
              title="Email"
            >
              <Mail size={24} />
              <span className="hidden sm:inline text-xs uppercase tracking-widest font-bold">Email</span>
            </a>
            <a 
              href="https://youtube.com/@soyebhx" 
              className="text-white/40 hover:text-accent transition-colors flex items-center gap-2"
              title="YouTube"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Youtube size={24} />
              <span className="hidden sm:inline text-xs uppercase tracking-widest font-bold">YouTube</span>
            </a>
            <a 
              href="https://github.com/soyebhx" 
              className="text-white/40 hover:text-accent transition-colors flex items-center gap-2"
              title="GitHub"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github size={24} />
              <span className="hidden sm:inline text-xs uppercase tracking-widest font-bold">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/soyebkhn" 
              className="text-white/40 hover:text-accent transition-colors flex items-center gap-2"
              title="LinkedIn"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
              <span className="hidden sm:inline text-xs uppercase tracking-widest font-bold">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;