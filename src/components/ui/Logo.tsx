export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo ${light ? 'light' : ''}`}>
      <img src="/images/logo-mark.png" alt="" height={46} />
      <span><strong>LUMINA</strong><small>Skin &amp; Body Spa</small></span>
    </span>
  );
}
