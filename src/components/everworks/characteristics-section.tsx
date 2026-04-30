import Image from "next/image";

export default function CharacteristicsSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Circle 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-64 h-64 mb-6">
              <Image
                src="/images/contents/everWorks/bg-EverWorks-07.png"
                alt="Teams Shared AI Platform"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Circle 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-64 h-64 mb-6">
              <Image
                src="/images/contents/everWorks/bg-EverWorks-08.png"
                alt="Hybrid 협업"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Circle 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-64 h-64 mb-6">
              <Image
                src="/images/contents/everWorks/bg-EverWorks-09.png"
                alt="보안 및 백업"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
