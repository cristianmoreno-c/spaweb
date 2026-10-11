import type { ReactNode } from 'react';
// Convierte "texto *cursiva* texto" en <em> para conservar el estilo de los títulos.
export function rich(text: string): ReactNode {
  return text.split(/\*(.+?)\*/g).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}
export const isPending = (s: string) => /\[[A-Z_]+\]/.test(s);
