const stats = [
  { label: 'Success Stories', value: '3,000+' },
  { label: 'Band 8+ Certified Trainers', value: '20+' },
  { label: 'Years of Trust', value: '10+' },
  { label: 'Daily Speaking Sessions', value: '2x' }
];

const StatsBand = () => {
  return (
    <section className="panel rounded-[28px] p-6 lg:p-8">
      <span className="gradient-ring" aria-hidden="true" />
      <div className="panel-content stats-band">
        {stats.map((stat) => (
          <div key={stat.label} className="stats-band__item">
            <p className="text-3xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-white/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBand;
