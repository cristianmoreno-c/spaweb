import { waLink } from '../../lib/whatsapp';
import { useSite } from '../../context/SiteData';
import Icon from '../ui/Icon';
export default function FloatingWhatsApp() {
  const { waNumber } = useSite();
  return <a className="float-wa" href={waLink(undefined, waNumber)} target="_blank" rel="noopener noreferrer" aria-label="Escribir a Mariana por WhatsApp"><Icon name="chat" /></a>;
}
