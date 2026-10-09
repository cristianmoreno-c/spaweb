const P: Record<string, string> = {
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6',
  badge: 'M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  home: 'M3 11l9-8 9 8M5 10v10h14V10',
  drop: 'M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z',
  heart: 'M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z',
  chat: 'M4 5h16v11H9l-5 4z',
};
export default function Icon({ name }: { name: string }) {
  return <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[name] ?? P.user} /></svg>;
}
