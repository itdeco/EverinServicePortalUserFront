export default function IconGridSection() {
  const icons = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {icons.map((icon) => (
            <div
              key={icon}
              className="h-24 rounded-xl bg-[#00dcaa] flex items-center justify-center text-white font-bold text-lg hover:shadow-lg transition-shadow"
            >
              E{icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
