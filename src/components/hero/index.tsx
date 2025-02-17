import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="hero"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(55, 88, 249, 0.6), rgb(55, 88, 249)), url('https://i1.pickpik.com/photos/456/973/70/crowd-concert-smoke-people-preview.jpg')",
          backgroundSize: "cover",
        }}
        className="relative overflow-hidden bg-primary h-screen flex items-center"
      >
        <div className="container">
          <div className="-mx-4 flex lg:flex-row flex-col items-center">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] flex flex-col sm:items-center md:items-center lg:items-start"
                data-wow-delay=".2s"
              >
                <h1 className="mb-8 sm:text-center md:text-center lg:text-left text-4xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-7xl lg:leading-[1.2]">
                  The Ultimate Personalized Music Game
                </h1>
                <p className="mb-12 sm:text-center md:text-center lg:text-left max-w-[600px] text-base font-medium text-white sm:text-lg">
                  Create your own music game in seconds with our easy-to-use online tool. Design custom cards with QR codes linked to your favorite tracks, and let the companion app bring the game to life by playing the music instantly. Perfect for any occasion!
                </p>
                <ul className="mb-10">
                  <li>
                    <Link
                      href="/create-playlist"
                      className="inline-flex font-bold items-center justify-center rounded-md bg-secondary px-7 py-[12px] text-center text-base text-white shadow-1 transition duration-300 ease-in-out hover:bg-[#0BB489]"
                    >
                      <h2>Start now !</h2>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full px-4">
              <div
                className="wow fadeInUp relative z-10 mx-auto max-w-[845px]"
                data-wow-delay=".25s"
              >
                <div className="mt-28 mb-32">
                  <Image
                    src="timeline.svg"
                    alt="hero"
                    className="mx-auto max-w-full rounded-t-xl rounded-tr-xl"
                    width={945}
                    height={916}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
