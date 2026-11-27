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
      <Navbar />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
      <NotificationToasts />
    </div>
  );
};
