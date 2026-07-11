import { useEffect, useState } from 'react';
import { Truck, Menu, X, Languages } from 'lucide-react';
import type { Lang, TranslationDict } from '../i18n';

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TranslationDict;
  onQuote: () => void;
}

export default function Navbar({ lang, setLang, t, onQuote }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'quote', label: t.nav.quote },
  ];

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.08)] border-b border-ink-100'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="group flex items-center gap-2.5"
          aria-label="SpeedMove Services"
        >
          <span
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
              scrolled
                ? 'bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30'
                : 'bg-white/15 backdrop-blur-md ring-1 ring-white/30'
            }`}
          >
            <Truck
              className={`h-5 w-5 transition-colors ${scrolled ? 'text-white' : 'text-white'}`}
              strokeWidth={2.4}
            />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent-400 ring-2 ring-white/70" />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-[15px] font-extrabold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-ink-900' : 'text-white'
              }`}
            >
              SpeedMove
            </span>
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                scrolled ? 'text-primary-600' : 'text-primary-300'
              }`}
            >
              Services
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`group relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                scrolled
                  ? 'text-ink-600 hover:text-primary-600'
                  : 'text-white/85 hover:text-white'
              }`}
            >
              {l.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary-500 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
              scrolled
                ? 'bg-ink-100 text-ink-700 hover:bg-ink-200'
                : 'bg-white/15 text-white backdrop-blur-md ring-1 ring-white/25 hover:bg-white/25'
            }`}
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            <span>{lang === 'zh' ? '中文' : 'EN'}</span>
            <span className="opacity-40">/</span>
            <span className="opacity-50">{lang === 'zh' ? 'EN' : '中文'}</span>
          </button>

          {/* CTA */}
          <button
            onClick={onQuote}
            className="hidden rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0 sm:block"
          >
            {t.nav.getQuote}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors lg:hidden ${
              scrolled ? 'text-ink-700 hover:bg-ink-100' : 'text-white hover:bg-white/15'
            }`}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white/95 backdrop-blur-xl transition-all duration-400 lg:hidden ${
          open ? 'max-h-80 border-b border-ink-100' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="rounded-lg px-4 py-2.5 text-left text-sm font-semibold text-ink-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onQuote();
            }}
            className="mt-1 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-sm font-bold text-white"
          >
            {t.nav.getQuote}
          </button>
        </nav>
      </div>
    </header>
  );
}
