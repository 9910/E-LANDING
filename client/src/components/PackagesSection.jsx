import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buildAssetUrl, getPrograms } from '../services/api';

const PackagesSection = ({ onEnrollClick }) => {
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState('');
  const LIMIT = 8;

  useEffect(() => {
    let mounted = true;
    const fetchPrograms = async () => {
      try {
        const data = await getPrograms({ limit: LIMIT });
        if (mounted) {
          setPrograms(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      }
    };
    fetchPrograms();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="panel flex flex-col gap-10 rounded-[32px] p-8 lg:p-12" id="packages">
      <span className="gradient-ring" aria-hidden="true" />
      <div className="panel-content space-y-4 text-center lg:text-left">
        <p className="section-label">Programs &amp; Packages</p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-3xl">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Flexible courses tailored to your goals</h2>
            <p className="text-lg text-slate-600">Choose mentor-led bootcamps and part-time programs with career coaching baked in.</p>
          </div>
        </div>
      </div>

      {error && (
        <p className="panel-content rounded-2xl border border-red-100 bg-red-50/90 px-4 py-3 text-red-600">
          {error}
        </p>
      )}
      {!error && programs.length === 0 && <p className="panel-content text-sm text-slate-500">Loading programs...</p>}

      <div className="panel-content grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((pkg) => (
          <article
            key={pkg._id || pkg.name}
            className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[24px] border border-white/70 bg-white/90 p-5 text-left shadow-card transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              {pkg.duration}
            </div>
            {pkg.image && (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={buildAssetUrl(pkg.image)}
                  alt={`${pkg.name} program`}
                  className="h-40 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-ink">{pkg.name}</h3>
              <p className="text-sm text-slate-600 line-clamp-2">{pkg.description}</p>
            </div>
            <ul className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              <li className="rounded-full bg-slate-100 px-3 py-1">{pkg.price}</li>
              <li className="rounded-full bg-slate-100 px-3 py-1">Capstone included</li>
            </ul>
            <div className="mt-auto flex flex-col gap-2">
              <Link
                to={`/programs/${pkg._id}`}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
              >
                Know more
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand/80 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:scale-[1.01]"
                onClick={onEnrollClick}
              >
                Enroll Now
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PackagesSection;
