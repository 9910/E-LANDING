import { useEffect, useState } from 'react';
import { getHighlights } from '../services/api';

const HighlightsSection = () => {
  const [highlights, setHighlights] = useState([]);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetchHighlights = async () => {
      try {
        const data = await getHighlights();
        if (mounted) {
          setHighlights(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      }
    };
    fetchHighlights();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!highlights.length) {
      return undefined;
    }
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlights.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [highlights]);

  return (
    <section className="flex flex-col gap-8 rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-soft lg:p-12">
      <div className="space-y-3 text-center lg:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Campus Advantages</p>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">Designed for immersive, modern learning</h2>
        <p className="text-lg text-slate-600">Every cohort accesses a blend of hybrid classes, real projects, and inspiring mentors with proven outcomes.</p>
      </div>
      {error && (
        <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </p>
      )}
      {!error && highlights.length === 0 && <p className="text-sm text-slate-500">Loading campus highlights...</p>}
      <div className="grid gap-5 md:grid-cols-2">
        {highlights.map((item, index) => {
          const isActive = index === activeIndex;
          return (
          <article
            key={item._id || item.title}
            className={`flex flex-col gap-3 rounded-[26px] border p-6 shadow-card transition-all duration-500 ${
              isActive
                ? 'border-transparent bg-gradient-to-r from-brand to-accent text-white shadow-soft scale-[1.02]'
                : 'border-slate-100 bg-white text-slate-600'
            }`}
          >
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all ${
                isActive ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand'
              }`}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <h3 className={`text-xl font-semibold ${isActive ? 'text-white' : 'text-ink'}`}>{item.title}</h3>
            <p className={`text-sm ${isActive ? 'text-white/90' : 'text-slate-600'}`}>{item.description}</p>
          </article>
        );
        })}
      </div>
    </section>
  );
};

export default HighlightsSection;
