"use client";

import { useLanguage } from "@/app/providers"; // Impor hook
import RichTextEditor from "@/components/RichTextEditor";
import {
  AdminKomentar,
  CreateBeritaPayload,
  KomentarStatus,
  KontakInfo,
  PublicBerita,
  createBeritaAdmin,
  deleteBeritaAdmin,
  getBeritaAdmin,
  getKomentarAdmin,
  getKontakInfo,
  updateBeritaAdmin,
  updateKomentarStatusAdmin,
  updateKontakAdmin,
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
  judul_en: "",
  ringkasan_en: "",
  isi_konten_en: "",
  gambar_utama_url: "",
  status: "draft",
};

const initialInfoState: KontakInfo = {
  alamat_kantor:
    "Menara Bosowa Lt. 8 Unit J Jl. Jend. Sudirman No.5 Kel. Pisang Utara, Kec. Ujung Pandang Kota Makassar, Sulawesi Selatan Indonesia 90115",
  no_hp: "+62 898 8821 777",
  email: "bosowa.bandar@bosowa.co.id",
  google_maps_embed:
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.8071451177057!2d119.41418780000001!3d-5.1347348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf030020151c7f%3A0x91f6cbbf1acbc877!2sPT.%20Bosowa%20Bandar%20Indonesia!5e0!3m2!1sid!2sid!4v1762738404067!5m2!1sid!2sid" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
};

type CommentFilter = "all" | KomentarStatus;

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
    formTitleEn: "Judul (Bahasa Inggris)",
    formSummary: "Ringkasan",
    formSummaryEn: "Ringkasan (Bahasa Inggris)",
    formContent: "Isi Konten",
    formContentEn: "Isi Konten (Bahasa Inggris)",
    formContentHelp:
      "Tulis konten lengkap beserta gambar/tautan menggunakan toolbar seperti Microsoft Word.",
    formContentEnHelp:
      "Opsional: tulis versi bahasa Inggris secara manual jika hasil terjemahan otomatis kurang tepat.",
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
    manageNewsTab: "Kelola Berita",
    manageInfoTab: "Info Perusahaan",
    manageCommentsTab: "Moderasi Komentar",
    commentsSectionTitle: "Komentar Publik",
    commentsSectionDesc:
      "Tinjau komentar dari pembaca sebelum ditampilkan di situs.",
    commentsFilterLabel: "Filter Status",
    commentsFilterAll: "Semua",
    commentsFilterPending: "Menunggu",
    commentsFilterApproved: "Disetujui",
    commentsFilterRejected: "Ditolak",
    commentsRefresh: "Segarkan",
    commentsRefreshing: "Menyegarkan...",
    commentsEmpty: "Tidak ada komentar untuk filter ini.",
    commentsLoadError: "Gagal memuat komentar.",
    commentStatusPending: "Menunggu",
    commentStatusApproved: "Disetujui",
    commentStatusRejected: "Ditolak",
    commentApprove: "Setujui",
    commentReject: "Tolak",
    commentMarkPending: "Tunda",
    commentUpdating: "Memproses...",
    commentActionError: "Gagal memperbarui status komentar.",
    commentNewsLabel: "Untuk berita:",
    commentEmailLabel: "Email",
    infoSectionTitle: "Informasi Perusahaan",
    infoSectionDesc:
      "Perbarui data alamat, kontak, dan embed Google Maps yang muncul di footer situs.",
    infoAddressField: "Alamat Kantor",
    infoPhoneField: "Nomor WhatsApp",
    infoEmailField: "Email",
    infoMapsField: "Google Maps Embed (iframe)",
    infoMapsHelp: "Tempel kode embed <iframe> dari Google Maps.",
    infoSaveButton: "Simpan Informasi",
    infoSavingButton: "Menyimpan...",
    infoSuccessMessage: "Informasi perusahaan berhasil diperbarui.",
    infoLoading: "Memuat informasi perusahaan...",
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
    formTitleEn: "Title (English)",
    formSummary: "Summary",
    formSummaryEn: "Summary (English)",
    formContent: "Content",
    formContentEn: "Content (English)",
    formContentHelp:
      "Write the full content with images/links using the toolbar, similar to Microsoft Word.",
    formContentEnHelp:
      "Optional: manually provide the English version if the automatic translation is inaccurate.",
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
    manageNewsTab: "Manage News",
    manageInfoTab: "Company Info",
    manageCommentsTab: "Moderate Comments",
    commentsSectionTitle: "Public Comments",
    commentsSectionDesc:
      "Review comments submitted by readers before they appear on the site.",
    commentsFilterLabel: "Filter Status",
    commentsFilterAll: "All",
    commentsFilterPending: "Pending",
    commentsFilterApproved: "Approved",
    commentsFilterRejected: "Rejected",
    commentsRefresh: "Refresh",
    commentsRefreshing: "Refreshing...",
    commentsEmpty: "No comments match this filter.",
    commentsLoadError: "Failed to load comments.",
    commentStatusPending: "Pending",
    commentStatusApproved: "Approved",
    commentStatusRejected: "Rejected",
    commentApprove: "Approve",
    commentReject: "Reject",
    commentMarkPending: "Mark Pending",
    commentUpdating: "Updating...",
    commentActionError: "Failed to update the comment status.",
    commentNewsLabel: "For article:",
    commentEmailLabel: "Email",
    infoSectionTitle: "Company Information",
    infoSectionDesc:
      "Update the address, contact, and Google Maps embed shown in the site footer.",
    infoAddressField: "Office Address",
    infoPhoneField: "WhatsApp / Phone",
    infoEmailField: "Email",
    infoMapsField: "Google Maps Embed (iframe)",
    infoMapsHelp: "Paste the <iframe> embed code from Google Maps.",
    infoSaveButton: "Save Information",
    infoSavingButton: "Saving...",
    infoSuccessMessage: "Company information updated successfully.",
    infoLoading: "Loading company information...",
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

  const [activeSection, setActiveSection] = useState<
    "berita" | "info" | "komentar"
  >("berita");
  const [news, setNews] = useState<PublicBerita[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [comments, setComments] = useState<AdminKomentar[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [commentActionId, setCommentActionId] = useState<string | null>(null);
  const [commentsFilter, setCommentsFilter] = useState<CommentFilter>(
    "pending",
  );

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

  const loadComments = useCallback(async () => {
    if (!token) return;
    setCommentsLoading(true);
    setCommentsError(null);
    try {
      const status = commentsFilter === "all" ? undefined : commentsFilter;
      const data = await getKomentarAdmin(token, { status });
      setComments(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t.commentsLoadError;
      setCommentsError(message);
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error as { status?: number }).status === 401
      ) {
        logout();
      }
    } finally {
      setCommentsLoading(false);
    }
  }, [commentsFilter, logout, t.commentsLoadError, token]);

  useEffect(() => {
    if (token) {
      loadComments();
    }
  }, [loadComments, token]);

  const loadInfo = useCallback(async () => {
    setInfoLoading(true);
    setInfoError(null);
    try {
      const data = await getKontakInfo();
      setInfoForm(data);
    } catch (error) {
      setInfoError(
        error instanceof Error ? error.message : t.uploadErrorGeneral,
      );
    } finally {
      setInfoLoading(false);
    }
  }, [t.uploadErrorGeneral]);

  useEffect(() => {
    loadInfo();
  }, [loadInfo]);

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
  const [infoForm, setInfoForm] = useState<KontakInfo>(initialInfoState);
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [infoSuccess, setInfoSuccess] = useState<string | null>(null);
  const [infoSubmitting, setInfoSubmitting] = useState(false);

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

  const handleInfoChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setInfoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInfoSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setInfoError(t.uploadErrorNotLoggedIn);
      return;
    }
    setInfoSubmitting(true);
    setInfoError(null);
    setInfoSuccess(null);
    try {
      const updated = await updateKontakAdmin(token, infoForm);
      setInfoForm(updated);
      setInfoSuccess(t.infoSuccessMessage);
    } catch (error) {
      setInfoError(
        error instanceof Error ? error.message : t.uploadErrorGeneral,
      );
    } finally {
      setInfoSubmitting(false);
    }
  };

  const handleCommentFilterChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setCommentsFilter(event.target.value as CommentFilter);
  };

  const handleCommentStatusChange = async (
    komentarId: string,
    status: KomentarStatus,
  ) => {
    if (!token) return;
    setCommentActionId(komentarId);
    setCommentsError(null);
    try {
      await updateKomentarStatusAdmin(token, komentarId, status);
      await loadComments();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t.commentActionError;
      setCommentsError(message);
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error as { status?: number }).status === 401
      ) {
        logout();
      }
    } finally {
      setCommentActionId(null);
    }
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
      judul_en: berita.judul_en ?? "",
      ringkasan_en: berita.ringkasan_en ?? "",
      isi_konten_en: berita.isi_konten_en ?? "",
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

  const handleRichTextChangeEn = useCallback((html: string) => {
    setFormState((prev) => ({ ...prev, isi_konten_en: html }));
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
  const infoDisabled = infoLoading || infoSubmitting;

  const renderNewsSection = () => (
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
              htmlFor="judul_en"
              className="text-dark text-sm font-medium dark:text-gray-200"
            >
              {t.formTitleEn}
            </label>
            <input
              id="judul_en"
              name="judul_en"
              value={formState.judul_en ?? ""}
              onChange={handleChange}
              className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Optional"
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
              htmlFor="ringkasan_en"
              className="text-dark text-sm font-medium dark:text-gray-200"
            >
              {t.formSummaryEn}
            </label>
            <textarea
              id="ringkasan_en"
              name="ringkasan_en"
              value={formState.ringkasan_en ?? ""}
              onChange={handleChange}
              rows={3}
              className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Optional"
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
          </div>
          <div>
            <label
              htmlFor="isi_konten_en"
              className="text-dark text-sm font-medium dark:text-gray-200"
            >
              {t.formContentEn}
            </label>
            <div className="mt-2">
              <RichTextEditor
                id="isi_konten_en"
                value={formState.isi_konten_en ?? ""}
                onChange={handleRichTextChangeEn}
                onUploadImage={handleInlineImageUpload}
                onUploadError={setInlineImageError}
              />
            </div>
            <p className="text-body-color mt-2 text-xs dark:text-gray-400">
              {t.formContentEnHelp}
            </p>
            {inlineImageError && (
              <p className="mt-2 text-sm text-red-500">{inlineImageError}</p>
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
              <p className="mt-2 text-sm text-red-500">{imageUploadError}</p>
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
  );

  const renderCommentsSection = () => {
    const formatCommentDate = (value: string) =>
      new Date(value).toLocaleString(language === "en" ? "en-US" : "id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    return (
      <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-900">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-dark text-xl font-semibold dark:text-white">
              {t.commentsSectionTitle}
            </h2>
            <p className="text-body-color text-sm dark:text-gray-400">
              {t.commentsSectionDesc}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div>
              <label
                htmlFor="comment-filter"
                className="text-dark block text-sm font-medium dark:text-gray-200"
              >
                {t.commentsFilterLabel}
              </label>
              <select
                id="comment-filter"
                value={commentsFilter}
                onChange={handleCommentFilterChange}
                className="border-stroke focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
              >
                <option value="all">{t.commentsFilterAll}</option>
                <option value="pending">{t.commentsFilterPending}</option>
                <option value="approved">{t.commentsFilterApproved}</option>
                <option value="rejected">{t.commentsFilterRejected}</option>
              </select>
            </div>
            <button
              onClick={loadComments}
              disabled={commentsLoading}
              className="text-primary hover:text-primary/80 disabled:text-primary/40 text-sm font-semibold"
            >
              {commentsLoading ? t.commentsRefreshing : t.commentsRefresh}
            </button>
          </div>
        </div>
        {commentsError && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {commentsError}
          </div>
        )}
        {commentsLoading && comments.length === 0 && (
          <p className="text-body-color text-sm dark:text-gray-400">
            {t.loading}
          </p>
        )}
        {!commentsLoading && comments.length === 0 && (
          <p className="text-body-color text-sm dark:text-gray-400">
            {t.commentsEmpty}
          </p>
        )}
        <div className="space-y-4">
          {comments.map((comment) => {
            const isPending = comment.status === "pending";
            const isApproved = comment.status === "approved";
            const statusLabel = isApproved
              ? t.commentStatusApproved
              : comment.status === "rejected"
                ? t.commentStatusRejected
                : t.commentStatusPending;
            const statusClass = isApproved
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-100"
              : comment.status === "rejected"
                ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-100";

            return (
              <article
                key={comment.id}
                className="rounded-lg border border-gray-100 p-4 dark:border-gray-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-dark font-semibold dark:text-white">
                      {comment.nama}
                    </p>
                    <p className="text-body-color text-sm dark:text-gray-400">
                      {t.commentEmailLabel}: {comment.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`mb-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
                    >
                      {statusLabel}
                    </span>
                    <p className="text-body-color text-xs dark:text-gray-400">
                      {formatCommentDate(comment.created_at)}
                    </p>
                  </div>
                </div>
                <p className="text-body-color mt-3 text-sm dark:text-gray-300">
                  <span className="font-semibold text-dark dark:text-gray-100">
                    {t.commentNewsLabel}
                  </span>{" "}
                  <Link
                    href={`/berita/${comment.berita.slug}`}
                    target="_blank"
                    className="text-primary font-semibold hover:underline"
                  >
                    {comment.berita.judul}
                  </Link>
                </p>
                <p className="text-body-color mt-3 text-sm dark:text-gray-100 wrap-break-word">
                  {comment.isi}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {!isApproved && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCommentStatusChange(comment.id, "approved")
                      }
                      disabled={commentActionId === comment.id}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-500/60 rounded-md px-4 py-2 text-sm font-semibold text-white"
                    >
                      {commentActionId === comment.id
                        ? t.commentUpdating
                        : t.commentApprove}
                    </button>
                  )}
                  {comment.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCommentStatusChange(comment.id, "rejected")
                      }
                      disabled={commentActionId === comment.id}
                      className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-red-200/60 disabled:text-red-400 dark:border-red-400/40 dark:hover:bg-red-500/10"
                    >
                      {commentActionId === comment.id
                        ? t.commentUpdating
                        : t.commentReject}
                    </button>
                  )}
                  {!isPending && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCommentStatusChange(comment.id, "pending")
                      }
                      disabled={commentActionId === comment.id}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200/60 disabled:text-gray-400 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      {commentActionId === comment.id
                        ? t.commentUpdating
                        : t.commentMarkPending}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  };

  const renderInfoSection = () => (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-900">
      <h2 className="text-dark text-xl font-semibold dark:text-white">
        {t.infoSectionTitle}
      </h2>
      <p className="text-body-color mb-4 text-sm dark:text-gray-400">
        {t.infoSectionDesc}
      </p>
      {infoError && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {infoError}
        </div>
      )}
      {infoSuccess && (
        <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          {infoSuccess}
        </div>
      )}
      {infoLoading && (
        <p className="text-body-color mb-4 text-sm dark:text-gray-400">
          {t.infoLoading}
        </p>
      )}
      <form onSubmit={handleInfoSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="alamat_kantor"
            className="text-dark text-sm font-medium dark:text-gray-200"
          >
            {t.infoAddressField}
          </label>
          <textarea
            id="alamat_kantor"
            name="alamat_kantor"
            value={infoForm.alamat_kantor}
            onChange={handleInfoChange}
            rows={3}
            disabled={infoDisabled}
            className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="text-dark text-sm font-medium dark:text-gray-200"
            >
              {t.infoEmailField}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={infoForm.email}
              onChange={handleInfoChange}
              disabled={infoDisabled}
              className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div>
            <label
              htmlFor="no_hp"
              className="text-dark text-sm font-medium dark:text-gray-200"
            >
              {t.infoPhoneField}
            </label>
            <input
              id="no_hp"
              name="no_hp"
              value={infoForm.no_hp}
              onChange={handleInfoChange}
              disabled={infoDisabled}
              className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="google_maps_embed"
            className="text-dark text-sm font-medium dark:text-gray-200"
          >
            {t.infoMapsField}
          </label>
          <textarea
            id="google_maps_embed"
            name="google_maps_embed"
            value={infoForm.google_maps_embed}
            onChange={handleInfoChange}
            rows={6}
            disabled={infoDisabled}
            className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800"
          />
          <p className="text-body-color mt-2 text-xs dark:text-gray-400">
            {t.infoMapsHelp}
          </p>
        </div>
        <button
          type="submit"
          disabled={infoDisabled}
          className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 w-full rounded-md px-6 py-3 text-sm font-semibold text-white"
        >
          {infoSubmitting ? t.infoSavingButton : t.infoSaveButton}
        </button>
      </form>
    </div>
  );

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

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveSection("berita")}
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              activeSection === "berita"
                ? "bg-primary text-white shadow"
                : "border border-gray-300 text-body-color hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300"
            }`}
          >
            {t.manageNewsTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("info")}
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              activeSection === "info"
                ? "bg-primary text-white shadow"
                : "border border-gray-300 text-body-color hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300"
            }`}
          >
            {t.manageInfoTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("komentar")}
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              activeSection === "komentar"
                ? "bg-primary text-white shadow"
                : "border border-gray-300 text-body-color hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300"
            }`}
          >
            {t.manageCommentsTab}
          </button>
        </div>

        {activeSection === "berita"
          ? renderNewsSection()
          : activeSection === "info"
            ? renderInfoSection()
            : renderCommentsSection()}
      </div>
    </section>
  );
};

export default AdminBeritaPage;
