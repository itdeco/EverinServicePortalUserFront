"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Paperclip, Send } from "lucide-react";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { CommonCode, CommonCodeDto } from "@/types/CommonCode";
import { CreatePostDto, PostType } from "@/types/Posts";
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users";
import { SectionTitle, SupportFrame, SupportHero } from "../../_components/support-ui";

export default function SupportInquiryWritePage() {
  const router = useRouter();
  const isLoggedIn = Boolean(useLoginStatus());
  const profile = useUserProfile();

  const [categories, setCategories] = useState<CommonCodeDto[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [replyOption, setReplyOption] = useState("0");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadCategories = async () => {
      const result = await Api.CommonCodes.getCommonCodesByCategoryCode(CommonCode.Inquiry.type);
      if (checkApiResult(result)) {
        const payload = (result?.payload || []) as CommonCodeDto[];
        setCategories(payload);
        setCategoryId(String(payload[0]?.id || ""));
      }
    };

    loadCategories();
  }, [isLoggedIn]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(event.target.files || []));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("문의 내용을 입력해주세요.");
      return;
    }

    setSubmitting(true);
    const selectedCategory = categories.find((category) => String(category.id) === categoryId);
    const post: CreatePostDto = {
      userId: profile?.userId,
      userName: profile?.name,
      type: PostType.Inquiry,
      commonCodeId: selectedCategory?.id,
      commonCodeName: selectedCategory?.name,
      title: title.trim(),
      content: content.replace(/\n/g, "<br />"),
      searchText: content.trim(),
      options: Number(replyOption),
      viewCount: 0,
      attachments: files,
      inlineImageIds: [],
    };

    const result = await Api.Posts.createPost(post);
    setSubmitting(false);

    if (checkApiResult(result)) {
      alert("문의가 등록되었습니다.");
      router.push("/support/inquiry");
    }
  };

  return (
    <>
      <SupportHero
        eyebrow="Inquiry"
        title="문의 작성"
        description="문의 내용을 남겨주시면 담당자가 확인 후 안내드립니다."
      />
      <SupportFrame activeHref="/support/inquiry">
        {!isLoggedIn ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">로그인이 필요합니다.</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">문의 작성은 로그인 후 이용할 수 있습니다.</p>
            <Link href="/login?url=/support/inquiry/write" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white hover:bg-[#03b565]">
              로그인하기
            </Link>
          </div>
        ) : (
          <>
            <SectionTitle
              label="Write"
              title="문의 내용"
              description="업무시간 이후 접수된 문의는 다음 영업일 오전 9시 이후 순차 답변됩니다."
              action={
                <Link href="/support/inquiry" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:border-[#03b565] hover:text-[#03b565]">
                  <ArrowLeft className="h-4 w-4" />
                  목록으로
                </Link>
              }
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-5">
                <label className="grid gap-2">
                  <span className="text-sm font-black text-slate-700">문의유형 <em className="text-red-500 not-italic">*</em></span>
                  <select
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-[#03b565]"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-slate-700">제목 <em className="text-red-500 not-italic">*</em></span>
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="문의 제목을 입력하세요."
                    className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-800 outline-none focus:border-[#03b565]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-slate-700">내용 <em className="text-red-500 not-italic">*</em></span>
                  <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows={10}
                    placeholder="문의 내용을 입력하세요."
                    className="resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold leading-7 text-slate-800 outline-none focus:border-[#03b565]"
                  />
                </label>

                <div className="grid gap-2">
                  <span className="text-sm font-black text-slate-700">답변 알림</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "0", label: "SNS" },
                      { value: "1", label: "이메일" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setReplyOption(option.value)}
                        className={replyOption === option.value ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white" : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-600 hover:border-[#03b565] hover:text-[#03b565]"}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-slate-700">첨부파일</span>
                  <span className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 text-sm font-bold text-slate-500 hover:border-[#03b565] hover:text-[#03b565]">
                    <Paperclip className="h-4 w-4" />
                    {files.length > 0 ? `${files.length}개 파일 선택됨` : "파일을 선택하세요."}
                    <input type="file" multiple className="hidden" onChange={handleFileChange} />
                  </span>
                </label>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <Link href="/support/inquiry" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 px-6 text-sm font-black text-slate-700 hover:bg-slate-50">
                  취소
                </Link>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#03b565] px-6 text-sm font-black text-white disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  문의 등록
                </button>
              </div>
            </div>
          </>
        )}
      </SupportFrame>
    </>
  );
}
