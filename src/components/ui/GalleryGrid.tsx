import { useEffect, useState } from 'react';
import Img from './Img';
import { IMG, GALLERY_ALTS } from '../../data/images';
export default function GalleryGrid() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (
    <>
      <div className="gallery">
        {IMG.gallery.map((src, i) => (
          <button key={i} className="g-item" onClick={() => setOpen(i)} aria-label={`Ampliar: ${GALLERY_ALTS[i]}`}>
            <Img src={src} alt={GALLERY_ALTS[i]} className="fill" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={GALLERY_ALTS[open]} onClick={() => setOpen(null)}>
          <button className="lb-close" autoFocus aria-label="Cerrar" onClick={() => setOpen(null)}>×</button>
          <div className="lb-body" onClick={(e) => e.stopPropagation()}><Img src={IMG.gallery[open]} alt={GALLERY_ALTS[open]} ratio="4/3" /></div>
        </div>
      )}
    </>
  );
}
