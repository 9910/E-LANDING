import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { buildAssetUrl, getProgramById } from '../services/api';

const getEmbedUrl = (url = '') => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace('/', '')}`;
    }
    const videoId = parsed.searchParams.get('v');
    if (parsed.hostname.includes('youtube.com') && videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  } catch {
    return url;
  }
};

const ProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchProgram = async () => {
      try {
        const data = await getProgramById(id);
        if (mounted) {
          setProgram(data);
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
    fetchProgram();
    return () => {
      mounted = false;
    };
  }, [id]);

  const videoUrl = getEmbedUrl(program?.videoUrl);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-10 lg:px-6">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Link to="/programs" className="font-semibold text-brand hover:text-brand-dark">
            Programs
          </Link>
          <span>/</span>
          <span>{program?.name || 'Loading...'}</span>
        </div>

        {loading && <p className="text-sm text-slate-500">Loading program details...</p>}
        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && program && (
          <>
            <section className="grid gap-6 rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-soft lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">{program.duration}</p>
                <h1 className="font-display text-4xl text-ink">{program.name}</h1>
                <p className="text-lg text-slate-600">{program.longDescription || program.description}</p>
                <ul className="flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
                  <li className="rounded-full bg-slate-100 px-4 py-1">{program.duration}</li>
                  <li className="rounded-full bg-slate-100 px-4 py-1">{program.price}</li>
                </ul>
                {Array.isArray(program.highlights) && program.highlights.length > 0 && (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                    <p className="text-sm font-semibold text-slate-700">What you&apos;ll get</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      {program.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/"
                    state={{ scrollTo: 'contact' }}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand/80 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:scale-[1.01]"
                  >
                    Talk to admissions
                  </Link>
                  <Link
                    to="/programs"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
                  >
                    Back to all programs
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                {program.image && (
                  <div className="overflow-hidden rounded-[24px] border border-white/70 shadow-card">
                    <img
                      src={buildAssetUrl(program.image)}
                      alt={`${program.name} thumbnail`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                {videoUrl && (
                  <div className="overflow-hidden rounded-[24px] border border-white/70 bg-black shadow-soft">
                    <div className="aspect-video w-full">
                      <iframe
                        className="h-full w-full"
                        src={videoUrl}
                        title={`${program.name} intro video`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProgramDetail;
