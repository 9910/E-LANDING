import { Link } from 'react-router-dom';

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const BlogCard = ({ post }) => (
  <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[26px] border border-white/70 bg-white/95 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-2xl">
    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">{formatDate(post.publishedAt)}</p>
    <h3 className="text-xl font-semibold text-ink">{post.title}</h3>
    <p className="flex-1 text-sm text-slate-600 overflow-hidden text-ellipsis">{post.excerpt}</p>
    <Link to={`/blog/${post._id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:gap-3">
      Read More
      <span aria-hidden="true">-&gt;</span>
    </Link>
  </article>
);

export default BlogCard;
