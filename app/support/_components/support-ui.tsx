"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowRight, BookOpenText, ChevronDown, FileQuestion, Headphones, Megaphone, MessageSquareText, PlayCircle, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Api } from "@/api";
import { PostDto, ThumbnailPostDto } from "@/types/Posts";

export const HELP_LINKS = [
  {
    title: "에버타임 시작하기",
    description: "초기 설정부터 기본 사용 흐름까지 확인합니다.",
    href: "https://everworks.notion.site/c6e7df1b4b9b43639ba6cfb617dc6015",
  },
  {
    title: "서비스 구성 이해하기",
    description: "관리자와 사용자 기능 구성을 한눈에 봅니다.",
    href: "https://everworks.notion.site/c692097ede06454f81ce3935bc1bc411",
  },
  {
    title: "근무시간 템플릿 등록",
    description: "회사 정책에 맞는 근무시간을 설정합니다.",
    href: "https://everworks.notion.site/c4aa7e57d90c45269645e614869841f5",
  },
  {
    title: "다양한 근무 방식 설정",
    description: "유연근무, 교대근무 등 운영 방식을 관리합니다.",
    href: "https://everworks.notion.site/169e55fa9b57485d8157cc0f3ddac77a",
  },
  {
    title: "출퇴근 위치 설정",
    description: "정확한 출퇴근 체크를 위한 위치 정책을 설정합니다.",
    href: "https://everworks.notion.site/377c1ea3dbc941a6b93b635150cf36b8",
  },
  {
    title: "직원 추가 및 초대",
    description: "구성원을 등록하고 서비스 이용을 안내합니다.",
    href: "https://everworks.notion.site/3e1f976eb1d04d628ce99bcb65328560",
  },
];

export const supportMenus = [
  { title: "지원 홈", href: "/support", icon: Headphones },
  { title: "동영상 가이드", href: "/support/video", icon: PlayCircle },
  { title: "온라인 도움말", href: "/support/help", icon: BookOpenText },
  { title: "FAQ", href: "/support/faq", icon: FileQuestion },
  { title: "공지사항", href: "/support/notice", icon: Megaphone },
  { title: "1:1 문의", href: "/support/inquiry", icon: MessageSquareText },
];

export function formatSupportDate(value?: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "-";
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

export function getYoutubeEmbedUrl(url?: string) {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }

    const id = parsed.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;

    if (parsed.pathname.includes("/embed/")) return url;
  } catch {
    return url;
  }

  return url;
}

export function SupportHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-emerald-50/70 via-white to-white">
      <div className="mx-auto max-w-[1180px] px-5 py-14 md:py-16">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#03b565]">{eyebrow}</p>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">{description}</p>
          </div>
          <Link
            href="/support/inquiry"
            className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-black text-white transition-colors hover:bg-[#03b565]"
          >
            문의하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SupportMenuList({ activeHref }: { activeHref: string }) {
  return (
    <div className="grid p-2">
      {supportMenus.map((menu) => {
        const Icon = menu.icon;
        const active = activeHref === menu.href;

        return (
          <Link
            key={menu.href}
            href={menu.href}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950",
              active && "bg-emerald-50 text-[#03b565]",
            )}
          >
            <Icon className="h-4 w-4" />
            {menu.title}
          </Link>
        );
      })}
    </div>
  );
}

function SupportContactCard() {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-[#03b565]">고객센터</p>
      <p className="mt-3 text-2xl font-black text-slate-950">02-2093-3226</p>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
        평일 오전 9시 - 오후 6시
        <br />
        토요일 및 공휴일 제외
      </p>
    </div>
  );
}

export function SupportFrame({
  activeHref,
  children,
}: {
  activeHref: string;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeMenu = supportMenus.find((menu) => menu.href === activeHref) ?? supportMenus[0];
  const ActiveIcon = activeMenu.icon;

  return (
    <div className="bg-slate-50">
      <div className="mx-auto grid max-w-[1180px] gap-6 px-5 py-6 lg:gap-8 lg:py-10 lg:grid-cols-[236px_1fr]">
        {/* Mobile: collapsible menu */}
        <div className="lg:hidden">
          <nav className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-3">
                <ActiveIcon className="h-5 w-5 text-[#03b565]" />
                <span>
                  <span className="block text-base font-black text-slate-950">{activeMenu.title}</span>
                  <span className="block text-xs font-medium text-slate-500">고객센터 메뉴</span>
                </span>
              </span>
              <ChevronDown className={cn("h-5 w-5 text-slate-400 transition-transform", menuOpen && "rotate-180")} />
            </button>
            {menuOpen ? (
              <div className="border-t border-slate-100">
                <SupportMenuList activeHref={activeHref} />
              </div>
            ) : null}
          </nav>
        </div>

        {/* Desktop: sticky sidebar */}
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <nav className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <p className="text-lg font-black text-slate-950">고객센터</p>
              <p className="mt-1 text-sm font-medium text-slate-500">필요한 도움을 빠르게 찾아보세요.</p>
            </div>
            <SupportMenuList activeHref={activeHref} />
          </nav>
          <div className="mt-4">
            <SupportContactCard />
          </div>
        </aside>

        <main className="min-w-0">{children}</main>

        {/* Mobile: contact card moved below content */}
        <div className="lg:hidden">
          <SupportContactCard />
        </div>
      </div>
    </div>
  );
}

export function SectionTitle({
  label,
  title,
  description,
  action,
}: {
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 text-sm font-black text-[#03b565]">{label}</p>
        <h2 className="text-3xl font-black tracking-normal text-slate-950">{title}</h2>
        {description ? <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function SearchPanel({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mb-6 flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm focus-within:border-[#03b565]">
      <Search className="h-5 w-5 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent text-base font-semibold text-slate-950 outline-none placeholder:text-slate-400"
      />
    </label>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <p className="text-lg font-black text-slate-950">{title}</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{description}</p>
    </div>
  );
}

export function Pager({
  currentPage,
  totalPage,
  onChange,
}: {
  currentPage: number;
  totalPage: number;
  onChange: (page: number) => void;
}) {
  if (totalPage <= 1) return null;

  return (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: totalPage }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(index)}
          className={cn(
            "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-black transition-colors",
            currentPage === index
              ? "border-slate-950 bg-slate-950 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-[#03b565] hover:text-[#03b565]",
          )}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export function PostContentModal({
  post,
  onClose,
}: {
  post: PostDto | null;
  onClose: () => void;
}) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm">
      <button type="button" aria-label="닫기" className="absolute inset-0 cursor-default" onClick={onClose} />
      <article className="relative flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-5 border-b border-slate-200 px-6 py-5">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#03b565]">Notice</p>
            <h3 className="text-xl font-black leading-7 text-slate-950">{post.title}</h3>
            <p className="mt-2 text-sm font-semibold text-slate-500">{formatSupportDate(post.registerDate)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-auto p-6">
          <iframe title={post.title || "내용"} srcDoc={post.content || post.searchText || ""} className="h-[58vh] w-full border-0" />
        </div>
      </article>
    </div>
  );
}

export function VideoModal({
  video,
  onClose,
}: {
  video: ThumbnailPostDto | null;
  onClose: () => void;
}) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-sm">
      <button type="button" aria-label="닫기" className="absolute inset-0 cursor-default" onClick={onClose} />
      <article className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-5 border-b border-slate-200 px-6 py-5">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#03b565]">Video Guide</p>
            <h3 className="text-xl font-black leading-7 text-slate-950">{video.title}</h3>
            {video.searchText ? <p className="mt-2 text-sm font-semibold text-slate-500">{video.searchText}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="aspect-video bg-slate-950">
          <iframe
            title={video.title || "동영상"}
            src={getYoutubeEmbedUrl(video.url)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </article>
    </div>
  );
}

export function VideoCard({
  video,
  onClick,
}: {
  video: ThumbnailPostDto;
  onClick: () => void;
}) {
  const thumbnailUrl = video.id && video.thumbnailFileId ? Api.Files.getThumbnailUrl(video.id, video.thumbnailFileId) : "";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#03b565]/40 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-100">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : null}
        <span className="absolute inset-0 flex items-center justify-center bg-slate-950/20">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#03b565] shadow-lg">
            <PlayCircle className="h-7 w-7" />
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-black leading-7 text-slate-950">{video.title}</h3>
        <p className="mt-2 line-clamp-2 min-h-[3rem] text-sm font-semibold leading-6 text-slate-500">{video.searchText}</p>
      </div>
    </button>
  );
}
