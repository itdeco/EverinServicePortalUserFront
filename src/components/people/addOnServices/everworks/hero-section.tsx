"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
      <section
          className="relative overflow-hidden min-h-[760px] lg:min-h-175"
          style={{
            backgroundImage: `url('/images/people/bg/bg-people-hero-00.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
      >
        <div className="mx-auto max-w-[1280px] px-3 lg:px-3">
          <div className="flex flex-col lg:flex-row items-center justify-between pt-14 pb-10 lg:pt-15 lg:pb-12 gap-4 lg:gap-16 min-w-0">

            {/* Left: Text Content */}
            <div className="w-full lg:w-[400px] shrink-0 z-20 hero-fade-up text-center lg:text-left">
              <p className="text-gray-600 text-base md:text-lg mb-4 text-center lg:text-left">
                업무의 시작부터 소통의 완성까지
              </p>

              <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[45px] font-black text-gray-900 leading-tight mb-6 whitespace-nowrap">
                하나로 흐르는 그룹웨어
                <br />
                <span className="text-[#00dcaa]">에버웍스</span>
              </h1>

              <p className="text-gray-500 text-base leading-relaxed mb-8">
                근태 · 급여 · ERP가 하나로 흐르는 경험.<br />
                데이터 파편화 없는 HR-Native 그룹웨어,<br />
                EverWorks
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                    asChild
                    size="lg"
                    className="text-white px-8 h-14 text-base font-semibold rounded-full border-0"
                    style={{ background: "linear-gradient(135deg, #4B6BF5 0%, #00cc99 100%)" }}
                >
                  <Link href="/trial">무료체험 시작하기</Link>
                </Button>

                <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border border-[#00cc99] bg-white text-gray-700 px-8 h-14 text-base font-semibold rounded-full hover:bg-[#f0fdf9]"
                >
                  <Link href="/support/inquiry">도입 문의하기</Link>
                </Button>
              </div>
            </div>

            {/* Right: EverWorks Image */}
            <div className="relative w-full shrink-0 h-[260px] sm:h-[360px] lg:flex-1 lg:min-w-0 lg:h-[620px] overflow-visible lg:overflow-hidden z-10 mt-6 lg:mt-0">
              <Image
                  src="/images/people/addOnServices/everworks/bg/bg-EverWorks-hero-01.png"
                  alt="에버웍스 화면"
                  fill
                  className="object-contain object-center scale-100 lg:object-right lg:scale-[1.45] lg:translate-x-[18%]"
                  priority
              />
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-fade-up {
          animation: fadeUp 0.8s ease-out both;
        }
      `}</style>
      </section>
  )
}
