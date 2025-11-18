const CTASection = ({ onCta }) => (
  <section className="rounded-[32px] bg-gradient-to-r from-brand to-indigo-500 p-10 text-white shadow-soft">
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Ready to level up?</p>
      <h2 className="font-display text-3xl">Book a campus tour or schedule a free counseling session today.</h2>
      <p className="text-lg text-white/90">
        Speak with an admissions specialist to personalize your curriculum plan, explore scholarships, and discover how
        our community supports your ambitions.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-soft transition hover:bg-indigo-50"
          onClick={onCta}
        >
          Talk To Admissions
        </button>
        <a
          className="inline-flex items-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          href="https://calendly.com/"
          target="_blank"
          rel="noreferrer"
        >
          Virtual Counseling
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
