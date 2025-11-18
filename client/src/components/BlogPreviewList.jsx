import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import BlogCard from './BlogCard';

const BlogPreviewList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchPosts = async () => {
      try {
        const data = await getBlogs();
        if (mounted) {
          setPosts(data.slice(0, 3));
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
    fetchPosts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="flex flex-col gap-6 rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-soft lg:p-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Latest from our blog</p>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Insights for learners &amp; teams</h2>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
        >
          View all
        </Link>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading posts...</p>}
      {error && (
        <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </p>
      )}
      {!loading && !error && posts.length === 0 && <p className="text-sm text-slate-500">No blog posts yet. Check back soon.</p>}

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default BlogPreviewList;
