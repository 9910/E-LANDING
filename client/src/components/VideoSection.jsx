const VideoSection = () => (
  <section
    className="grid gap-10 rounded-[28px] border border-white/70 bg-white/90 p-8 shadow-card lg:grid-cols-2 lg:p-12"
    aria-labelledby="video-title"
  >
    <div className="space-y-5">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Watch our campus overview</p>
      <h2 id="video-title" className="font-display text-3xl text-ink sm:text-4xl">
        Why learners choose EduElevate
      </h2>
      <p className="text-lg text-slate-600">
        Discover how our vibrant campus, remote lab access, and supportive mentors help thousands of learners accelerate
        their careers. Take a quick tour of our community spaces, innovation labs, and student success center.
      </p>
    </div>
    <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-black shadow-soft">
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full rounded-3xl"
          src="https://www.youtube.com/embed/Z1Yd7upQsXY"
          title="Campus overview"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  </section>
);

export default VideoSection;
