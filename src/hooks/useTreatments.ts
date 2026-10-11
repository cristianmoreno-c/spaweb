import { useSite } from '../context/SiteData';
// Los tratamientos vienen de Supabase (editables desde /admin). Si no hay conexión, se usan los de data/treatments.ts
export function useTreatments() {
  return useSite().treatments;
}
