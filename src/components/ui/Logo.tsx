import { useSite } from '../../context/SiteData';
export default function Logo({ light = false }: { light?: boolean }) {
  const { img } = useSite();
  return (
    <span className={`logo ${light ? 'light' : ''}`}>
      <img src={img('logo_mark') ?? '/images/logo-mark.png'} alt="" height={46} />
      <span><strong>LUMINA</strong><small>Skin &amp; Body Spa</small></span>
    </span>
  );
}
