import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import DeveloperView from './components/DeveloperView';
import EditorView from './components/EditorView';
import CustomCursor from './components/CustomCursor';

function App() {
  const [currentView, setCurrentView] = useState<'developer' | 'editor'>('developer');

  useEffect(() => {
    // Intersection Observer for fade-in sections
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [currentView]);

  return (
    <div className={`bg-dark min-h-screen selection:bg-accent selection:text-white ${currentView === 'editor' ? 'editor-view' : ''}`}>
      <CustomCursor />
      <Header 
        currentView={currentView} 
        onSwitch={(view) => setCurrentView(view)} 
      />
      
      <main>
        {currentView === 'developer' ? (
          <DeveloperView onSwitchToEditor={() => setCurrentView('editor')} />
        ) : (
          <EditorView onBack={() => setCurrentView('developer')} />
        )}
      </main>

      <footer className="py-12 border-t border-white/5 text-center bg-black/20">
        <div className="container-custom px-6">
          <p className="text-white/20 text-xs uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Soyeb Khan. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;