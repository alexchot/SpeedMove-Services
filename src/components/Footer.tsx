import { Truck, MapPin, Phone, Clock, MessageCircle, ArrowUp } from 'lucide-react';
import type { Lang, TranslationDict } from '../i18n';

interface Props {
  t: TranslationDict;
  lang: Lang;
  onQuote: () => void;
}

export default function Footer({ t, lang, onQuote }: Props) {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

      {/* CTA banner */}
      <div className="border-b border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-10 text-center sm:px-8 lg:flex-row lg:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              {lang === 'zh' ? '准备好搬迁了吗？' : 'Ready to move?'}
            </h3>
            <p className="mt-1.5 text-sm text-white/50">{t.footer.tagline}</p>
          </div>
          <button
            onClick={onQuote}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            {t.nav.getQuote}
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30">
                <Truck className="h-5 w-5 text-white" strokeWidth={2.4} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[15px] font-extrabold tracking-tight">
                  SpeedMove
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-400">
                  Services
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              {t.footer.tagline}
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/30">
              {t.footer.madeWith}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/70">
              {t.footer.quickLinks}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'about', label: t.nav.about },
                { id: 'services', label: t.nav.services },
                { id: 'quote', label: t.nav.quote },
              ].map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-sm text-white/50 transition-colors hover:text-primary-400"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/70">
              {t.footer.locations}
            </h4>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
                <span>
                  <span className="font-semibold text-white/70">{t.footer.kl}</span>
                  <br />
                  {lang === 'zh' ? '吉隆坡' : 'Kuala Lumpur, Malaysia'}
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-400" />
                <span>
                  <span className="font-semibold text-white/70">{t.footer.pg}</span>
                  <br />
                  {lang === 'zh' ? '槟城' : 'Penang, Malaysia'}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/70">
              {t.footer.contact}
            </h4>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <Phone className="h-4 w-4 flex-shrink-0 text-success-400" />
                <span>+60 12-345 6789</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <MessageCircle className="h-4 w-4 flex-shrink-0 text-success-400" />
                <span>WhatsApp 询价</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <Clock className="h-4 w-4 flex-shrink-0 text-accent-400" />
                <span>Mon – Sun · 8:00 – 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {year} SpeedMove Services. {t.footer.rights}
          </p>
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/50 transition-all hover:border-primary-400/50 hover:text-primary-400"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            {lang === 'zh' ? '回到顶部' : 'Back to top'}
          </button>
        </div>
      </div>
    </footer>
  );
}
