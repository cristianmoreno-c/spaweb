import { useEffect, useState } from 'react';
import Img from './Img';
import { GALLERY_KEYS } from '../../data/images';
import { useSite } from '../../context/SiteData';
export default function GalleryGrid() {
  const { img, alt } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (
    <>
      <div className="gallery">
        {GALLERY_KEYS.map((key, i) => (
          <button key={key} className="g-item" onClick={() => setOpen(i)} aria-label={`Ampliar: ${alt(key)}`}>
            <Img src={img(key)} alt={alt(key)} className="fill" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt(GALLERY_KEYS[open])} onClick={() => setOpen(null)}>
          <button className="lb-close" autoFocus aria-label="Cerrar" onClick={() => setOpen(null)}>×</button>
          <div className="lb-body" onClick={(e) => e.stopPropagation()}><Img src={img(GALLERY_KEYS[open])} alt={alt(GALLERY_KEYS[open])} ratio="4/3" /></div>
        </div>
      )}
    </>
  );
}
