import Image from "next/image"

const growthBenefits = [
  { icon: "/images/people/smartWorkCare/welcoming/icon/icon-org-01.svg",
    title: "입사자 교육 비용과",
    subtitle: "시간 절감"
  },
  { icon: "/images/people/smartWorkCare/welcoming/icon/icon-org-02.svg",
    title: "온보딩 프로세스의",
    subtitle: "표준화 및 효율성 증대"
  },
  { icon: "/images/people/smartWorkCare/welcoming/icon/icon-org-03.svg",
    title: "신입 구성원의 빠른 적응으로",
    subtitle: "조직 성과 향상"
  },
  { icon: "/images/people/smartWorkCare/welcoming/icon/icon-org-04.svg",
    title: "조직 몰입도와 충성도 향상,",
    subtitle: "이직률 감소"
  },
]

const onboardingValues = [
  { icon: "/images/people/smartWorkCare/welcoming/icon/icon-future-01.svg", title: "복잡한 온보딩 과정을", subtitle: "SaaS 기반으로 간단히 자동화" },
  { icon: "/images/people/smartWorkCare/welcoming/icon/icon-future-02.svg", title: "우리 회사의 특성에 맞게", subtitle: "콘텐츠와 프로세스를 자유롭게 커스터마이징" },
  { icon: "/images/people/smartWorkCare/welcoming/icon/icon-future-03.svg", title: "누구나 손쉽게 사용할 수 있도록", subtitle: "직관적으로 설계된 사용자 경험 제공" },
]

export default function WelcomingBenefitsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* 사람의 적응, 조직의 성장 */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            사람의 적응, 조직의 성장
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-10">
            새로운 직원이 조직에 자연스럽게 녹아드는 순간, 성장의 속도도 달라집니다.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {growthBenefits.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-5 md:p-8 rounded-2xl bg-gray-50 border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                >
                  <span className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00cc99]/15 to-[#00cc99]/5 mb-5">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </span>
                  <p className="text-base text-gray-800 font-semibold leading-relaxed">
                    {item.title}<br />{item.subtitle}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* 온보딩, 작은 시작이 큰 미래를 만듭니다 */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            온보딩, 작은 시작이 큰 미래를 만듭니다
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-10">
            신규 입사자의 첫 경험이 조직 전체의 미래를 좌우합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {onboardingValues.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col items-start p-8 rounded-2xl bg-gradient-to-br from-[#f3fbff] via-white to-[#eafff8] border border-gray-100 min-h-[220px] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm mb-5">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={42}
                      height={42}
                      className="object-contain"
                    />
                  </span>
                  <p className="text-lg text-gray-900 font-semibold leading-relaxed">
                    {item.title}<br />{item.subtitle}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
