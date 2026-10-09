type Props = { src?: string; alt: string; ratio?: string; className?: string; bare?: boolean };
export default function Img({ src, alt, ratio, className = '', bare }: Props) {
  const style = ratio ? { aspectRatio: ratio } : undefined;
  if (src) return <div className={`img ${className}`} style={style}><img src={src} alt={alt} loading="lazy" decoding="async" /></div>;
  return (
    <div className={`img ph ${className}`} style={style} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      {!bare && <img className="ph-mark" src="/images/logo-mark.png" alt="" />}
    </div>
  );
}
