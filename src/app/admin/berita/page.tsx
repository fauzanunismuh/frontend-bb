"use client";

import RichTextEditor from "@/components/RichTextEditor";
import {
  CreateBeritaPayload,
  PublicBerita,
  createBeritaAdmin,
  deleteBeritaAdmin,
  getBeritaAdmin,
  uploadImageRequest,
  updateBeritaAdmin,
} from "@/lib/api";
import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const initialFormState: CreateBeritaPayload = {
  judul: "",
  ringkasan: "",
  isi_konten: "",
  gambar_utama_url: "",
  status: "draft",
};

const AdminBeritaPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storedToken = localStorage.getItem("bbi_admin_token");
    const storedProfile = localStorage.getItem("bbi_admin_profile");

    setToken(storedToken);
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setAdminName(parsed?.nama_lengkap ?? parsed?.email ?? null);
      } catch {
        setAdminName(null);
      }
    }
    setInitializing(false);
  }, []);

  const [news, setNews] = useState<PublicBerita[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("bbi_admin_token");
    localStorage.removeItem("bbi_admin_profile");
    setToken(null);
    setAdminName(null);
  }, []);

  const loadNews = useCallback(async () => {
    if (!token) return;
    setListLoading(true);
    setListError(null);
    try {
      const data = await getBeritaAdmin(token);
      setNews(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal memuat daftar berita.";
      setListError(message);
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error as { status?: number }).status === 401
      ) {
        logout();
      }
    } finally {
      setListLoading(false);
    }
  }, [logout, token]);

  useEffect(() => {
    if (token) {
      loadNews();
    }
  }, [loadNews, token]);

  const [formState, setFormState] =
    useState<CreateBeritaPayload>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [inlineImageError, setInlineImageError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const resetFormState = useCallback(() => {
    setFormState({ ...initialFormState });
    setInlineImageError(null);
  }, []);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = async (
    beritaId: string,
    nextStatus: "draft" | "published",
  ) => {
    if (!token) return;
    setStatusUpdatingId(beritaId);
    setListError(null);
    try {
      await updateBeritaAdmin(token, beritaId, { status: nextStatus });
      await loadNews();
    } catch (error) {
      setListError(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui status berita.",
      );
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!token) {
      setImageUploadError("Anda belum login.");
      return;
    }
    setImageUploadError(null);
    setUploadingImage(true);
    try {
      const { imageUrl } = await uploadImageRequest(token, file);
      setFormState((prev) => ({ ...prev, gambar_utama_url: imageUrl }));
    } catch (error) {
      setImageUploadError(
        error instanceof Error
          ? error.message
          : "Gagal mengunggah gambar. Coba lagi.",
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleInlineImageUpload = useCallback(
    async (file: File) => {
      if (!token) {
        throw new Error("Anda belum login.");
      }
      const { imageUrl } = await uploadImageRequest(token, file);
      return imageUrl;
    },
    [token],
  );

  const handleDelete = async (beritaId: string, title: string) => {
    if (!token) {
      setListError("Anda belum login.");
      return;
    }
    const confirmed =
      typeof window === "undefined"
        ? true
        : window.confirm(
            `Hapus berita "${title}"? Tindakan ini tidak dapat dibatalkan.`,
          );
    if (!confirmed) return;
    setDeletingId(beritaId);
    setListError(null);
    try {
      await deleteBeritaAdmin(token, beritaId);
      if (editingId === beritaId) {
        resetFormState();
        setEditingId(null);
      }
      await loadNews();
    } catch (error) {
      setListError(
        error instanceof Error
          ? error.message
          : "Gagal menghapus berita. Coba lagi.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setSubmitError("Anda belum login.");
      return;
    }
    const plainContent = formState.isi_konten
      ?.replace(/<[^>]+>/g, "")
      .trim();
    if (!plainContent) {
      setSubmitError("Isi konten tidak boleh kosong.");
      return;
    }
    if (!formState.gambar_utama_url) {
      setSubmitError("Unggah gambar utama sebelum menyimpan berita.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    try {
      if (editingId) {
        await updateBeritaAdmin(token, editingId, formState);
        setSubmitSuccess("Berita berhasil diperbarui.");
      } else {
        await createBeritaAdmin(token, formState);
      setSubmitSuccess("Berita berhasil disimpan.");
      }
      resetFormState();
      setEditingId(null);
      await loadNews();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan berita.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditStart = (berita: PublicBerita) => {
    setFormState({
      judul: berita.judul ?? "",
      ringkasan: berita.ringkasan ?? "",
      isi_konten: berita.isi_konten ?? "",
      gambar_utama_url: berita.gambar_utama_url ?? "",
      status: berita.status ?? "draft",
    });
    setEditingId(berita.id);
    setSubmitError(null);
    setSubmitSuccess(null);
    setInlineImageError(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCancelEdit = () => {
    resetFormState();
    setEditingId(null);
    setSubmitError(null);
    setSubmitSuccess(null);
    setInlineImageError(null);
  };

  const isEditing = Boolean(editingId);
  const editingNewsTitle = useMemo(() => {
    if (!editingId) return null;
    return news.find((item) => item.id === editingId)?.judul ?? null;
  }, [editingId, news]);
  const formTitle = isEditing ? "Edit Berita" : "Tambah Berita";
  const formDescription = isEditing
    ? "Perbarui konten berita yang sudah dipublikasikan atau masih draft."
    : "Lengkapi formulir di bawah untuk mempublikasikan berita baru.";
  const submitLabel = isEditing ? "Perbarui Berita" : "Simpan Berita";
  const submitLoadingLabel = isEditing ? "Memperbarui..." : "Menyimpan...";

  const pageHeading = useMemo(
    () => (adminName ? `Halo, ${adminName}` : "Dashboard Admin"),
    [adminName],
  );

  if (initializing) {
    return (
      <section className="container py-20 text-center">
        <p className="text-body-color dark:text-gray-400">Memuat...</p>
      </section>
    );
  }

  if (!token) {
    return (
      <section className="bg-gray-light/30 dark:bg-gray-dark/40 py-20">
        <div className="container text-center">
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Dashboard Admin
          </h1>
          <p className="text-body-color mt-4">
            Harap{" "}
            <Link href="/signin" className="text-primary font-semibold">
              login terlebih dahulu
            </Link>{" "}
            untuk mengelola berita.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-primary">
              Administrasi Konten
            </p>
            <h1 className="text-dark text-3xl font-bold dark:text-white">
              {pageHeading}
            </h1>
            <p className="text-body-color dark:text-gray-400">
              Atur berita Bosowa Bandar Indonesia dari satu tempat.
            </p>
          </div>
          <button
            onClick={logout}
            className="text-sm font-semibold text-red-500 hover:text-red-600"
          >
            Keluar
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-dark dark:text-white">
              {formTitle}
            </h2>
            <p className="text-body-color mb-4 text-sm dark:text-gray-400">
              {formDescription}
            </p>
            {isEditing && (
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm text-primary">
                <span>
                  Mengedit:{" "}
                  <span className="font-semibold">
                    {editingNewsTitle ?? "Berita terpilih"}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs font-semibold uppercase tracking-wide text-primary hover:text-primary/80"
                >
                  Batal Edit
                </button>
              </div>
            )}

            {submitError && (
              <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                {submitSuccess}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label
                  htmlFor="judul"
                  className="text-sm font-medium text-dark dark:text-gray-200"
                >
                  Judul
                </label>
                <input
                  id="judul"
                  name="judul"
                  value={formState.judul}
                  onChange={handleChange}
                  required
                  className="border-stroke mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div>
                <label
                  htmlFor="ringkasan"
                  className="text-sm font-medium text-dark dark:text-gray-200"
                >
                  Ringkasan
                </label>
                <textarea
                  id="ringkasan"
                  name="ringkasan"
                  value={formState.ringkasan}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="border-stroke mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div>
                <label
                  htmlFor="isi_konten"
                  className="text-sm font-medium text-dark dark:text-gray-200"
                >
                  Isi Konten
                </label>
                <div className="mt-2">
                  <RichTextEditor
                    id="isi_konten"
                    value={formState.isi_konten}
                    onChange={(value) =>
                      setFormState((prev) => ({ ...prev, isi_konten: value }))
                    }
                    onUploadImage={handleInlineImageUpload}
                    onUploadError={(message) => setInlineImageError(message)}
                  />
                </div>
                {inlineImageError && (
                  <p className="text-xs text-red-500 mt-2">{inlineImageError}</p>
                )}
                <p className="text-xs text-body-color mt-2">
                  Gunakan toolbar (termasuk tombol Img) untuk format teks dan
                  menyisipkan gambar tanpa menulis HTML.
                </p>
              </div>
              <div>
                <label
                  htmlFor="gambar_utama_url"
                  className="text-sm font-medium text-dark dark:text-gray-200"
                >
                  Gambar Utama (Upload)
                </label>
                <input
                  id="gambar_utama_url"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="border-stroke mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/90 dark:border-gray-700 dark:bg-gray-800"
                />
                <p className="text-xs text-body-color mt-2">
                  Maksimal 5MB. Format yang disarankan: JPG atau PNG.
                </p>
                {imageUploadError && (
                  <p className="text-sm text-red-500 mt-2">{imageUploadError}</p>
                )}
                {uploadingImage && (
                  <p className="text-sm text-body-color mt-2">
                    Mengunggah gambar...
                  </p>
                )}
                {formState.gambar_utama_url && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-dark dark:text-gray-200">
                      Pratinjau Gambar:
                    </p>
                    <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border border-dashed border-gray-300 dark:border-gray-700">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formState.gambar_utama_url}
                        alt="Pratinjau gambar utama"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-dark dark:text-gray-200"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formState.status ?? "draft"}
                  onChange={handleChange}
                  className="border-stroke mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Publikasikan</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting || uploadingImage}
                className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 w-full rounded-md px-6 py-3 text-sm font-semibold text-white"
              >
                {submitting ? submitLoadingLabel : submitLabel}
              </button>
            </form>
          </div>

          <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dark dark:text-white">
                Semua Berita
              </h2>
              <button
                onClick={loadNews}
                disabled={listLoading}
                className="text-sm font-semibold text-primary hover:text-primary/80 disabled:text-primary/40"
              >
                {listLoading ? "Menyegarkan..." : "Segarkan"}
              </button>
            </div>
            {listError && (
              <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                {listError}
              </div>
            )}

            <div className="space-y-4">
              {news.length === 0 && !listLoading && (
                <p className="text-sm text-body-color dark:text-gray-400">
                  Belum ada berita yang dibuat.
                </p>
              )}

              {news.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border border-gray-100 p-4 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-dark dark:text-white">
                        {item.judul}
                      </h3>
                      <p className="text-xs uppercase tracking-wide text-primary">
                        {item.status === "published" ? "Published" : "Draft"}
                      </p>
                    </div>
                    <span className="text-sm text-body-color dark:text-gray-400">
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </span>
                  </div>
                  <p className="text-sm text-body-color line-clamp-2 dark:text-gray-400">
                    {item.ringkasan}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/berita/${item.slug}`}
                      target="_blank"
                      className="text-sm font-semibold text-primary hover:text-primary/80"
                    >
                      Lihat Halaman Publik
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleEditStart(item)}
                      disabled={editingId === item.id}
                      className="rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold text-dark transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                    >
                      {editingId === item.id ? "Sedang Diedit" : "Edit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.judul)}
                      disabled={deletingId === item.id}
                      className="rounded-md border border-red-200 px-3 py-1 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-red-200/60 disabled:text-red-400 dark:border-red-400/40 dark:hover:bg-red-500/10"
                    >
                      {deletingId === item.id ? "Menghapus..." : "Hapus"}
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          item.status === "published" ? "draft" : "published",
                        )
                      }
                      disabled={statusUpdatingId === item.id}
                      className="rounded-md border border-primary px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:border-primary/50 disabled:text-primary/50"
                    >
                      {statusUpdatingId === item.id
                        ? "Menyimpan..."
                        : item.status === "published"
                          ? "Jadikan Draft"
                          : "Publikasikan"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminBeritaPage;
