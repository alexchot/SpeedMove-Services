import { Package, Sparkles, ArrowRight } from 'lucide-react';
import type { TranslationDict } from '../i18n';
import { useReveal } from '../hooks';

interface Props {
  t: TranslationDict;
  onQuote: () => void;
}

export default function Addon({ t, onQuote }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
            visible ? 'is-visible' : ''
          }`}
        >
          {/* Left: image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/wrapping.jpg"
                alt="Professional furniture wrapping"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-3 flex animate-float items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-xl sm:-right-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-ink-900">Premium Care</div>
                <div className="text-[11px] text-ink-500">气泡膜 · 缠绕膜</div>
              </div>
            </div>

            {/* Decorative gradient ring */}
            <div className="pointer-events-none absolute -left-6 -top-6 -z-10 h-32 w-32 rounded-full bg-primary-500/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 left-10 -z-10 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl" />
          </div>

          {/* Right: content */}
          <div>
            <span className="inline-block rounded-full bg-warning-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-warning-700">
              {t.addon.tag}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              {t.addon.title}
            </h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary-600">
              {t.addon.enName}
            </p>

            <p className="mt-5 text-base leading-relaxed text-ink-600">{t.addon.desc}</p>
            <p className="mt-3 text-base leading-relaxed text-ink-600">{t.addon.desc2}</p>

            {/* Features grid */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              {t.addon.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-xl border border-ink-100 bg-ink-50/50 px-4 py-3 transition-colors hover:border-primary-200 hover:bg-primary-50/40"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-success-100 text-success-600">
                    <Package className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-ink-700">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onQuote}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5"
            >
              {t.nav.getQuote}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
