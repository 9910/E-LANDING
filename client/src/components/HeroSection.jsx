import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const imageVariants = {
  hidden: { scale: 1.05, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

const HeroSection = ({ onEnquireClick }) => {
  return (
    <motion.section
      id="hero"
      className="grid gap-10 rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-soft backdrop-blur-xl lg:grid-cols-2 lg:p-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative flex flex-col gap-6">
        <motion.p
          variants={itemVariants}
          className="inline-flex w-fit items-center rounded-full bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand"
        >
          Leading Education Institute
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl font-semibold text-ink sm:text-5xl"
        >
          Life-changing learning for ambitious students.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-600"
        >
          Learn in-demand skills from mentors who have shipped products for global brands. Hybrid schedules, live
          feedback, and career coaching ensure you stay future-ready.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-3"
        >
          <button
            type="button"
            className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
            onClick={onEnquireClick}
          >
            Enquire Now
          </button>
          <a
            href="#packages"
            className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
          >
            Explore Programs
          </a>
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-wrap gap-8 text-sm text-slate-500">
          <div>
            <p className="text-2xl font-semibold text-ink">15K+</p>
            <p>Successful alumni</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-ink">120+</p>
            <p>Expert mentors</p>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="relative overflow-hidden rounded-[28px] bg-hero-mesh shadow-soft"
        aria-hidden="true"
        variants={imageVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80"
          alt="Students learning"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 text-sm font-medium text-ink shadow-card backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Campus experience</p>
          <p>Hybrid classes · Innovation labs · 1:1 mentorship</p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
