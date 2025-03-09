// src/hooks/useStruktur.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Struktur {
  id: number;
  nama_lengkap: string;
  jabatan: string;
  universitas: string;
  komisariat: string;
  is_active: boolean;
}

export const useStruktur = () => {
  const [strukturList, setStrukturList] = useState<Struktur[]>([]);

  useEffect(() => {
    axios.get('/api/struktur').then((response) => setStrukturList(response.data));
  }, []);

  return { strukturList };
};
