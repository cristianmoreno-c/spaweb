import type { ReactNode } from 'react';
export default function SectionHeading({ title, text }: { title: ReactNode; text?: string }) {
  return (<div className="heading"><h2>{title}</h2>{text && <p>{text}</p>}</div>);
}
