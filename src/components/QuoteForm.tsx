import { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Navigation,
  Truck,
  Package,
  Shield,
  Send,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import type { Lang, TranslationDict } from '../i18n';
import { useReveal } from '../hooks';

interface Props {
  t: TranslationDict;
  lang: Lang;
}

// The WhatsApp number clients should contact — placeholder, easy to update.
const WHATSAPP_NUMBER = '60123456789';

export default function QuoteForm({ t, lang }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    from: '',
    to: '',
    lorrySize: '',
    serviceType: '',
    wrapping: '',
    details: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState(false);

  const lorrySizes = ['1-Ton', '3-Ton', '5-Ton'];

  const update = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched) setErrors((e) => ({ ...e, [key]: false }));
  };

  const validate = () => {
    const required: (keyof typeof form)[] = ['name', 'phone', 'from', 'to', 'lorrySize', 'serviceType'];
    const e: Record<string, boolean> = {};
    required.forEach((k) => {
      if (!form[k]) e[k] = true;
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const intro = t.quote.whatsappIntro;
    const L = (label: string, val: string) =>
      `${label}: ${val || '—'}`;
    const lines = [
      intro,
      '',
      L(t.quote.form.name, form.name),
      L(t.quote.form.phone, form.phone),
      L(t.quote.form.from, form.from),
      L(t.quote.form.to, form.to),
      L(t.quote.form.lorrySize, form.lorrySize),
      L(t.quote.form.serviceType, form.serviceType),
      L(t.quote.form.wrapping, form.wrapping || '—'),
      L(t.quote.form.details, form.details),
    ];
    return lines.join('\n');
  };

  const handleSubmit = () => {
    setTouched(true);
    if (!validate()) {
      // Scroll to first error
      const firstErr = ['name', 'phone', 'from', 'to', 'lorrySize', 'serviceType'].find(
        (k) => !form[k as keyof typeof form]
      );
      if (firstErr) {
        document.getElementById(`field-${firstErr}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      return;
    }
    const msg = buildMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const inputBase =
    'w-full rounded-xl border bg-white px-4 py-3 pl-11 text-sm text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:outline-none focus:ring-2';

  const fieldClass = (key: string) =>
    `${inputBase} ${
      errors[key]
        ? 'border-error-300 focus:ring-error-400/30 focus:border-error-400'
        : 'border-ink-200 focus:ring-primary-400/30 focus:border-primary-500'
    }`;

  return (
    <section id="quote" className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-24 sm:py-32">
      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-primary-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-accent-500/15 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-300 backdrop-blur-md">
              <MessageCircle className="h-3.5 w-3.5" />
              {t.quote.tag}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t.quote.title}
            </h2>
            <p className="mt-3 text-base text-white/60">{t.quote.subtitle}</p>
          </div>

          {/* Form card */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">
            <div className="grid lg:grid-cols-[1fr_1.4fr]">
              {/* Left info panel */}
              <div className="relative hidden flex-col justify-between bg-gradient-to-br from-navy-900 to-navy-950 p-8 lg:flex sm:p-10">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30">
                    <Send className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-white">WhatsApp</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {lang === 'zh'
                      ? '一键将您的搬运需求发送至我们的 WhatsApp，客服即刻回复专属报价。'
                      : 'Send your moving request to our WhatsApp with one click — our team replies with a custom quote.'}
                  </p>

                  <div className="mt-8 space-y-3">
                    {t.quote.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-white/80">
                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-success-400" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview bubble */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-success-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                      {lang === 'zh' ? '预览消息' : 'Message Preview'}
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap break-words font-sans text-[11px] leading-relaxed text-white/70">
{t.quote.whatsappIntro}
{'  '}
{t.quote.form.name}: {form.name || '...'}
{t.quote.form.lorrySize}: {form.lorrySize || '...'}
                  </pre>
                </div>
              </div>

              {/* Right form */}
              <div className="p-6 sm:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div id="field-name">
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                      {t.quote.form.name} <span className="text-error-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder={t.quote.form.namePh}
                        className={fieldClass('name')}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-error-500">{t.quote.form.required}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div id="field-phone">
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                      {t.quote.form.phone} <span className="text-error-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder={t.quote.form.phonePh}
                        className={fieldClass('phone')}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-error-500">{t.quote.form.required}</p>
                    )}
                  </div>

                  {/* From */}
                  <div id="field-from">
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                      {t.quote.form.from} <span className="text-error-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type="text"
                        value={form.from}
                        onChange={(e) => update('from', e.target.value)}
                        placeholder={t.quote.form.fromPh}
                        className={fieldClass('from')}
                      />
                    </div>
                    {errors.from && (
                      <p className="mt-1 text-xs text-error-500">{t.quote.form.required}</p>
                    )}
                  </div>

                  {/* To */}
                  <div id="field-to">
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                      {t.quote.form.to} <span className="text-error-500">*</span>
                    </label>
                    <div className="relative">
                      <Navigation className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type="text"
                        value={form.to}
                        onChange={(e) => update('to', e.target.value)}
                        placeholder={t.quote.form.toPh}
                        className={fieldClass('to')}
                      />
                    </div>
                    {errors.to && (
                      <p className="mt-1 text-xs text-error-500">{t.quote.form.required}</p>
                    )}
                  </div>

                  {/* Lorry size — pill select */}
                  <div id="field-lorrySize" className="sm:col-span-2">
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                      <Truck className="h-3.5 w-3.5" />
                      {t.quote.form.lorrySize} <span className="text-error-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {lorrySizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update('lorrySize', s)}
                          className={`group relative flex flex-col items-center justify-center rounded-xl border-2 px-3 py-3 text-sm font-bold transition-all duration-200 ${
                            form.lorrySize === s
                              ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md shadow-primary-500/20'
                              : errors.lorrySize
                              ? 'border-error-200 bg-white text-ink-500 hover:border-error-300'
                              : 'border-ink-200 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50/30'
                          }`}
                        >
                          <Truck
                            className={`mb-1 h-5 w-5 ${
                              form.lorrySize === s ? 'text-primary-600' : 'text-ink-400'
                            }`}
                          />
                          {s}
                          {form.lorrySize === s && (
                            <CheckCircle2 className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-primary-600 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.lorrySize && (
                      <p className="mt-1 text-xs text-error-500">{t.quote.form.required}</p>
                    )}
                  </div>

                  {/* Service type — pill select */}
                  <div id="field-serviceType" className="sm:col-span-2">
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                      <Package className="h-3.5 w-3.5" />
                      {t.quote.form.serviceType} <span className="text-error-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { val: t.quote.form.dedicated, key: 'dedicated' },
                        { val: t.quote.form.shared, key: 'shared' },
                      ].map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => update('serviceType', s.val)}
                          className={`flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-bold transition-all duration-200 ${
                            form.serviceType === s.val
                              ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-md shadow-accent-500/20'
                              : errors.serviceType
                              ? 'border-error-200 bg-white text-ink-500 hover:border-error-300'
                              : 'border-ink-200 bg-white text-ink-600 hover:border-accent-300 hover:bg-accent-50/30'
                          }`}
                        >
                          {s.key === 'dedicated' ? (
                            <Truck className="h-4 w-4" />
                          ) : (
                            <Package className="h-4 w-4" />
                          )}
                          {s.val}
                          {form.serviceType === s.val && (
                            <CheckCircle2 className="h-4 w-4 text-accent-600" />
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.serviceType && (
                      <p className="mt-1 text-xs text-error-500">{t.quote.form.required}</p>
                    )}
                  </div>

                  {/* Wrapping — toggle */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                      <Shield className="h-3.5 w-3.5" />
                      {t.quote.form.wrapping}
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { val: t.quote.form.wrappingYes, key: 'yes' },
                        { val: t.quote.form.wrappingNo, key: 'no' },
                      ].map((w) => (
                        <button
                          key={w.key}
                          type="button"
                          onClick={() => update('wrapping', w.val)}
                          className={`flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition-all duration-200 ${
                            form.wrapping === w.val
                              ? w.key === 'yes'
                                ? 'border-success-500 bg-success-50 text-success-700'
                                : 'border-ink-300 bg-ink-100 text-ink-600'
                              : 'border-ink-200 bg-white text-ink-500 hover:border-ink-300'
                          }`}
                        >
                          {w.key === 'yes' ? <Shield className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                          {w.val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cargo details */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                      {t.quote.form.details}
                    </label>
                    <textarea
                      value={form.details}
                      onChange={(e) => update('details', e.target.value)}
                      placeholder={t.quote.form.detailsPh}
                      rows={3}
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-success-500 to-success-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-success-600/30 transition-all duration-300 hover:shadow-xl hover:shadow-success-600/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t.quote.form.submit}
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <p className="mt-3 text-center text-xs text-ink-400">
                  {lang === 'zh'
                    ? '点击后将自动打开 WhatsApp 并填好您的询价信息'
                    : 'Clicking opens WhatsApp with your enquiry pre-filled'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
