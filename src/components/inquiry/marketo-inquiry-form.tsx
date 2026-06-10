"use client"

import Script from "next/script"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

declare global {
  interface Window {
    MktoForms2?: {
      loadForm: (
        baseUrl: string,
        munchkinId: string,
        formId: number,
        callback?: () => void
      ) => void
    }
  }
}

const MARKETO_BASE_URL = "https://664-QQR-840.mktoweb.com"
const MARKETO_MUNCHKIN_ID = "664-QQR-840"
const EVERTIME_FORM_ID = 2152
const PAYROLL_FORM_ID = 2522

export default function MarketoInquiryForm() {
  const searchParams = useSearchParams()
  const [isScriptReady, setIsScriptReady] = useState(false)
  const [hasLoadError, setHasLoadError] = useState(false)

  const formId = useMemo(() => {
    return searchParams.get("type") === "1" ? PAYROLL_FORM_ID : EVERTIME_FORM_ID
  }, [searchParams])

  useEffect(() => {
    if (!isScriptReady || !window.MktoForms2) {
      return
    }

    const formElement = document.getElementById(`mktoForm_${formId}`)
    if (!formElement) {
      return
    }

    formElement.innerHTML = ""
    setHasLoadError(false)

    try {
      window.MktoForms2.loadForm(MARKETO_BASE_URL, MARKETO_MUNCHKIN_ID, formId)
    } catch {
      setHasLoadError(true)
    }
  }, [formId, isScriptReady])

  return (
    <>
      <Script
        src={`${MARKETO_BASE_URL}/js/forms2/js/forms2.min.js`}
        strategy="afterInteractive"
        onReady={() => setIsScriptReady(true)}
        onError={() => setHasLoadError(true)}
      />
      <div className="flex min-h-[360px] w-full flex-col items-center">
        <form id={`mktoForm_${formId}`} className="w-full max-w-[720px]" />
        {!isScriptReady && !hasLoadError ? (
          <p className="mt-8 text-sm font-medium text-slate-500">문의 양식을 불러오는 중입니다.</p>
        ) : null}
        {hasLoadError ? (
          <div className="mt-8 rounded-lg border border-red-100 bg-red-50 px-5 py-4 text-center text-sm font-medium text-red-700">
            문의 양식을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </div>
        ) : null}
      </div>
    </>
  )
}
