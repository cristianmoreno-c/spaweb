import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TREATMENTS } from '../data/treatments';
import type { Treatment } from '../types';
export function useTreatments() {
  const [items, setItems] = useState<Treatment[]>(TREATMENTS);
  useEffect(() => {
    if (!supabase) return;
    supabase.from('treatments').select('*').eq('active', true).order('created_at').then(({ data }) => {
      if (!data || !data.length) return;
      setItems(data.map((r: any) => ({
        ...r,
        benefits: r.benefits?.length ? r.benefits : TREATMENTS.find((x) => x.slug === r.slug)?.benefits ?? [],
      })));
    });
  }, []);
  return items;
}
