import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buildAssetUrl, getPrograms } from '../services/api';

const PackagesSection = ({ onEnrollClick }) => {
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState('');
  const LIMIT = 6;

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
    <section className="flex flex-col gap-10 rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-soft lg:p-12" id="packages">
      <div className="space-y-4 text-center lg:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Programs &amp; Packages</p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Flexible courses tailored to your goals</h2>
            <p className="text-lg text-slate-600">Choose mentor-led bootcamps and part-time programs with career coaching baked in.</p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
          >
            View all programs
          </Link>
        </div>
      </div>

      {error && (
        <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </p>
      )}
      {!error && programs.length === 0 && <p className="text-sm text-slate-500">Loading programs...</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {programs.map((pkg) => (
          <article
            key={pkg._id || pkg.name}
            className="flex h-full flex-col gap-4 rounded-[28px] border border-slate-100 bg-white p-6 text-left shadow-card"
          >
            {pkg.image && (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={buildAssetUrl(pkg.image)}
                  alt={`${pkg.name} program`}
                  className="h-48 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-ink">{pkg.name}</h3>
              <p className="text-sm text-slate-600">{pkg.description}</p>
            </div>
            <ul className="flex flex-wrap gap-2 text-sm font-semibold text-slate-500">
              <li className="rounded-full bg-slate-100 px-4 py-1">{pkg.duration}</li>
              <li className="rounded-full bg-slate-100 px-4 py-1">{pkg.price}</li>
            </ul>
            <button
              type="button"
              className="mt-auto inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
              onClick={onEnrollClick}
            >
              Enroll Now
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PackagesSection;
