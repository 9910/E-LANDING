import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../services/api';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        if (mounted) {
          setPosts(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    fetchBlogs();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 lg:px-6">
        <section className="rounded-[32px] border border-white/70 bg-white/90 p-8 text-center shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Blog</p>
          <h1 className="mt-3 font-display text-4xl text-ink">Ideas, Guides &amp; Inspiration</h1>
          <p className="mt-3 text-lg text-slate-600">
            Explore interviews, resources, and practical advice from mentors helping students upskill every week.
          </p>
        </section>

        {loading && <p className="text-sm text-slate-500">Loading blog posts...</p>}
        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogList;
