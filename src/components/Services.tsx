import { Check, X, Truck, Users, Package, CheckCircle2, XCircle } from 'lucide-react';
import type { TranslationDict } from '../i18n';
import { useReveal } from '../hooks';

interface Props {
  t: TranslationDict;
  onQuote: () => void;
}

export default function Services({ t, onQuote }: Props) {
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();
  const { ref: cardARef, visible: cardAVisible } = useReveal<HTMLDivElement>();
  const { ref: cardBRef, visible: cardBVisible } = useReveal<HTMLDivElement>();
  const { ref: tipsRef, visible: tipsVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="relative bg-ink-50/70 py-24 sm:py-32">
      {/* Decorative top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div
          ref={headRef}
          className={`reveal mx-auto max-w-2xl text-center ${headVisible ? 'is-visible' : ''}`}
        >
          <span className="inline-block rounded-full bg-accent-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
            {t.services.tag}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-3 text-base text-ink-500">{t.services.subtitle}</p>
        </div>

        {/* Two big service cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Dedicated */}
          <div
            ref={cardARef}
            className={`reveal group relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 text-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 sm:p-10 ${
              cardAVisible ? 'is-visible' : ''
            }`}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary-500/20 blur-3xl transition-all duration-700 group-hover:bg-primary-500/30" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30">
                  <Truck className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
                <span className="rounded-full border border-primary-300/40 bg-primary-500/20 px-3.5 py-1 text-xs font-bold text-primary-200 backdrop-blur-sm">
                  {t.services.dedicated.badge}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold">{t.services.dedicated.name}</h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
                {t.services.dedicated.enName}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {t.services.dedicated.desc}
              </p>

              <ul className="mt-6 space-y-3">
                {t.services.dedicated.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/85">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/30">
                      <Check className="h-3 w-3 text-primary-300" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onQuote}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                {t.nav.getQuote}
                <Truck className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Shared */}
          <div
            ref={cardBRef}
            className={`reveal group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl ring-1 ring-ink-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 sm:p-10 ${
              cardBVisible ? 'is-visible' : ''
            }`}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent-500/15 blur-3xl transition-all duration-700 group-hover:bg-accent-500/25" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/30">
                  <Users className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
                <span className="rounded-full border border-accent-300 bg-accent-100 px-3.5 py-1 text-xs font-bold text-accent-700">
                  {t.services.shared.badge}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold text-ink-900">
                {t.services.shared.name}
              </h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
                {t.services.shared.enName}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{t.services.shared.desc}</p>

              <ul className="mt-6 space-y-3">
                {t.services.shared.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-ink-700">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-100">
                      <Check className="h-3 w-3 text-accent-600" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onQuote}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-ink-800"
              >
                {t.nav.getQuote}
                <Users className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scope notice */}
        <div
          ref={tipsRef}
          className={`reveal mt-10 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-sm ${
            tipsVisible ? 'is-visible' : ''
          }`}
        >
          <div className="border-b border-ink-100 bg-ink-50/60 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-2.5">
              <Package className="h-5 w-5 text-primary-600" />
              <h3 className="font-display text-lg font-bold text-ink-900">{t.services.tipsTitle}</h3>
            </div>
          </div>
          <div className="grid gap-px bg-ink-100 sm:grid-cols-2">
            {/* Accept */}
            <div className="bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-success-600" />
                <h4 className="font-display text-base font-bold text-success-700">
                  {t.services.acceptTitle}
                </h4>
              </div>
              <ul className="mt-4 space-y-2.5">
                {t.services.accept.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Reject */}
            <div className="bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <XCircle className="h-5 w-5 text-error-500" />
                <h4 className="font-display text-base font-bold text-error-600">
                  {t.services.rejectTitle}
                </h4>
              </div>
              <ul className="mt-4 space-y-2.5">
                {t.services.reject.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-ink-500">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-error-100">
                      <X className="h-2.5 w-2.5 text-error-500" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
