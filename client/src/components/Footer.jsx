const Footer = () => (
  <footer className="mt-16 border-t border-slate-100 bg-white/90">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:px-6">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-xl font-semibold text-ink">EduElevate Institute</h4>
          <p className="text-sm text-slate-500">
            21 Innovation Drive, San Francisco, CA
          </p>
          <p className="text-sm text-slate-500">
            Email: hello@eduelevate.com | Phone: (415) 555-0139
          </p>
        </div>
        <div className="flex gap-4 text-sm font-semibold text-slate-600">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="transition hover:text-brand">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-brand">
            Instagram
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="transition hover:text-brand">
            YouTube
          </a>
        </div>
      </div>
      <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} EduElevate. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
