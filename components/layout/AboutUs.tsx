import Image from "next/image";

export default function AboutUs() {
  return (
    <section id="about-us" className="bg-white py-16">
      <h1 className="text-[#a89076] text-shadow-lg/12 lg:text-6xl text-4xl font-bold text-center lg:mb-10 mb-5 uppercase">
        About Us
      </h1>
      <div className="lg:w-24 w-16 bg-[#a89076]  text-shadow h-1 flex lg:flex-row flex-col justify-between mx-auto lg:mb-24 mb-12"></div>
      <div className="flex flex-col md:flex-row items-center mx-auto max-w-[90rem] px-4">
        <Image
          src="/about-us/acerca-de-nosotros.we"
          loading="lazy"
          alt="About Us"
          className="h-auto lg:w-[64rem] w-[25rem] rounded-full lg:mr-8 mr-0 lg:mb-0 mb-8"
          width={500}
          height={500}
        />
        <div className="w-3/5 text-center">
          <h1 className="text-black text-2xl lg:text-4xl font-bold mb-4">
            
          </h1>
          <p className="text-gray-500 lg:text-lg text-sm mb-4">
            
          </p>
          <p className="text-gray-500 lg:text-lg text-sm mb-4">
            
          </p>
          <p className="text-gray-500 lg:text-lg text-sm">
            
          </p>
        </div>
      </div>
    </section>
  );
}
