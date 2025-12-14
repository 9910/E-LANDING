import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { buildAssetUrl, getHomeContent } from '../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 }
  }
};

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
};

const imageVariants = {
  hidden: { scale: 1.05, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut' }
  }
};

const uspItems = ['100% success-driven coaching', 'Affordable fees with flexible plans', 'Morning / Evening flexible batches', 'Personalised speaking practice'];
const fallbackGallery = [
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529076063443-64c57c72fd79?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523580842781-64b4baf72251?auto=format&fit=crop&w=1200&q=80'
];

const featureCards = [
  {
    title: 'Test & Analysis',
    body: 'Mock tests mirror the real exam with personalized feedback so you know exactly what to fix.'
  },
  {
    title: 'Interactive Classes',
    body: 'Live speaking drills, doubt-clearing and micro-batches keep every learner involved.'
  },
  {
    title: 'Best Tips & Tricks',
    body: 'Band-boosting strategies, templates, and vocabulary lists curated by expert trainers.'
  }
];

const HeroSection = ({ onEnquireClick, onGalleryReady }) => {
  const [homeContent, setHomeContent] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let mounted = true;
    getHomeContent()
      .then((data) => {
        if (mounted) {
          setHomeContent(data && Object.keys(data || {}).length > 0 ? data : null);
        }
      })
      .catch(() => {
        /* keep defaults */
      });
    return () => {
      mounted = false;
    };
  }, []);

  const headline = homeContent?.headline || 'Ranked No.1 IELTS Coaching Institute in Panchkula';
  const subheadline =
    homeContent?.subheadline ||
    'Kriti IELTS Academy is the best IELTS coaching institute in Panchkula that gives best coaching in IELTS, PTE & Spoken English.';
  const primaryCtaLabel = homeContent?.primaryCtaLabel || 'Call Now';
  const secondaryCtaLabel = homeContent?.secondaryCtaLabel || 'View Services';

  const heroGallery = useMemo(() => {
    const uploadedGallery = homeContent?.heroImages?.length ? homeContent.heroImages.map(buildAssetUrl) : [];
    const fallbackSingle = !uploadedGallery.length && homeContent?.heroImage ? [buildAssetUrl(homeContent.heroImage)] : [];
    const combined = [...uploadedGallery, ...fallbackSingle];
    if (combined.length === 0) {
      return fallbackGallery;
    }
    if (combined.length < 4) {
      return [...combined, ...fallbackGallery].slice(0, 4);
    }
    return combined.slice(0, 4);
  }, [homeContent]);

  useEffect(() => {
    setActiveImage(0);
  }, [heroGallery.length]);

  useEffect(() => {
    if (heroGallery.length <= 1) return undefined;
    const id = window.setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroGallery.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [heroGallery.length]);

  const collageImages = heroGallery.slice(0, 4);

  useEffect(() => {
    if (onGalleryReady) {
      onGalleryReady(collageImages);
    }
  }, [collageImages, onGalleryReady]);

  return (
    <motion.section
      id="hero"
      className="relative w-full overflow-hidden bg-slate-950 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0">
        {collageImages.map((image, idx) => (
          <motion.div
            key={`${image}-${idx}`}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            animate={{ opacity: activeImage === idx ? 1 : 0, scale: activeImage === idx ? 1 : 1.04 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/70 to-slate-900/30" />
        <div className="absolute inset-0 mix-blend-soft-light bg-[radial-gradient(circle_at_22%_22%,rgba(226,24,55,0.3),transparent_38%),radial-gradient(circle_at_80%_16%,rgba(255,255,255,0.16),transparent_34%)]" />
      </div>

      <div className="relative z-10 grid gap-10 px-5 py-10 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-14">
        <div className="flex flex-col gap-6">
          <motion.h1
            variants={itemVariants}
            className="max-w-3xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            {headline}
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {subheadline}
          </motion.p>

          <motion.ul variants={itemVariants} className="grid gap-3 sm:grid-cols-2">
            {uspItems.map((usp) => (
              <li key={usp} className="flex items-start gap-3 text-slate-100">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e21837] text-sm font-semibold shadow-lg shadow-[#e21837]/30">
                  ✓
                </span>
                <span className="text-base font-semibold leading-snug">{usp}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#e21837] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(226,24,55,0.3)] transition hover:translate-y-[-1px] hover:bg-[#c51231]"
              onClick={onEnquireClick}
            >
              {primaryCtaLabel}
            </button>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              {secondaryCtaLabel}
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 text-sm text-slate-200">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Trust</p>
              <p className="text-lg font-semibold text-white">5,000+ students coached</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Batches</p>
              <p className="text-lg font-semibold text-white">Morning | Evening | Weekend</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            {collageImages.map((_image, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  activeImage === idx ? 'w-10 bg-[#e21837]' : 'w-3 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Show hero image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div variants={imageVariants} className="relative hidden h-[520px] overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_22px_65px_rgba(0,0,0,0.35)] backdrop-blur lg:block">
          {collageImages.map((image, idx) => (
            <motion.div
              key={`${image}-${idx}`}
              className="absolute inset-0"
              style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              animate={{ opacity: activeImage === idx ? 1 : 0, scale: activeImage === idx ? 1 : 1.04 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/35 to-transparent" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
