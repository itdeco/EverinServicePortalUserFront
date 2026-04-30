"use client"

import Image from "next/image"

const clients = [
    { name: "올리브인터내셔널", logo: "client_logo.svg" },
    { name: "공차", logo: "client_logo_2.svg" },
    { name: "그리드위즈", logo: "client_logo_3.svg" },
    { name: "논픽션", logo: "client_logo_4.svg" },
    { name: "미쓰비시 케미칼 어드밴스드 머티리얼즈", logo: "client_logo_5.svg" },
    { name: "바오스", logo: "client_logo_6.svg" },
    { name: "서울향료", logo: "client_logo_7.svg" },
    { name: "세종학당재단", logo: "client_logo_8.svg" },
    { name: "스타메드", logo: "client_logo_9.svg" },
    { name: "알피스페이스", logo: "client_logo_10.svg" },
    { name: "앤씨앤", logo: "client_logo_11.svg" },
    { name: "에스제이듀코", logo: "client_logo_12.svg" },
    { name: "에이로봇", logo: "client_logo_13.svg" },
    { name: "에이스트", logo: "client_logo_14.svg" },
    { name: "에이치비솔루션", logo: "client_logo_15.svg" },
    { name: "에이치알자산운용", logo: "client_logo_16.svg" },
    { name: "에이치앤이루자", logo: "client_logo_17.svg" },
    { name: "엑소코바이오", logo: "client_logo_18.svg" },
    { name: "연우", logo: "client_logo_19.svg" },
    { name: "오토리브", logo: "client_logo_20.svg" },
    { name: "이엔플러스", logo: "client_logo_21.svg" },
    { name: "잉글우드랩코리아", logo: "client_logo_22.svg" },
    { name: "재세능원", logo: "client_logo_23.svg" },
    { name: "저스템", logo: "client_logo_24.svg" },
    { name: "지역난방플러스", logo: "client_logo_25.svg" },
    { name: "캐럿글로벌", logo: "client_logo_26.svg" },
    { name: "코스메카코리아", logo: "client_logo_27.svg" },
    { name: "코스포영남파워", logo: "client_logo_28.svg" },
    { name: "테이팩스", logo: "client_logo_29.svg" },
    { name: "텔스타", logo: "client_logo_30.svg" },
    { name: "파워마스터반도체", logo: "client_logo_31.svg" },
    { name: "팜에이트", logo: "client_logo_32.svg" },
    { name: "페더럴모굴", logo: "client_logo_33.svg" },
    { name: "한독", logo: "client_logo_34.svg" },
    { name: "한스바이오메드", logo: "client_logo_35.svg" },
    { name: "윈윈스포츠", logo: "client_logo_36.svg" },
]

export function ClientLogos() {
    return (
        <section className="py-2 bg-white border-y border-gray-100 overflow-hidden">
            <div className="relative">

                {/* 좌우 fade */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* 로고 흐름 */}
                <div className="flex animate-scroll">
                    {[...clients, ...clients].map((client, index) => (
                        <div
                            key={`${client.name}-${index}`}
                            className="flex-shrink-0 mx-3 flex items-center justify-center"
                        >
                            <div className="h-10 min-w-[120px] flex items-center justify-center">
                                <Image
                                    src={`/images/client_logo/${client.logo}`}
                                    alt={client.name}
                                    width={120}
                                    height={40}
                                    className="
                    max-h-7 max-w-[120px] w-auto object-contain
                    opacity-90 md:opacity-70
                    md:hover:opacity-100
                    md:hover:scale-105
                    transition-all duration-300
                  "
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }

                @media (max-width: 768px) {
                    .animate-scroll {
                        animation: scroll 25s linear infinite;
                    }
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    )
}