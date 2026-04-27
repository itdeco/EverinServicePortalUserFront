"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Receipt, UserCircle, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    icon: CreditCard,
    label: "구독정보",
    href: "/mypage/subscription",
  },
  {
    icon: Receipt,
    label: "청구요금 및 납부내역",
    href: "/mypage/payment",
  },
  {
    icon: UserCircle,
    label: "계정정보",
    href: "/mypage/account",
  },
]

export default function MypageSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24">
        {/* My Page 타이틀 */}
        <h2 className="text-2xl font-bold mb-6">My Page</h2>

        {/* 메뉴 */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* 고객센터 */}
        <div className="mt-10 pt-6 border-t">
          <h3 className="text-sm font-semibold text-primary mb-4">고객센터</h3>
          <div className="space-y-2">
            <p className="text-xl font-bold">02-2093-3226</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                평일 오전 9시 ~ 오후 6시
              </p>
              <p className="flex items-center gap-1.5 text-primary">
                <span className="w-1 h-1 rounded-full bg-primary" />
                토요일 및 공휴일 제외
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
