import Image from "next/image";

export default function IconGridSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="relative w-full h-80">
          <Image
            src="/images/contents/everWorks/bg-EverWorks-05.png"
            alt="기능 아이콘"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
