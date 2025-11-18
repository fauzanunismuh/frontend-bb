"use client";

import { useLanguage } from "@/app/providers";
import {
  CreateKomentarPayload,
  postKomentarBerita,
  PublicBerita,
} from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

const texts = {
  id: {
    pageTitle: "Publikasi Bosowa Bandar Group",
    publishedOn: "Dipublikasikan pada",
    by: "Oleh",
    backLink: "← Kembali ke semua berita",
    commentsTitle: "Komentar",
    commentsEmpty: "Belum ada komentar.",
    commentFormTitle: "Tinggalkan Komentar",
    commentFormSubtitle:
      "Silakan bagikan tanggapan Anda. Komentar akan tampil setelah disetujui admin.",
    commentNameLabel: "Nama Lengkap",
    commentEmailLabel: "Email",
    commentBodyLabel: "Komentar",
    commentNamePlaceholder: "Masukkan nama",
    commentEmailPlaceholder: "Masukkan email",
    commentBodyPlaceholder: "Tulis komentar di sini...",
    commentSubmit: "Kirim Komentar",
    commentSubmitting: "Mengirim...",
    commentSuccess:
      "Terima kasih! Komentar Anda sudah dikirim dan menunggu persetujuan.",
    commentError: "Komentar gagal dikirim. Coba lagi.",
  },
  en: {
    pageTitle: "Bosowa Bandar Group Publication",
    publishedOn: "Published on",
    by: "By",
    backLink: "← Back to all news",
    commentsTitle: "Comments",
    commentsEmpty: "No comments yet.",
    commentFormTitle: "Leave a Comment",
    commentFormSubtitle:
      "Please share your thoughts. Your comment will appear after admin approval.",
    commentNameLabel: "Full Name",
    commentEmailLabel: "Email",
    commentBodyLabel: "Comment",
    commentNamePlaceholder: "Enter your name",
    commentEmailPlaceholder: "Enter your email",
    commentBodyPlaceholder: "Write your comment here...",
    commentSubmit: "Send Comment",
    commentSubmitting: "Sending...",
    commentSuccess:
      "Thank you! Your comment has been submitted and is awaiting approval.",
    commentError: "Failed to submit comment. Please try again.",
  },
};

type BeritaDetailClientProps = {
  berita: PublicBerita;
};

const BeritaDetailClient = ({ berita }: BeritaDetailClientProps) => {
  const { language } = useLanguage();
  const t = language === "en" ? texts.en : texts.id;
  const [commentForm, setCommentForm] = useState<CreateKomentarPayload>({
    nama: "",
    email: "",
    isi: "",
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState<string | null>(null);
  const localizedTitle =
    language === "en" ? berita.judul_en ?? berita.judul : berita.judul;
  const localizedSummary =
    language === "en"
      ? berita.ringkasan_en ?? berita.ringkasan
      : berita.ringkasan;
  const localizedContent =
    language === "en"
      ? berita.isi_konten_en ?? berita.isi_konten
      : berita.isi_konten;

  const publishedDate = berita.published_at
    ? new Date(berita.published_at).toLocaleDateString(
        language === "en" ? "en-US" : "id-ID",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      )
    : null;

  const approvedComments = berita.komentar ?? [];

  const commentDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(language === "en" ? "en-US" : "id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    [language],
  );

  const handleCommentChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCommentError(null);
    setCommentSuccess(null);
    setSubmittingComment(true);
    try {
      await postKomentarBerita(berita.slug, commentForm);
      setCommentSuccess(t.commentSuccess);
      setCommentForm({ nama: "", email: "", isi: "" });
    } catch (error) {
      setCommentError(
        error instanceof Error ? error.message : t.commentError,
      );
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 mt-24 py-16 md:py-20 lg:py-24">
      <div className="container max-w-4xl">
        <p className="text-primary text-sm tracking-wide uppercase">
          {t.pageTitle}
        </p>
        <h1 className="text-dark mt-2 mb-3 text-3xl font-bold dark:text-white">
          {localizedTitle}
        </h1>
        {publishedDate && (
          <p className="text-body-color mb-6 text-sm dark:text-gray-400">
            {t.publishedOn} {publishedDate}
            {berita.penulis?.nama_lengkap
              ? ` • ${t.by} ${berita.penulis.nama_lengkap}`
              : ""}
          </p>
        )}

        <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg">
          <Image
            src={berita.gambar_utama_url}
            alt={localizedTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <p className="text-body-color mb-8 text-lg dark:text-gray-200">
          {localizedSummary}
        </p>

        <article
          className="richtext-content"
          dangerouslySetInnerHTML={{ __html: localizedContent }}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-dark mb-4 text-2xl font-semibold dark:text-white">
              {t.commentsTitle}
            </h2>
            {approvedComments.length === 0 ? (
              <p className="text-body-color text-sm dark:text-gray-400">
                {t.commentsEmpty}
              </p>
            ) : (
              <div className="space-y-4 max-h-112 overflow-y-auto pr-2">
                {approvedComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-stroke dark:border-gray-700 rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-900"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-dark font-semibold dark:text-gray-100">
                        {comment.nama}
                      </p>
                      <span className="text-body-color text-xs dark:text-gray-400">
                        {commentDateFormatter.format(new Date(comment.created_at))}
                      </span>
                    </div>
                    <p className="text-body-color text-sm dark:text-gray-300 wrap-break-word">
                      {comment.isi}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-dark mb-2 text-2xl font-semibold dark:text-white">
              {t.commentFormTitle}
            </h2>
            <p className="text-body-color mb-4 text-sm dark:text-gray-400">
              {t.commentFormSubtitle}
            </p>
            {commentError && (
              <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                {commentError}
              </div>
            )}
            {commentSuccess && (
              <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                {commentSuccess}
              </div>
            )}
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nama"
                  className="text-dark text-sm font-medium dark:text-gray-200"
                >
                  {t.commentNameLabel}
                </label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  value={commentForm.nama}
                  onChange={handleCommentChange}
                  required
                  className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                  placeholder={t.commentNamePlaceholder}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-dark text-sm font-medium dark:text-gray-200"
                >
                  {t.commentEmailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={commentForm.email}
                  onChange={handleCommentChange}
                  required
                  className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                  placeholder={t.commentEmailPlaceholder}
                />
              </div>
              <div>
                <label
                  htmlFor="isi"
                  className="text-dark text-sm font-medium dark:text-gray-200"
                >
                  {t.commentBodyLabel}
                </label>
                <textarea
                  id="isi"
                  name="isi"
                  value={commentForm.isi}
                  onChange={handleCommentChange}
                  required
                  rows={4}
                  className="border-stroke focus:border-primary focus:ring-primary/20 mt-2 w-full rounded-md border bg-white px-4 py-2 text-sm outline-hidden focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                  placeholder={t.commentBodyPlaceholder}
                />
              </div>
              <button
                type="submit"
                disabled={submittingComment}
                className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 w-full rounded-md px-6 py-3 text-sm font-semibold text-white"
              >
                {submittingComment ? t.commentSubmitting : t.commentSubmit}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/berita"
            className="text-primary font-semibold hover:underline"
          >
            {t.backLink}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeritaDetailClient;
