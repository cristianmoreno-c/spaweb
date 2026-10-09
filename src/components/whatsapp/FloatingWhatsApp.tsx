import { waLink } from '../../lib/whatsapp';
import Icon from '../ui/Icon';
export default function FloatingWhatsApp() {
  return <a className="float-wa" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Escribir a Mariana por WhatsApp"><Icon name="chat" /></a>;
}
