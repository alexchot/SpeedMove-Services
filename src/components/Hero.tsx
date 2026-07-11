import { MapPin, Shield, Truck, ChevronDown, ArrowRight } from 'lucide-react';
import type { TranslationDict } from '../i18n';

const badgeIcons = { MapPin, Shield, Truck } as const;

interface Props {
  t: TranslationDict;
  onQuote: () => void;
}

export default function Hero({ t, onQuote }: Props) {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/image.png"
          alt="SpeedMove Services box lorry on KL highway"
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30" />
      </div>

      {/* Decorative glowing orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-primary-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-2/3 h-64 w-64 rounded-full bg-accent-500/20 blur-[90px]" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-20 pb-28 sm:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="h-2 w-2 animate-ping rounded-full bg-accent-400" />
              <span className="absolute h-2 w-2 rounded-full bg-accent-400" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              SpeedMove Services
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-4xl font-extrabold leading-[1.15] tracking-tight text-white animate-fade-up sm:text-5xl lg:text-[3.5rem]"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 animate-fade-up sm:text-lg"
            style={{ animationDelay: '0.22s', opacity: 0 }}
          >
            {t.hero.subtitle}
          </p>

          {/* Badges */}
          <div
            className="mt-8 flex flex-wrap gap-2.5 animate-fade-up"
            style={{ animationDelay: '0.34s', opacity: 0 }}
          >
            {t.hero.badges.map((b, i) => {
              const Icon = badgeIcons[b.icon as keyof typeof badgeIcons];
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md transition-colors hover:bg-white/20 sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-primary-300" />
                  {b.text}
                </span>
              );
            })}
          </div>

          {/* CTA */}
          <div
            className="mt-10 flex flex-col gap-4 animate-fade-up sm:flex-row sm:items-center"
            style={{ animationDelay: '0.46s', opacity: 0 }}
          >
            <button
              onClick={onQuote}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-primary-600/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-600/50 hover:-translate-y-0.5 animate-pulse-glow"
            >
              {t.hero.cta}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() =>
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              {t.nav.about}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/60 transition-colors hover:text-white"
        aria-label={t.hero.scrollHint}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
          {t.hero.scrollHint}
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
