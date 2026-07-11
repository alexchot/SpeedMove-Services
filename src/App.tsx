import { useEffect, useMemo, useState } from 'react';
import type { Lang } from './i18n';
import { translations } from './i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import Services from './components/Services';
import Addon from './components/Addon';
import QuoteForm from './components/QuoteForm';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Lang>('zh');
  const t = useMemo(() => translations[lang], [lang]);

  const scrollToQuote = () => {
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} t={t} onQuote={scrollToQuote} />
      <main>
        <Hero t={t} onQuote={scrollToQuote} />
        <Advantages t={t} />
        <Services t={t} onQuote={scrollToQuote} />
        <Addon t={t} onQuote={scrollToQuote} />
        <QuoteForm t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} onQuote={scrollToQuote} />
    </div>
  );
}
