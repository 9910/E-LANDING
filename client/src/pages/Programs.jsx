import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { buildAssetUrl, getPrograms } from '../services/api';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchPrograms = async () => {
      try {
        const data = await getPrograms();
        if (mounted) {
          setPrograms(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPrograms();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 lg:px-6">
        <section className="rounded-[32px] border border-white/70 bg-white/90 p-8 text-center shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Programs &amp; Packages</p>
          <h1 className="mt-3 font-display text-4xl text-ink">All Career Tracks &amp; Bootcamps</h1>
          <p className="mt-3 text-lg text-slate-600">
            Browse every cohort, compare formats, and pick the roadmap that fits your goals.
          </p>
        </section>

        {loading && <p className="text-sm text-slate-500">Loading programs...</p>}
        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <article
                key={program._id || program.name}
                className="flex h-full flex-col gap-4 rounded-[28px] border border-slate-100 bg-white p-6 shadow-card"
              >
                {program.image && (
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={buildAssetUrl(program.image)}
                      alt={`${program.name} program`}
                      className="h-48 w-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-ink">{program.name}</h3>
                  <p className="text-sm text-slate-600">{program.description}</p>
                </div>
                <ul className="flex flex-wrap gap-2 text-sm font-semibold text-slate-500">
                  <li className="rounded-full bg-slate-100 px-4 py-1">{program.duration}</li>
                  <li className="rounded-full bg-slate-100 px-4 py-1">{program.price}</li>
                </ul>
                <div className="mt-auto flex flex-col gap-2">
                  <Link
                    to={`/programs/${program._id}`}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
                  >
                    Know more
                  </Link>
                  <Link
                    to="/"
                    state={{ scrollTo: 'contact' }}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand/80 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:scale-[1.01]"
                  >
                    Speak to admissions
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Programs;
