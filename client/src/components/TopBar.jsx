const TopBar = () => {
  return (
    <div className="hidden bg-slate-900 text-[13px] text-slate-100 md:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 lg:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2">
            <span className="text-brand">📍</span>
            SCO 214, Sector 14, Panchkula, Haryana 134112
          </span>
          <a
            href="mailto:kritiieltsacademy@gmail.com"
            className="inline-flex items-center gap-2 text-slate-100 transition hover:text-brand"
          >
            <span className="text-brand">✉</span>
            kritiieltsacademy@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+918284850011" className="inline-flex items-center gap-2 text-slate-100 transition hover:text-brand">
            <span className="text-brand">📞</span>
            +91 82848 50011
          </a>
          <div className="flex items-center gap-3 text-sm">
            <a href="https://wa.me/918284850011" target="_blank" rel="noreferrer" className="hover:text-brand" aria-label="WhatsApp">
              🟢
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand" aria-label="Instagram">
              📷
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand" aria-label="Facebook">
              📘
            </a>
            <a href="mailto:kritiieltsacademy@gmail.com" className="hover:text-brand" aria-label="Email">
              ✉
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
