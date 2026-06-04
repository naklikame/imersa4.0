import { useEffect } from 'react';

export default function EmailContentPage() {
  useEffect(() => {
    let el = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!el) { el = document.createElement('meta'); el.setAttribute('name', 'robots'); document.head.appendChild(el); }
    el.setAttribute('content', 'noindex, nofollow');
    return () => el?.setAttribute('content', 'index, follow');
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <img
        src="/emailcontent.jpeg"
        alt="Imersa — interaktivní 3D konfigurátor nemovitostí"
        className="max-w-full h-auto"
      />
    </div>
  );
}
