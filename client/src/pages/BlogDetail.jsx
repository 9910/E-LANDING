import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getBlogById } from '../services/api';

const formatDate = (value) => new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        if (mounted) {
          setPost(data);
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
    fetchBlog();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-10 lg:px-0">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:gap-3"
        >
          &larr; Back to Blog
        </Link>

        {loading && <p className="text-sm text-slate-500">Loading post...</p>}
        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </p>
        )}
        {!loading && !error && post && (
          <article className="rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              {formatDate(post.publishedAt)} | {post.author}
            </p>
            <h1 className="mt-4 font-display text-4xl text-ink">{post.title}</h1>
            <div className="mt-6 space-y-4 text-lg text-slate-600">
              {post.content.split('\\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
