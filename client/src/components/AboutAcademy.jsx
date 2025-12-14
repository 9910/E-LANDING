import { useMemo } from 'react';
import { buildAssetUrl } from '../services/api';

const bullets = [
  'Certified trainers with 8+ band scores and years of classroom experience.',
  'Personalised speaking, writing and grammar support with daily practice.',
  'Full-length mock tests, band-by-band feedback, and study material included.',
  'Guaranteed focus on IELTS, PTE, and Spoken English with flexible timing.'
];

const fallbackImage =
  'https://images.unsplash.com/photo-1523580842781-64b4baf72251?auto=format&fit=crop&w=1200&q=80';

const AboutAcademy = ({ heroGallery }) => {
  const primaryImage = useMemo(() => {
    if (Array.isArray(heroGallery) && heroGallery.length > 0) {
      return heroGallery[0];
    }
    return fallbackImage;
  }, [heroGallery]);

  const resolvedImage = primaryImage.startsWith('http') ? primaryImage : buildAssetUrl(primaryImage);

  return (
    <section className="panel grid gap-10 rounded-[32px] p-6 lg:grid-cols-2 lg:p-10">
      <span className="gradient-ring" aria-hidden="true" />
      <div className="panel-content space-y-4">
        <p className="section-label">About Kriti&apos;s IELTS Academy</p>
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Clear guidance. Trusted coaching. Real results for India or abroad.
        </h2>
        <p className="text-base leading-relaxed text-slate-600">
          Structured test preparation and personalised coaching for IELTS, PTE and Spoken English in Panchkula. Learn
          with passionate mentors, small batches, and proven strategies that keep your scores rising.
        </p>
        <ul className="space-y-3 text-sm text-slate-700">
          {bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel-content relative overflow-hidden rounded-[28px] border border-white/70 shadow-soft">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 to-transparent" />
        <img src={resolvedImage} alt="Kriti IELTS Academy students" className="h-full w-full object-cover" />
        <div className="absolute left-4 bottom-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
          <span className="info-pill bg-white/15 text-white backdrop-blur">Certified Trainers</span>
          <span className="info-pill bg-white/15 text-white backdrop-blur">Flexible Batches</span>
        </div>
      </div>
    </section>
  );
};

export default AboutAcademy;
