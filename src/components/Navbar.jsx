import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, Menu, X, Sprout, Store, User } from 'lucide-react';

export default function Navbar({ darkText = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="w-full relative z-30">
      <nav 
        aria-label="Main Navigation" 
        className="w-full bg-transparent pt-4 sm:pt-6 pb-3 sm:pb-4 px-4 sm:px-6 md:px-10 lg:px-16 max-w-[1440px] mx-auto flex items-center justify-between"
      >
        {/* Brand Logo */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className={`font-extrabold text-[24px] sm:text-[28px] md:text-[32px] tracking-[-0.03em] font-sans select-none hover:opacity-95 transition-opacity focus:outline-none ${
              darkText ? 'text-[#1B4332]' : 'text-white'
            }`}
            style={{ letterSpacing: '-0.02em' }}
          >
            GROVE
          </Link>
        </div>

        {/* Desktop Navigation Controls (>= md / 768px) */}
        <div className="hidden md:flex items-center gap-5 md:gap-7">
          <Link
            to="/login"
            className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
              darkText ? 'text-neutral-700 hover:text-[#1B4332]' : 'text-white/95 hover:text-white'
            }`}
          >
            Sign In
          </Link>

          <Link
            to="/become-a-dealer"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 md:px-5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] ${
              darkText 
                ? 'bg-[#1B4332] hover:bg-[#081C15] text-white' 
                : 'bg-[#F7F4ED] hover:bg-white text-[#0A3325]'
            }`}
          >
            <span>Become a Dealer</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] ml-0.5" />
          </Link>

          <a
            href="#help"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight transition-colors duration-200 ${
              darkText ? 'text-neutral-700 hover:text-[#1B4332]' : 'text-white/95 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4 stroke-[2]" />
            <span>Help</span>
          </a>
        </div>

        {/* Mobile Navigation Controls (< md / 768px) */}
        <div className="flex md:hidden items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className={`text-xs font-bold px-2.5 py-1.5 rounded-full transition-colors ${
              darkText 
                ? 'text-[#1B4332] hover:bg-[#1B4332]/10' 
                : 'text-white/95 hover:bg-white/10'
            }`}
          >
            Sign In
          </Link>

          <Link
            to="/become-a-dealer"
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow-2xs ${
              darkText
                ? 'bg-[#1B4332] text-white'
                : 'bg-[#F7F4ED] text-[#0A3325]'
            }`}
          >
            <Store className="w-3 h-3" />
            <span className="hidden min-[360px]:inline">Dealer</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className={`p-1.5 rounded-[10px] transition-colors cursor-pointer ${
              darkText
                ? 'text-[#1B4332] hover:bg-neutral-200/60'
                : 'text-white hover:bg-white/15'
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.2]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.2]" />
            )}
          </button>
        </div>
      </nav>

      {/* Accessible Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[56px] sm:top-[68px] z-50 px-4 pt-2 pb-6 animate-in slide-in-from-top-3 duration-200">
          <div 
            className={`rounded-[20px] p-5 shadow-2xl border ${
              darkText
                ? 'bg-white text-neutral-900 border-neutral-200'
                : 'bg-[#082218] text-white border-white/15 shadow-black/40'
            }`}
          >
            <div className="flex flex-col gap-3">
              <Link
                to="/agriculture"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-[12px] text-xs sm:text-sm font-bold transition-colors ${
                  darkText
                    ? 'hover:bg-neutral-100 text-[#1B4332]'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sprout className="w-4 h-4 text-[#8BCB45]" />
                  <span>Agriculture Marketplace</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              <Link
                to="/become-a-dealer"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-[12px] text-xs sm:text-sm font-bold transition-colors ${
                  darkText
                    ? 'hover:bg-neutral-100 text-[#1B4332]'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Store className="w-4 h-4 text-[#FF383F]" />
                  <span>Become an Authorized Dealer</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-[12px] text-xs sm:text-sm font-bold transition-colors ${
                  darkText
                    ? 'hover:bg-neutral-100 text-neutral-800'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-neutral-400" />
                  <span>Customer Sign In</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              <a
                href="#help"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-[12px] text-xs sm:text-sm font-bold transition-colors ${
                  darkText
                    ? 'hover:bg-neutral-100 text-neutral-700'
                    : 'hover:bg-white/10 text-white/90'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-neutral-400" />
                  <span>Help &amp; Customer Support</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
