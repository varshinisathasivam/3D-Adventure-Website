import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { NotificationToasts } from '../common/NotificationToasts';
import { useGameStore } from '../../store/useGameStore';

interface AppLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, hideFooter = false }) => {
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);

  return (
    <div
      className={`flex min-h-screen flex-col bg-[#062018] text-emerald-50 ${
        reducedMotion ? 'reduced-motion' : ''
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-emerald-400 focus:px-4 focus:py-2 focus:font-bold focus:text-slate-950"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <NotificationToasts />
    </div>
  );
};
