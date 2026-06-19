"use client"

import { useEffect, useMemo, useRef } from "react"
import { Download } from "lucide-react"
import { Api } from "@/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ServiceType, ThumbnailPostDto } from "@/types/Posts"

type Props = {
  story: ThumbnailPostDto | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EverStoryModal({ story, open, onOpenChange }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const logoSrc = story?.serviceType === ServiceType.EverPayroll
    ? "/images/header/ever-person-logo.png"
    : "/images/header/ever-person-logo.png"

  const iframeContent = useMemo(() => {
    const content = story?.content || story?.searchText || ""

    return `
      <html lang="ko">
        <head>
          <style>
            body {
              margin: 0;
              color: #334155;
              font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              font-size: 15px;
              line-height: 1.75;
              overflow-x: auto;
              overflow-y: hidden;
            }

            img {
              max-width: 100%;
              height: auto;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            a {
              color: #2563eb;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div>${content}</div>
        </body>
      </html>
    `
  }, [story])

  const resizeIframe = () => {
    const iframe = iframeRef.current
    const iframeDocument = iframe?.contentDocument

    if (!iframe || !iframeDocument) {
      return
    }

    iframe.style.height = `${iframeDocument.body.scrollHeight + 32}px`
  }

  useEffect(() => {
    window.addEventListener("resize", resizeIframe)
    return () => window.removeEventListener("resize", resizeIframe)
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[86vh] max-w-[calc(100%-2rem)] overflow-y-auto p-0 sm:max-w-4xl">
        <DialogHeader className="border-b px-6 pb-5 pt-6 text-left">
          <img src={logoSrc} alt="Everin" className="mb-5 h-10 w-auto object-contain" />
          <DialogTitle className="text-2xl font-black leading-tight text-slate-900">
            {story?.title}
          </DialogTitle>
          <DialogDescription className="text-base font-semibold text-slate-500">
            {story?.corporationName}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          <iframe
            ref={iframeRef}
            srcDoc={iframeContent}
            title={story?.title || "HR Hub content"}
            onLoad={resizeIframe}
            className="mt-6 w-full border-0"
          />

          {story?.attachments && story.attachments.length > 0 ? (
            <div className="mt-8 rounded-lg border bg-slate-50 p-4">
              <h3 className="mb-3 text-sm font-bold text-slate-700">첨부파일</h3>
              <div className="flex flex-col gap-2">
                {story.attachments.map((file) => (
                  <Button
                    key={file.id}
                    type="button"
                    variant="outline"
                    className="justify-start bg-white"
                    onClick={() => {
                      if (story.id && file.id && file.originalName) {
                        Api.Files.downloadThumbnailPostAttachment(story.id, file.id, file.originalName)
                      }
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {file.originalName}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
