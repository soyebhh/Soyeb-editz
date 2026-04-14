import React from 'react';
import { Services } from './Services';
import { PortfolioGrid } from './PortfolioGrid';
import { TrustedCreators } from './TrustedCreators';
import { ReelEmbed } from './ReelEmbed';
import { Process } from './Process';
import { FAQ } from './FAQ';
import { EditingCTA } from './EditingCTA';
import { WhatsAppFloat } from './WhatsAppFloat';
import { ArrowLeft } from 'lucide-react';

interface EditorViewProps {
  onBack: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ onBack }) => {
  return (
    <div className="editor-view">
      {/* Mini Header / Back Button */}
      <div className="fixed top-24 left-6 z-[60] md:left-12">
        <button 
          onClick={onBack}
          className="btn-outline !px-4 !py-2 !rounded-lg bg-black/40 backdrop-blur-md flex items-center gap-2 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Dev</span>
        </button>
      </div>

      <main>
        <div className="pt-20">
          <TrustedCreators />
          <EditingCTA />
          <Services />
          <ReelEmbed />
          <PortfolioGrid />
          <Process />
          <FAQ />
        </div>
      </main>
      
      <WhatsAppFloat />
    </div>
  );
};

export default EditorView;
