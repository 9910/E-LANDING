import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 text-base font-semibold text-ink"
          onClick={() => handleInternalNav('home')}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-lg font-semibold text-white shadow-card">
            Ee
          </span>
          <span className="font-display tracking-wide">
            EduElevate
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-white/60 px-2 py-1 text-sm font-medium text-dusk shadow-inner md:flex">
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

        <button
          type="button"
          className="hidden rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark md:inline-flex"
          onClick={() => handleSectionClick('contact')}
        >
          Let&apos;s Talk
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
              Let&apos;s Talk
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
