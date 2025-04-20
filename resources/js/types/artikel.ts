
export interface Artikel {
  id: number;
  title: string;
  slug: string;
  views: number;
  image: string | null;
  excerpt: string;
  keyword: string;
  content: string;
  status_artikel: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  user?: User;
  kategori?: Kategori;
  komentar?: Komentar[];
}

export interface User {
  id: number;
  name: string;
  image: string;
  deskripsi: string;
}
export interface IUser {
  id: number;
  name: string;
}

export interface Kategori {
  id: number;
  nama: string;
}

export interface Komentar {
  id: number;
  nama: string;
  email: string;
  komentar: string;
}
export interface RekomendasiArtikel {
  title: string;
  views: string;
  slug: string;
  image: string;
  excerpt: string;
  status_artikel: string;
  published_at: string;
  user_id: string;
  kategori_id: string;
  user?: IUser;
  kategori_artikel?: Kategori;
}
