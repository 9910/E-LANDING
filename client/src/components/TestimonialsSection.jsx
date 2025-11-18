import { useEffect, useState } from 'react';
import { getTestimonials } from '../services/api';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        if (mounted) {
          setTestimonials(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      }
    };
    fetchTestimonials();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="flex flex-col gap-8 rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-soft lg:p-12">
      <div className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Student Voices</p>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">Transformation stories from our alumni</h2>
        <p className="text-lg text-slate-600">Join thousands of learners who trusted EduElevate to launch careers in emerging tech and creative roles.</p>
      </div>
      {error && (
        <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </p>
      )}
      {!error && testimonials.length === 0 && <p className="text-sm text-slate-500">Loading testimonials...</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial._id || testimonial.name}
            className="flex h-full flex-col gap-4 rounded-[26px] border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-6 text-left shadow-card"
          >
            <p className="text-lg font-medium text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="mt-auto">
              <p className="text-base font-semibold text-ink">{testimonial.name}</p>
              <p className="text-sm text-slate-500">{testimonial.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
