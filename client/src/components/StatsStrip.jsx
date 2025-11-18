import { useEffect, useState } from 'react';
import { getStats } from '../services/api';

const StatsStrip = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchStats = async () => {
      try {
        const data = await getStats();
        if (mounted) {
          setStats(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      }
    };
    fetchStats();
    return () => {
      mounted = false;
    };
  }, []);

  const renderContent = () => {
    if (error) {
      return (
        <p className="sm:col-span-2 lg:col-span-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </p>
      );
    }
    if (stats.length === 0) {
      return (
        <p className="sm:col-span-2 lg:col-span-4 text-sm text-slate-500">
          Loading metrics...
        </p>
      );
    }
    return stats.map((stat) => (
      <div key={stat._id || stat.label} className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-inner">
        <p className="text-3xl font-semibold text-ink">{stat.value}</p>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">{stat.label}</p>
      </div>
    ));
  };

  return (
    <section className="grid gap-4 rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-card backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
      {renderContent()}
    </section>
  );
};

export default StatsStrip;
