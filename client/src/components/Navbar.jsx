import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';

const Navbar = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleInternalNav = (target) => {
    if (onNavigate) {
      onNavigate(target);
    }
    setMenuOpen(false);
  };

  const isHome = location.pathname === '/';

  const handleSectionClick = (target) => {
    if (isHome) {
      handleInternalNav(target);
    } else {
      if (target === 'home') {
        navigate('/');
      } else {
        navigate('/', { state: { scrollTo: target } });
      }
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 shadow-lg">
      <TopBar />
      <div className="border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link
            to="/"
            className="group relative flex items-center gap-3 text-base font-semibold text-ink"
            onClick={() => handleSectionClick('home')}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand/80 text-lg font-semibold text-white shadow-card transition group-hover:scale-105 group-hover:shadow-2xl">
              KA
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display tracking-wide">Kriti IELTS Academy</span>
              <span className="text-xs font-medium text-slate-500">Ranked No.1 in Panchkula</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-semibold uppercase tracking-[0.12em] text-dusk md:flex">
            <Link
              to="/"
              className="rounded-full px-4 py-2 transition hover:bg-brand/10 hover:text-brand"
              onClick={() => handleSectionClick('home')}
            >
              Home
            </Link>
            <Link
              to="/programs"
              className="rounded-full px-4 py-2 transition hover:bg-brand/10 hover:text-brand"
              onClick={() => setMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              to="/blog"
              className="rounded-full px-4 py-2 transition hover:bg-brand/10 hover:text-brand"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <button
              type="button"
              className="rounded-full px-4 py-2 transition hover:bg-brand/10 hover:text-brand"
              onClick={() => handleSectionClick('contact')}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark md:inline-flex"
              onClick={() => handleSectionClick('contact')}
            >
              Call Now
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand hover:text-brand md:hidden"
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">Toggle menu</span>
              <div className="space-y-1.5">
                <span className="block h-0.5 w-6 rounded-full bg-current" />
                <span className="block h-0.5 w-6 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
              </div>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2 text-base font-medium text-slate-600">
            <button
              type="button"
              className="rounded-2xl px-4 py-3 text-left transition hover:bg-brand/10 hover:text-brand"
              onClick={() => handleSectionClick('home')}
            >
              Home
            </button>
            <Link
              to="/programs"
              className="rounded-2xl px-4 py-3 transition hover:bg-brand/10 hover:text-brand"
              onClick={() => setMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              to="/blog"
              className="rounded-2xl px-4 py-3 transition hover:bg-brand/10 hover:text-brand"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <button
              type="button"
              className="rounded-2xl px-4 py-3 text-left transition hover:bg-brand/10 hover:text-brand"
              onClick={() => handleSectionClick('contact')}
            >
              Contact
            </button>
            <button
              type="button"
              className="mt-2 rounded-2xl bg-brand px-4 py-3 text-left text-white shadow-soft transition hover:bg-brand-dark"
              onClick={() => handleSectionClick('contact')}
            >
              Call Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
