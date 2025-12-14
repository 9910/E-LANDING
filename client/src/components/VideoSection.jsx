import { useEffect, useState } from 'react';
import { getHomeVideo } from '../services/api';

const getEmbedUrl = (url = '') => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace('/', '')}`;
    }
    const videoId = parsed.searchParams.get('v');
    if (parsed.hostname.includes('youtube.com') && videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  } catch {
    return url;
  }
};

const fallback = {
  label: 'Watch our campus overview',
  title: 'Why learners choose EduElevate',
  description:
    'Discover how our vibrant campus, remote lab access, and supportive mentors help thousands of learners accelerate their careers. Take a quick tour of our community spaces, innovation labs, and student success center.',
  videoUrl: 'https://www.youtube.com/embed/Z1Yd7upQsXY'
};

const VideoSection = () => {
  const [content, setContent] = useState(fallback);

  useEffect(() => {
    getHomeVideo()
      .then((data) => {
        if (data && Object.keys(data || {}).length > 0) {
          setContent({
            label: data.label || fallback.label,
            title: data.title || fallback.title,
            description: data.description || fallback.description,
            videoUrl: getEmbedUrl(data.videoUrl) || fallback.videoUrl
          });
        }
      })
      .catch(() => {
        /* keep fallback */
      });
  }, []);

  return (
    <section
      className="panel rounded-[30px] p-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12"
      aria-labelledby="video-title"
    >
      <span className="gradient-ring" aria-hidden="true" />
      <div className="panel-content space-y-5">
        <p className="section-label">{content.label}</p>
        <h2 id="video-title" className="font-display text-3xl text-ink sm:text-4xl">
          {content.title}
        </h2>
        <p className="text-lg text-slate-600">{content.description}</p>
      </div>
      <div className="panel-content relative overflow-hidden rounded-[26px] border border-white/70 bg-black shadow-soft">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={content.videoUrl}
            title="Campus overview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
