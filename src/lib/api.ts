export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type FetchOptions = RequestInit & { authToken?: string };

class ApiError extends Error {
  status?: number;
}

async function fetchJson<T>(path: string, init: FetchOptions = {}): Promise<T> {
  const { authToken, headers, cache, next, ...rest } = init;
  const url = `${API_BASE_URL}${path}`;

  // Use force-cache for GET requests by default, no-store for mutations
  const isMutation = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(rest.method as string);
  const cacheOption = cache ?? (isMutation ? 'no-store' : 'force-cache');

  const response = await fetch(url, {
    cache: cacheOption,
    ...next,
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(headers ?? {}),
    },
  });

  const rawBody = await response.text();
  if (!response.ok) {
    let message = rawBody || `Gagal memuat data (status ${response.status})`;
    try {
      const parsed = JSON.parse(rawBody);
      const parsedMessage = Array.isArray(parsed?.message)
        ? parsed.message.join(", ")
        : parsed?.message;
      if (parsedMessage) {
        message = parsedMessage;
      }
    } catch {
      // Biarkan message default
    }
    const error = new ApiError(message);
    error.status = response.status;
    throw error;
  }

  return rawBody ? (JSON.parse(rawBody) as T) : ({} as T);
}

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
};

export type KomentarStatus = "pending" | "approved" | "rejected";

export type PublicKomentar = {
  id: string;
  nama: string;
  isi: string;
  created_at: string;
};

export type PublicBerita = {
  id: string;
  judul: string;
  judul_en?: string | null;
  slug: string;
  ringkasan: string;
  ringkasan_en?: string | null;
  isi_konten: string;
  isi_konten_en?: string | null;
  gambar_utama_url: string;
  status: "draft" | "published";
  published_at: string | null;
  penulis?: { nama_lengkap: string | null };
  komentar?: PublicKomentar[];
};

export type AdminKomentar = {
  id: string;
  nama: string;
  email: string;
  isi: string;
  status: KomentarStatus;
  created_at: string;
  berita: {
    id: string;
    judul: string;
    slug: string;
  };
};

type BeritaListResponse = {
  data: PublicBerita[];
  meta: PaginationMeta;
};

export async function getBeritaPublic(params?: {
  page?: number;
  limit?: number;
}): Promise<BeritaListResponse> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", params.page.toString());
  if (params?.limit) search.set("limit", params.limit.toString());
  const query = search.toString();

  return fetchJson<BeritaListResponse>(
    `/api/berita${query ? `?${query}` : ""}`,
    { next: { revalidate: 300 } }, // Revalidate every 5 minutes
  );
}

export async function getBeritaDetail(slug: string): Promise<PublicBerita> {
  return fetchJson<PublicBerita>(`/api/berita/${slug}`, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  });
}

export type CreateKomentarPayload = {
  nama: string;
  email: string;
  isi: string;
};

export async function postKomentarBerita(
  slug: string,
  payload: CreateKomentarPayload,
): Promise<{ message: string }> {
  return fetchJson<{ message: string }>(`/api/berita/${slug}/komentar`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type KontakInfo = {
  alamat_kantor: string;
  no_hp: string;
  email: string;
  google_maps_embed: string;
};

export async function getKontakInfo(): Promise<KontakInfo> {
  return fetchJson<KontakInfo>("/api/kontak", {
    cache: 'no-store', // Always fetch fresh data
  });
}

export async function updateKontakAdmin(
  token: string,
  payload: KontakInfo,
): Promise<KontakInfo> {
  return fetchJson<KontakInfo>("/api/admin/kontak", {
    method: "PUT",
    body: JSON.stringify(payload),
    authToken: token,
  });
}

export type AdminLoginResponse = {
  access_token: string;
  admin: {
    id: string;
    email: string;
    nama_lengkap: string;
  };
};

export async function loginAdmin(credentials: {
  email: string;
  password: string;
}): Promise<AdminLoginResponse> {
  return fetchJson<AdminLoginResponse>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export async function requestAdminPasswordReset(
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> {
  return fetchJson<ForgotPasswordResponse>("/api/admin/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getBeritaAdmin(
  token: string,
): Promise<PublicBerita[]> {
  return fetchJson<PublicBerita[]>("/api/admin/berita", {
    authToken: token,
  });
}

export type CreateBeritaPayload = {
  judul: string;
  ringkasan: string;
  isi_konten: string;
  judul_en?: string | null;
  ringkasan_en?: string | null;
  isi_konten_en?: string | null;
  gambar_utama_url: string;
  status?: "draft" | "published";
};

export async function createBeritaAdmin(
  token: string,
  payload: CreateBeritaPayload,
): Promise<PublicBerita> {
  return fetchJson<PublicBerita>("/api/admin/berita", {
    method: "POST",
    body: JSON.stringify(payload),
    authToken: token,
  });
}

export async function updateBeritaAdmin(
  token: string,
  id: string,
  payload: Partial<CreateBeritaPayload>,
): Promise<PublicBerita> {
  return fetchJson<PublicBerita>(`/api/admin/berita/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    authToken: token,
  });
}

export async function deleteBeritaAdmin(
  token: string,
  id: string,
): Promise<void> {
  await fetchJson(`/api/admin/berita/${id}`, {
    method: "DELETE",
    authToken: token,
  });
}

export async function getKomentarAdmin(
  token: string,
  params?: { status?: KomentarStatus },
): Promise<AdminKomentar[]> {
  const search = new URLSearchParams();
  if (params?.status) {
    search.set("status", params.status);
  }
  const query = search.toString();
  return fetchJson<AdminKomentar[]>(
    `/api/admin/komentar${query ? `?${query}` : ""}`,
    {
      authToken: token,
    },
  );
}

export async function updateKomentarStatusAdmin(
  token: string,
  id: string,
  status: KomentarStatus,
): Promise<AdminKomentar> {
  return fetchJson<AdminKomentar>(`/api/admin/komentar/${id}/status`, {
    method: "PUT",
    authToken: token,
    body: JSON.stringify({ status }),
  });
}

export type UploadImageResponse = {
  imageUrl: string;
  filename?: string;
};

export async function uploadImageRequest(
  token: string,
  file: File,
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/admin/upload-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const rawBody = await response.text();
  if (!response.ok) {
    let message = rawBody || `Gagal mengunggah gambar (status ${response.status})`;
    try {
      const parsed = JSON.parse(rawBody);
      const parsedMessage = Array.isArray(parsed?.message)
        ? parsed.message.join(", ")
        : parsed?.message;
      if (parsedMessage) {
        message = parsedMessage;
      }
    } catch {
      // fallback
    }
    throw new Error(message);
  }

  return rawBody ? (JSON.parse(rawBody) as UploadImageResponse) : { imageUrl: "" };
}
// --- Info Cabang API ---

export type InfoCabang = {
  id: string;
  nama_cabang: string;
  alamat: string;
  no_telepon?: string;
  google_maps_embed: string;
  created_at?: string;
  updated_at?: string;
};

export type CreateCabangPayload = {
  nama_cabang: string;
  alamat: string;
  no_telepon?: string;
  google_maps_embed: string;
};

export async function getCabangPublic(): Promise<InfoCabang[]> {
  return fetchJson<InfoCabang[]>("/api/cabang", {
    next: { revalidate: 1800 }, // Revalidate every 30 minutes
  });
}

export async function getCabangAdmin(token: string): Promise<InfoCabang[]> {
  return fetchJson<InfoCabang[]>("/api/admin/cabang", {
    authToken: token,
  });
}

export async function createCabangAdmin(
  token: string,
  payload: CreateCabangPayload,
): Promise<InfoCabang> {
  return fetchJson<InfoCabang>("/api/admin/cabang", {
    method: "POST",
    body: JSON.stringify(payload),
    authToken: token,
  });
}

export async function updateCabangAdmin(
  token: string,
  id: string,
  payload: Partial<CreateCabangPayload>,
): Promise<InfoCabang> {
  return fetchJson<InfoCabang>(`/api/admin/cabang/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    authToken: token,
  });
}

export async function deleteCabangAdmin(
  token: string,
  id: string,
): Promise<void> {
  await fetchJson(`/api/admin/cabang/${id}`, {
    method: "DELETE",
    authToken: token,
  });
}
