import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import Services from './components/Services';
import Calculator from './components/Calculator';
import Blog from './components/Blog';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

const BlogPage = lazy(() => import('./pages/BlogPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const EmailContentPage = lazy(() => import('./pages/EmailContentPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));

function HomePage() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] [overflow-x:clip] relative">
      <Navbar />
      <main>
        <Hero />
        <Presentation />
        <Services />
        <Calculator />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#f5f3ee]" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/emailcontent" element={<EmailContentPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
        </Routes>
      </Suspense>
      <CookieBanner />
    </BrowserRouter>
  );
}
