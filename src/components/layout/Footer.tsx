import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-emerald-400/15 bg-[#041711] py-10 text-emerald-100/75">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2 font-display text-base font-bold text-emerald-100">
            <Globe2 className="h-5 w-5 text-emerald-400" />
            <span>VERDANTIA — The Living Planet</span>
          </div>
          <p className="mt-1 text-xs text-emerald-200/65">
            Play. Explore. Protect. Transform. • Frontend Interactive Demo (Local Persistence)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium">
          <Link to="/explore" className="hover:text-emerald-300">
            World Explorer
          </Link>
          <Link to="/missions" className="hover:text-emerald-300">
            Mission Center
          </Link>
          <Link to="/companion" className="hover:text-emerald-300">
            Local Eco-Guide
          </Link>
          <Link to="/dashboard" className="hover:text-emerald-300">
            Dashboard
          </Link>
          <span className="inline-flex items-center gap-1 text-emerald-400/80">
            <Leaf className="h-3.5 w-3.5" />
            Low-Poly Optimized
          </span>
        </div>
      </div>
    </footer>
  );
};
