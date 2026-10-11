import { useSite } from '../../context/SiteData';
export default function Faq() {
  const { faqs } = useSite();
  return <div className="faq">{faqs.map((f) => <details key={f.id}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div>;
}
