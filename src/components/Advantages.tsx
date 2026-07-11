import { Shield, Clock, Sun, CloudRain, AlertTriangle, Zap, Calendar } from 'lucide-react';
import type { TranslationDict } from '../i18n';
import { useReveal, useCountUp } from '../hooks';

interface Props {
  t: TranslationDict;
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const numeric = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const isPercent = value.includes('%');
  const isAllDay = value.includes('/');
  const count = useCountUp(numeric, visible);
  const display = isPercent ? `${count}%` : isAllDay ? value : numeric === 0 ? value : String(count);
  return (
    <div
      ref={ref}
      className={`reveal rounded-2xl border border-ink-100 bg-white p-5 text-center transition-all duration-500 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10 ${
        visible ? 'is-visible' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display text-3xl font-extrabold text-primary-600">{display}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-500">{label}</div>
    </div>
  );
}

export default function Advantages({ t }: Props) {
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();
  const { ref: safetyRef, visible: safetyVisible } = useReveal<HTMLDivElement>();
  const { ref: timeRef, visible: timeVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header */}
        <div
          ref={headRef}
          className={`reveal mx-auto max-w-2xl text-center ${headVisible ? 'is-visible' : ''}`}
        >
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-600">
            {t.advantages.tag}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {t.advantages.title}
          </h2>
          <p className="mt-3 text-base text-ink-500">{t.advantages.subtitle}</p>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.advantages.stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} delay={i * 90} />
          ))}
        </div>

        {/* Two-column: safety + timeline */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Safety card */}
          <div
            ref={safetyRef}
            className={`reveal group relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-8 text-white shadow-xl sm:p-10 ${
              safetyVisible ? 'is-visible' : ''
            }`}
          >
            {/* Decorative */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary-500/20 blur-3xl transition-all duration-700 group-hover:bg-primary-500/30" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-accent-500/15 blur-2xl" />

            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30">
                <Shield className="h-7 w-7 text-white" strokeWidth={2.2} />
              </div>
              <h3 className="font-display text-2xl font-bold">{t.advantages.safetyTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {t.advantages.safetyDesc}
              </p>

              {/* Weather proof badges */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                  <CloudRain className="h-6 w-6 flex-shrink-0 text-accent-400" />
                  <div>
                    <div className="text-sm font-bold">100% 防雨</div>
                    <div className="text-[11px] text-white/50">Rain-proof</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                  <Sun className="h-6 w-6 flex-shrink-0 text-warning-400" />
                  <div>
                    <div className="text-sm font-bold">100% 防晒</div>
                    <div className="text-[11px] text-white/50">Sun-proof</div>
                  </div>
                </div>
              </div>

              {/* Comparison */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-semibold text-success-400">
                    <Shield className="h-4 w-4" /> 铁箱罗里 Box Lorry
                  </span>
                  <span className="text-xs text-white/40">vs</span>
                  <span className="flex items-center gap-2 font-semibold text-white/40 line-through">
                    帆布 Canvas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline card */}
          <div
            ref={timeRef}
            className={`reveal relative overflow-hidden rounded-3xl border border-ink-100 bg-ink-50/60 p-8 shadow-sm sm:p-10 ${
              timeVisible ? 'is-visible' : ''
            }`}
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/30">
              <Clock className="h-7 w-7 text-white" strokeWidth={2.2} />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink-900">
              {t.advantages.timelineTitle}
            </h3>

            {/* Timeline items */}
            <div className="mt-8 space-y-5">
              {/* Same day */}
              <div className="relative flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-success-100 text-success-600">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink-500">
                      {t.advantages.sameDay.label}
                    </span>
                    <span className="rounded-full bg-success-100 px-2.5 py-0.5 text-xs font-bold text-success-700">
                      {t.advantages.sameDay.value}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-500">{t.advantages.sameDay.desc}</p>
                </div>
                {/* connector */}
                <span className="absolute -bottom-5 left-9 h-5 w-0.5 bg-ink-200" />
              </div>

              {/* Next day */}
              <div className="relative flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink-500">
                      {t.advantages.nextDay.label}
                    </span>
                    <span className="rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-bold text-accent-700">
                      {t.advantages.nextDay.value}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-500">{t.advantages.nextDay.desc}</p>
                </div>
              </div>
            </div>

            {/* Safety note */}
            <div className="mt-6 flex gap-3 rounded-xl border border-warning-200 bg-warning-50 p-4">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning-600" />
              <p className="text-sm font-medium leading-relaxed text-warning-800">
                {t.advantages.safetyNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
