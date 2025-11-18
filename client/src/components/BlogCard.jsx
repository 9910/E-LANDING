import { Link } from 'react-router-dom';

const formatDate = (value) => new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const BlogCard = ({ post }) => (
  <article className="flex h-full flex-col gap-4 rounded-[26px] border border-slate-100 bg-white p-6 shadow-card">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
      {formatDate(post.publishedAt)}
    </p>
    <h3 className="text-xl font-semibold text-ink">{post.title}</h3>
    <p className="flex-1 text-sm text-slate-600">{post.excerpt}</p>
    <Link
      to={`/blog/${post._id}`}
      className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:gap-3"
    >
      Read More
      <span aria-hidden="true">→</span>
    </Link>
  </article>
);

export default BlogCard;
