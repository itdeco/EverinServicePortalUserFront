"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { FileSignature, RefreshCcw, DoorOpen, Settings2, type LucideIcon } from "lucide-react"
import { COLORS } from "@/constants/brand-colors"

type NavItem = {
  id: string
  label: string
  Icon: LucideIcon
}

const items: NavItem[] = [
  { id: "electronic-contract", label: "전자계약", Icon: FileSignature },
  { id: "integration", label: "연동서비스", Icon: RefreshCcw },
  { id: "access-control", label: "출입관리시스템", Icon: DoorOpen },
  { id: "setup", label: "SetUp/추가개발", Icon: Settings2 },
]

export default function AddOnAnchorNav() {
  const navRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [active, setActive] = useState<string>(items[0].id)

  const getScrollOffset = useCallback(() => {
    const headerHeight = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--site-header-height"),
    ) || 104
    return headerHeight + (navRef.current?.offsetHeight || 64)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + getScrollOffset() + 40
      let current = items[0].id
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= scrollPos) {
          current = item.id
        }
      }
      setActive(current)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [getScrollOffset])

  useEffect(() => {
    const container = scrollContainerRef.current
    const activeItem = itemRefs.current[active]
    if (!container || !activeItem || container.scrollWidth <= container.clientWidth) return

    const containerRect = container.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()
    const left =
      container.scrollLeft +
      itemRect.left -
      containerRect.left -
      (container.clientWidth - itemRect.width) / 2

    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" })
  }, [active])

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    setActive(id)
    const top = el.getBoundingClientRect().top + window.scrollY - getScrollOffset()
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <nav
      ref={navRef}
      className="sticky z-40 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70"
      style={{ top: "var(--site-header-height, 104px)" }}
    >
      <div
        ref={scrollContainerRef}
        className="mx-auto flex max-w-[1280px] items-center gap-2 overflow-x-auto px-4 py-3 lg:justify-center lg:px-12"
      >
        {items.map((item) => {
          const isActive = active === item.id
          const Icon = item.Icon
          return (
            <a
              key={item.id}
              ref={(element) => {
                itemRefs.current[item.id] = element
              }}
              href={`#${item.id}`}
              onClick={handleClick(item.id)}
              className="flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all md:px-5 md:text-[15px]"
              style={{
                backgroundColor: isActive ? COLORS.people : "#fff",
                color: isActive ? "#fff" : "#475569",
                borderColor: isActive ? COLORS.people : "#e2e8f0",
                boxShadow: isActive ? "0 10px 24px rgba(3,181,101,0.24)" : undefined,
              }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
