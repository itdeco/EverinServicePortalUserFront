import { Button } from "@/components/ui/button"
import { MessageCircle, Handshake, HeadphonesIcon, ArrowRight } from "lucide-react"

const ctaItems = [
  {
    icon: MessageCircle,
    title: "도입 문의",
    description: "솔루션 도입을 위한 상담 및 데모 신청",
    cta: "상담 신청하기",
    variant: "outline" as const,
  },
  {
    icon: Handshake,
    title: "파트너십",
    description: "리셀러·기술·전략 파트너 모집",
    cta: "파트너 신청",
    variant: "outline" as const,
  },
  {
    icon: HeadphonesIcon,
    title: "고객센터",
    description: "도입 후 전담 CS 및 기술 지원",
    cta: "문의하기",
    variant: "outline" as const,
  },
]

export default function CTASection() {
  return (
    <section className="bg-card py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Main CTA */}
          <div className="mb-16 rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              파트너가 되어주세요
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-pretty text-lg opacity-90">
              에버인의 성장에 함께할 파트너를 모집합니다. 도입 문의부터 파트너십까지, 언제든지
              연결됩니다.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full px-8 text-base font-semibold"
              >
                무료체험 신청하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-base text-primary-foreground hover:bg-primary-foreground/10"
              >
                도입 문의하기
              </Button>
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ctaItems.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col items-center rounded-2xl border border-border/50 bg-background p-6 text-center transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary/20">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>
                <Button variant={item.variant} size="sm" className="rounded-full">
                  {item.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
