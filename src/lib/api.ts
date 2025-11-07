export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type FetchOptions = RequestInit & { authToken?: string };

class ApiError extends Error {
  status?: number;
}

async function fetchJson<T>(path: string, init: FetchOptions = {}): Promise<T> {
  const { authToken, headers, cache, ...rest } = init;
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    cache: cache ?? "no-store",
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

export type PublicBerita = {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  isi_konten: string;
  gambar_utama_url: string;
  status: "draft" | "published";
  published_at: string | null;
  penulis?: { nama_lengkap: string | null };
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
  );
}

export async function getBeritaDetail(slug: string): Promise<PublicBerita> {
  return fetchJson<PublicBerita>(`/api/berita/${slug}`);
}

export type KontakInfo = {
  alamat_kantor: string;
  no_hp: string;
  email: string;
  google_maps_embed: string;
};

export async function getKontakInfo(): Promise<KontakInfo> {
  return fetchJson<KontakInfo>("/api/kontak");
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
