import { useState } from 'react';
import { submitLead } from '../services/api';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  courseInterest: '',
  message: ''
};

const LeadForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.courseInterest) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      await submitLead(formData);
      setStatus({ type: 'success', message: 'Thank you! Our admissions team will contact you shortly.' });
      setFormData(initialFormData);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    'mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink shadow-inner focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20';

  return (
    <section
      className="grid gap-10 rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-soft lg:grid-cols-[0.9fr_1.1fr] lg:p-12"
      id="contact"
    >
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Speak with admissions</p>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">Your future begins here</h2>
        <p className="text-lg text-slate-600">
          Tell us about your goals and we&rsquo;ll craft a personalized learning roadmap, scholarship advice, and a start date
          that fits your schedule.
        </p>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Hybrid &amp; on-campus cohorts
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Merit-based scholarships
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Career coaching for every learner
          </li>
        </ul>
      </div>
      <form className="grid gap-4 rounded-[28px] border border-slate-100 bg-white/90 p-6 shadow-card md:grid-cols-2" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-slate-600">
            Name*
          </label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-slate-600">
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-slate-600">
            Phone*
          </label>
          <input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 555 123 4567" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="courseInterest" className="text-sm font-semibold text-slate-600">
            Course Interest*
          </label>
          <select id="courseInterest" name="courseInterest" value={formData.courseInterest} onChange={handleChange} required className={inputClasses}>
            <option value="">Select a course</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Product Management">Product Management</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold text-slate-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Share goals, preferred start date, etc."
            className={`${inputClasses} resize-none`}
          />
        </div>

        {status.message && (
          <p
            className={`md:col-span-2 rounded-2xl border px-4 py-3 text-sm ${
              status.type === 'error'
                ? 'border-red-100 bg-red-50 text-red-600'
                : 'border-emerald-100 bg-emerald-50 text-emerald-700'
            }`}
          >
            {status.message}
          </p>
        )}

        <button
          type="submit"
          className="md:col-span-2 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </form>
    </section>
  );
};

export default LeadForm;
