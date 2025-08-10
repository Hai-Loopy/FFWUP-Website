export default function Hero() {
  return (
    <section className="relative bg-black">
      <div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="lg:mask-r-from-50% lg:mask-l-from-50% lg:mask-b-from-50% lg:mask-t-from-50% mask-r-from-30% mask-l-from-30% brightness-50  bg-black object-cover w-full h-screen"
        >
          <source src="/media/ocean.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-5xl">
        <h1 className="lg:text-8xl text-5xl font-bold tracking-wide mb-7 text-[#facfa4] text-shadow-lg/50 uppercase">
          Deepen Your Faith
        </h1>
        <h2 className="lg:text-3xl text-xl tracking-tight mb-10 text-white text-shadow-lg/35">
          Build A Family On
          True Love
        </h2>
        <a
          href="#contact"
          className="border-white border-2 text-white lg:py-3 py-2 lg:px-8 px-4 rounded-full lg:text-xl text-lg font-semibold mt-6 hover:bg-white hover:text-black transition-colors duration-300"
        >
          Join Us
        </a>
      </div>
    </section>
  );
}
