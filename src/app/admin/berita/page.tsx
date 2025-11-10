"use client";

import { useLanguage } from "@/app/providers"; // Impor hook
import RichTextEditor from "@/components/RichTextEditor";
import {
  CreateBeritaPayload,
  PublicBerita,
  createBeritaAdmin,
  deleteBeritaAdmin,
  getBeritaAdmin,
  updateBeritaAdmin,
  uploadImageRequest,
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

// Objek Teks
const texts = {
  id: {
    loading: "Memuat...",
    adminDashboard: "Dashboard Admin",
    loginFirst: "Harap",
    loginLink: "login terlebih dahulu",
    loginMessage: "untuk mengelola berita.",
    contentAdmin: "Administrasi Konten",
    pageHeadingDefault: "Dashboard Admin",
    pageHeadingUser: "Halo, {name}",
    pageDescription: "Atur berita Bosowa Bandar Indonesia dari satu tempat.",
    logout: "Keluar",
    addNews: "Tambah Berita",
    addDesc: "Lengkapi formulir di bawah untuk mempublikasikan berita baru.",
    editNews: "Edit Berita",
    editDesc:
      "Perbarui konten berita yang sudah dipublikasikan atau masih draft.",
    editingLabel: "Mengedit:",
    cancelEdit: "Batal Edit",
    formTitle: "Judul",
    formSummary: "Ringkasan",
    formContent: "Isi Konten",
    formContentHelp:
      "Tulis konten lengkap beserta gambar/tautan menggunakan toolbar seperti Microsoft Word.",
    formMainImage: "Gambar Utama (Upload)",
    formMainImageHelp: "Maksimal 5MB. Format yang disarankan: JPG atau PNG.",
    uploadingImage: "Mengunggah gambar...",
    imagePreview: "Pratinjau Gambar:",
    formStatus: "Status",
    statusDraft: "Draft",
    statusPublish: "Publikasikan",
    saveButton: "Simpan Berita",
    savingButton: "Menyimpan...",
    updateButton: "Perbarui Berita",
    updatingButton: "Memperbarui...",
    allNews: "Semua Berita",
    refresh: "Segarkan",
    refreshing: "Menyegarkan...",
    noNews: "Belum ada berita yang dibuat.",
    statusPublished: "Published",
    statusDraftLabel: "Draft",
    viewPublicPage: "Lihat Halaman Publik",
    edit: "Edit",
    editing: "Sedang Diedit",
    delete: "Hapus",
    deleting: "Menghapus...",
    setDraft: "Jadikan Draft",
    publish: "Publikasikan",
    savingStatus: "Menyimpan...",
    deleteConfirm:
      'Hapus berita "{title}"? Tindakan ini tidak dapat dibatalkan.',
    uploadErrorNotLoggedIn: "Anda belum login.",
    uploadErrorGeneral: "Gagal mengunggah gambar. Coba lagi.",
    contentEmptyError: "Isi konten tidak boleh kosong.",
    imageEmptyError: "Unggah gambar utama sebelum menyimpan berita.",
  },
  en: {
    loading: "Loading...",
    adminDashboard: "Admin Dashboard",
    loginFirst: "Please",
    loginLink: "login first",
    loginMessage: "to manage news.",
    contentAdmin: "Content Administration",
    pageHeadingDefault: "Admin Dashboard",
    pageHeadingUser: "Hello, {name}",
    pageDescription: "Manage Bosowa Bandar Indonesia news from one place.",
    logout: "Logout",
    addNews: "Add News",
    addDesc: "Complete the form below to publish new content.",
    editNews: "Edit News",
    editDesc: "Update published or draft news content.",
    editingLabel: "Editing:",
    cancelEdit: "Cancel Edit",
    formTitle: "Title",
    formSummary: "Summary",
    formContent: "Content",
    formContentHelp:
      "Write the full content with images/links using the toolbar, similar to Microsoft Word.",
    formMainImage: "Main Image (Upload)",
    formMainImageHelp: "Max 5MB. Recommended formats: JPG or PNG.",
    uploadingImage: "Uploading image...",
    imagePreview: "Image Preview:",
    formStatus: "Status",
    statusDraft: "Draft",
    statusPublish: "Publish",
    saveButton: "Save News",
    savingButton: "Saving...",
    updateButton: "Update News",
    updatingButton: "Updating...",
    allNews: "All News",
    refresh: "Refresh",
    refreshing: "Refreshing...",
    noNews: "No news has been created yet.",
    statusPublished: "Published",
    statusDraftLabel: "Draft",
    viewPublicPage: "View Public Page",
    edit: "Edit",
    editing: "Editing",
    delete: "Delete",
    deleting: "Deleting...",
    setDraft: "Set to Draft",
    publish: "Publish",
    savingStatus: "Saving...",
    deleteConfirm: 'Delete news "{title}"? This action cannot be undone.',
    uploadErrorNotLoggedIn: "You are not logged in.",
    uploadErrorGeneral: "Failed to upload image. Please try again.",
    contentEmptyError: "Content cannot be empty.",
    imageEmptyError: "Upload a main image before saving.",
  },
};

const AdminBeritaPage = () => {
  const { language } = useLanguage();
  const t = language === "en" ? texts.en : texts.id;

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
        error instanceof Error ? error.message : "Gagal memuat daftar berita.";
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

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!token) {
      setImageUploadError(t.uploadErrorNotLoggedIn);
      return;
    }
    setImageUploadError(null);
    setUploadingImage(true);
    try {
      const { imageUrl } = await uploadImageRequest(token, file);
      setFormState((prev) => ({ ...prev, gambar_utama_url: imageUrl }));
    } catch (error) {
      setImageUploadError(
        error instanceof Error ? error.message : t.uploadErrorGeneral,
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleInlineImageUpload = useCallback(
    async (file: File) => {
      if (!token) {
        throw new Error(t.uploadErrorNotLoggedIn);
      }
      const { imageUrl } = await uploadImageRequest(token, file);
      return imageUrl;
    },
    [token, t.uploadErrorNotLoggedIn],
  );

  const handleDelete = async (beritaId: string, title: string) => {
    if (!token) {
      setListError(t.uploadErrorNotLoggedIn);
      return;
    }
    const confirmed =
      typeof window === "undefined"
        ? true
        : window.confirm(t.deleteConfirm.replace("{title}", title));
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
      setSubmitError(t.uploadErrorNotLoggedIn);
      return;
    }
    const plainContent = formState.isi_konten?.replace(/<[^>]+>/g, "").trim();
    if (!plainContent) {
      setSubmitError(t.contentEmptyError);
      return;
    }
    if (!formState.gambar_utama_url) {
      setSubmitError(t.imageEmptyError);
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

  const handleRichTextChange = useCallback((html: string) => {
    setFormState((prev) => ({ ...prev, isi_konten: html }));
  }, []);

  const isEditing = Boolean(editingId);
  const editingNewsTitle = useMemo(() => {
    if (!editingId) return null;
    return news.find((item) => item.id === editingId)?.judul ?? null;
  }, [editingId, news]);

  const formTitle = isEditing ? t.editNews : t.addNews;
  const formDescription = isEditing ? t.editDesc : t.addDesc;
  const submitLabel = isEditing ? t.updateButton : t.saveButton;
  const submitLoadingLabel = isEditing ? t.updatingButton : t.savingButton;

  const pageHeading = useMemo(
    () =>
      adminName
        ? t.pageHeadingUser.replace("{name}", adminName)
        : t.pageHeadingDefault,
    [adminName, t],
  );

  if (initializing) {
    return (
      <section className="container mt-24 py-20 text-center">
        <p className="text-body-color dark:text-gray-400">{t.loading}</p>
      </section>
    );
  }

  if (!token) {
    return (
      <section className="bg-gray-light/30 dark:bg-gray-dark/40 mt-24 py-20">
        <div className="container text-center">
          <h1 className="text-dark text-3xl font-bold dark:text-white">
            {t.adminDashboard}
          </h1>
          <p className="text-body-color mt-4">
            {t.loginFirst}{" "}
            <Link href="/signin" className="text-primary font-semibold">
              {t.loginLink}
            </Link>{" "}
            {t.loginMessage}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 mt-24 py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-primary text-sm tracking-wide uppercase">
              {t.contentAdmin}
            </p>
            <h1 className="text-dark text-3xl font-bold dark:text-white">
              {pageHeading}
            </h1>
            <p className="text-body-color dark:text-gray-400">
              {t.pageDescription}
            </p>
          </div>
          <button
            onClick={logout}
            className="text-sm font-semibold text-red-500 hover:text-red-600"
          >
            {t.logout}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-900">
            <h2 className="text-dark text-xl font-semibold dark:text-white">
              {formTitle}
            </h2>
            <p className="text-body-color mb-4 text-sm dark:text-gray-400">
              {formDescription}
            </p>
            {isEditing && (
              <div className="border-primary/40 bg-primary/5 text-primary mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-dashed px-4 py-3 text-sm">
                <span>
                  {t.editingLabel}{" "}
                  <span className="font-semibold">
                    {editingNewsTitle ?? "Berita terpilih"}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-primary hover:text-primary/80 text-xs font-semibold tracking-wide uppercase"
                >
                  {t.cancelEdit}
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
                  className="text-dark text-sm font-medium dark:text-gray-200"
                >
                  {t.formTitle}
                </label>
                <input
                  id="judul"
                  name="judul"
                  value={formState.judul}
                  onChange={handleChange}
                  required
                  className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div>
                <label
                  htmlFor="ringkasan"
                  className="text-dark text-sm font-medium dark:text-gray-200"
                >
                  {t.formSummary}
                </label>
                <textarea
                  id="ringkasan"
                  name="ringkasan"
                  value={formState.ringkasan}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div>
                <label
                  htmlFor="isi_konten"
                  className="text-dark text-sm font-medium dark:text-gray-200"
                >
                  {t.formContent}
                </label>
                <div className="mt-2">
                  <RichTextEditor
                    id="isi_konten"
                    value={formState.isi_konten}
                    onChange={handleRichTextChange}
                    onUploadImage={handleInlineImageUpload}
                    onUploadError={setInlineImageError}
                  />
                </div>
                <p className="text-body-color mt-2 text-xs dark:text-gray-400">
                  {t.formContentHelp}
                </p>
                {inlineImageError && (
                  <p className="mt-2 text-sm text-red-500">
                    {inlineImageError}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="gambar_utama_url"
                  className="text-dark text-sm font-medium dark:text-gray-200"
                >
                  {t.formMainImage}
                </label>
                <input
                  id="gambar_utama_url"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="border-stroke file:bg-primary hover:file:bg-primary/90 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white dark:border-gray-700 dark:bg-gray-800"
                />
                <p className="text-body-color mt-2 text-xs">
                  {t.formMainImageHelp}
                </p>
                {imageUploadError && (
                  <p className="mt-2 text-sm text-red-500">
                    {imageUploadError}
                  </p>
                )}
                {uploadingImage && (
                  <p className="text-body-color mt-2 text-sm">
                    {t.uploadingImage}
                  </p>
                )}
                {formState.gambar_utama_url && (
                  <div className="mt-4">
                    <p className="text-dark text-xs font-medium dark:text-gray-200">
                      {t.imagePreview}
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
                  className="text-dark text-sm font-medium dark:text-gray-200"
                >
                  {t.formStatus}
                </label>
                <select
                  id="status"
                  name="status"
                  value={formState.status ?? "draft"}
                  onChange={handleChange}
                  className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="draft">{t.statusDraft}</option>
                  <option value="published">{t.statusPublish}</option>
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
              <h2 className="text-dark text-xl font-semibold dark:text-white">
                {t.allNews}
              </h2>
              <button
                onClick={loadNews}
                disabled={listLoading}
                className="text-primary hover:text-primary/80 disabled:text-primary/40 text-sm font-semibold"
              >
                {listLoading ? t.refreshing : t.refresh}
              </button>
            </div>
            {listError && (
              <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                {listError}
              </div>
            )}

            <div className="space-y-4">
              {news.length === 0 && !listLoading && (
                <p className="text-body-color text-sm dark:text-gray-400">
                  {t.noNews}
                </p>
              )}

              {news.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border border-gray-100 p-4 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-dark text-lg font-semibold dark:text-white">
                        {item.judul}
                      </h3>
                      <p className="text-primary text-xs tracking-wide uppercase">
                        {item.status === "published"
                          ? t.statusPublished
                          : t.statusDraftLabel}
                      </p>
                    </div>
                    <span className="text-body-color text-sm dark:text-gray-400">
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString(
                            language === "en" ? "en-US" : "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </span>
                  </div>
                  <p className="text-body-color line-clamp-2 text-sm dark:text-gray-400">
                    {item.ringkasan}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/berita/${item.slug}`}
                      target="_blank"
                      className="text-primary hover:text-primary/80 text-sm font-semibold"
                    >
                      {t.viewPublicPage}
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleEditStart(item)}
                      disabled={editingId === item.id}
                      className="text-dark rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                    >
                      {editingId === item.id ? t.editing : t.edit}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.judul)}
                      disabled={deletingId === item.id}
                      className="rounded-md border border-red-200 px-3 py-1 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-red-200/60 disabled:text-red-400 dark:border-red-400/40 dark:hover:bg-red-500/10"
                    >
                      {deletingId === item.id ? t.deleting : t.delete}
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          item.status === "published" ? "draft" : "published",
                        )
                      }
                      disabled={statusUpdatingId === item.id}
                      className="border-primary text-primary hover:bg-primary/10 disabled:border-primary/50 disabled:text-primary/50 rounded-md border px-3 py-1 text-sm font-semibold disabled:cursor-not-allowed"
                    >
                      {statusUpdatingId === item.id
                        ? t.savingStatus
                        : item.status === "published"
                          ? t.setDraft
                          : t.publish}
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
