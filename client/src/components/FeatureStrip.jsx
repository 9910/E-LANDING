const features = [
  {
    title: 'Test & Analysis',
    body: 'Mock tests simulate the real exam while trainers decode your band gaps with actionable feedback.'
  },
  {
    title: 'Interactive Classes',
    body: 'Small batches, live speaking drills, and doubt-clearing in every session keep you stage-ready.'
  },
  {
    title: 'Best Tips & Tricks',
    body: 'Band-boosting templates, writing structures, and vocabulary packs curated by top IELTS mentors.'
  },
  {
    title: 'Flexible Batches',
    body: 'Morning, evening, and weekend options so you never miss progress alongside work or college.'
  }
];

const FeatureStrip = () => {
  return (
    <section className="panel rounded-[28px] p-6 lg:p-8">
      <span className="gradient-ring" aria-hidden="true" />
      <div className="panel-content space-y-5">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="section-label">IELTS Essentials</p>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Everything you need to score big</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-600">
            Cohesive coaching across speaking, reading, listening and writing with crisp feedback loops.
          </p>
        </div>
        <div className="feature-strip">
          {features.map((item) => (
            <article key={item.title} className="feature-strip__card">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureStrip;
