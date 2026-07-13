"use client"

import Image from "next/image"

const clients = [
    {logo: "client_logo_01.png" },
    {logo: "client_logo_03.png" },
    {logo: "client_logo_04.png" },
    {logo: "client_logo_05.png" },
    {logo: "client_logo_07.png" },
    {logo: "client_logo_08.png" },
    {logo: "client_logo_09.png" },
    {logo: "client_logo_10.png" },
    {logo: "client_logo_11.png" },
    {logo: "client_logo_13.png" },
    {logo: "client_logo_14.png" },
    {logo: "client_logo_15.png" },
    {logo: "client_logo_16.png" },
    {logo: "client_logo_17.png" },
    {logo: "client_logo_18.png" },
    {logo: "client_logo_19.png" },
    {logo: "client_logo_20.png" },
    {logo: "client_logo_21.png" },
    {logo: "client_logo_22.png" },
    {logo: "client_logo_23.png" },
    {logo: "client_logo_24.png" },
    {logo: "client_logo_25.png" },
    {logo: "client_logo_26.png" },
    {logo: "client_logo_27.png" },
    {logo: "client_logo_28.png" },
    {logo: "client_logo_29.png" },
    {logo: "client_logo_30.png" },
    {logo: "client_logo_31.png" },
    {logo: "client_logo_32.png" },
    {logo: "client_logo_33.png" },
    {logo: "client_logo_34.png" },
    {logo: "client_logo_35.png" },
    {logo: "client_logo_36.svg" }
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
                            key={`${client.logo}-${index}`}
                            className="flex-shrink-0 mx-3 flex items-center justify-center"
                        >
                            <div className="h-10 min-w-[120px] flex items-center justify-center">
                                <Image
                                    src={`/images/client_logo/${client.logo}`}
                                    alt={client.logo}
                                    width={120}
                                    height={40}
                                    className="max-h-7 max-w-[120px] w-auto object-contain opacity-90 md:opacity-70 md:hover:opacity-100 md:hover:scale-105 transition-all duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translate3d(0,0,0);
                    }
                    100% {
                        transform: translate3d(-50%,0,0);
                    }
                }

                .animate-scroll {
                    animation: scroll 12s linear infinite;
                    will-change: transform;
                }

                @media (max-width: 768px) {
                    .animate-scroll {
                        animation: scroll 15s linear infinite;
                    }
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    )
}