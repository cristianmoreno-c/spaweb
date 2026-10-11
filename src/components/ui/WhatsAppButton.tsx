import { MSG, msgTreatment, waLink } from '../../lib/whatsapp';
import { useSite } from '../../context/SiteData';
type Props = { message?: string; label?: string; treatment?: string; variant?: 'primary' | 'secondary' | 'ghost'; className?: string };
export default function WhatsAppButton({ message, label = 'Agendar mi cita', treatment, variant = 'primary', className = '' }: Props) {
  const { waNumber } = useSite();
  const text = message ?? (treatment ? msgTreatment(treatment) : MSG.general);
  return (
    <a className={`btn btn-${variant} ${className}`} href={waLink(text, waNumber)} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}
