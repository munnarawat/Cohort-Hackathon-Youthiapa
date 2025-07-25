import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import bb2 from "../../assets/images/bb-img-2.png";
import Footer from "../pages/Footer";

gsap.registerPlugin(ScrollTrigger);

const aboutParagraphs = [
  "We started as friends, just a couple of curious minds with a love for creativity, storytelling, and building things from the ground up. In our early twenties, that passion took shape as Youthiapa—a merchandise brand that grew hand-in-hand with Bhuvan’s journey on YouTube. As his content began connecting with millions, Youthiapa became more than just merch. It became a symbol of community, relatability, and youthful energy.",
  "But like all things, we evolved.",
  "Over time, we began to feel a deeper pull towards something more intentional. We didn’t just want to chase trends; we wanted to stand for something. We wanted to create a brand that looked good and felt right. One that had purpose stitched into every piece.",
  "That search brought us home to the values we grew up with. And that’s how Raised Right came to life.",
  "Raised Right is a celebration of being grounded yet bold, expressive yet effortless. It’s about wearing your values, feeling confident in your skin, and staying true to who you are.",
  "Because at the end of the day, it’s not just about what you wear—it’s about what you stand for.",
];

const bbHeading = "One Guy. Many Characters. One Legend: BB Ki Kahani";
const bbText =
  "Bhuvan Bam is the creative force behind Youthiapa. Starting his journey as a YouTuber with his iconic channel “BB Ki Vines”, he quickly became one of India’s most loved digital creators. But Bhuvan is more than just a content creator — he's a singer, actor, comedian, and an inspiration to millions. From making videos with his phone in his bedroom to performing live on global stages, Bhuvan’s journey represents the voice of the youth — raw, real, and relatable. His vision gave birth to Youthiapa — a brand that celebrates originality, desi swag, and self-expression.";

const characterSpots = [
  {
    name: "Titu Mama",
    style: "top-[65%] left-[10%]",
    gradient: "from-pink-500 via-yellow-400 to-yellow-200",
    icon: "🕶️",
  },
  {
    name: "Sameer",
    style: "top-[15%] left-[60%]",
    gradient: "from-blue-500 via-cyan-400 to-yellow-200",
    icon: "😎",
  },
  {
    name: "Banchoddas",
    style: "top-[10%] left-[28%]",
    gradient: "from-green-500 via-lime-400 to-yellow-200",
    icon: "🤓",
  },
  {
    name: "Titu-mama",
    style: "top-[40%] left-[12%]",
    gradient: "from-fuchsia-500 via-pink-400 to-yellow-200",
    icon: "🧔",
  },
  {
    name: "Bhuvan bam",
    style: "top-[40%] left-[35%]",
    gradient: "from-yellow-400 via-orange-400 to-pink-400",
    icon: "🎤",
  },
  {
    name: "Janki",
    style: "top-[50%] left-[65%]",
    gradient: "from-rose-400 via-pink-400 to-yellow-200",
    icon: "👩",
  },
  {
    name: "Babloo Ji",
    style: "top-[40%] left-[80%]",
    gradient: "from-indigo-500 via-blue-400 to-yellow-200",
    icon: "👨‍🦳",
  },
];

const About = () => {
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const paraRefs = useRef([]);
  // BB Story Section Refs
  const bbHeadingRefs = useRef([]);
  const bbImageRef = useRef(null);
  const bbTextRef = useRef(null);

  useGSAP(() => {
    // Heading animation (scrub)
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }
    // Subheading animation (scrub)
    if (subHeadingRef.current) {
      gsap.fromTo(
        subHeadingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subHeadingRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    }
    // Paragraphs animation (scrub)
    paraRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      }
    });
    // BB Heading Split Animation (scrub)
    if (bbHeadingRefs.current.length) {
      gsap.fromTo(
        bbHeadingRefs.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bbHeadingRefs.current[0]?.parentNode,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    }
    // BB Image Animation (scrub)
    if (bbImageRef.current) {
      gsap.fromTo(
        bbImageRef.current,
        { scale: 0.85, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bbImageRef.current,
            start: "top 95%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }
    // BB Text Animation (scrub)
    if (bbTextRef.current) {
      gsap.fromTo(
        bbTextRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bbTextRef.current,
            start: "top 98%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const renderBBHeading = () => {
    // Split by words,
    const words = bbHeading.split(" ");
    return words.map((word, i) => {
      const display = i < words.length - 1 ? word + " " : word;
      return (
        <span
          key={i}
          ref={(el) => (bbHeadingRefs.current[i] = el)}
          className="inline-block"
          style={{
            willChange: "transform, opacity",
            whiteSpace: "pre",
          }}>
          {display}
        </span>
      );
    });
  };

  // Custom cool tooltip for character spots
  const CharacterSpot = ({ name, style, gradient, icon }) => (
    <div
      className={`absolute ${style} w-20 h-24 hover:cursor-pointer group z-20`}
      style={{}}>
      {/* Cool Tooltip */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 -top-12
          opacity-0 group-hover:opacity-100 group-hover:-translate-y-2
          transition-all duration-300
          pointer-events-none
          flex flex-col items-center
        `}
        style={{
          zIndex: 30,
        }}>
        <div
          className={`
            px-4 py-2 rounded-xl shadow-xl
            bg-gradient-to-br ${gradient}
            text-white font-bold text-base
            border-2 border-yellow-300
            flex items-center gap-2
            animate-pulse group-hover:animate-none
            backdrop-blur-md
            drop-shadow-lg
            transition-all duration-300
            scale-90 group-hover:scale-105
            ring-2 ring-yellow-200/60
          `}
          style={{
            boxShadow: "0 4px 24px 0 rgba(250,204,21,0.18)",
            letterSpacing: "0.03em",
            filter: "drop-shadow(0 2px 12px #facc15cc)",
          }}>
          <span className="text-xl">{icon}</span>
          <span className="font-montserrat tracking-wide">{name}</span>
        </div>
        {/* Tooltip Arrow */}
        <div
          className="w-4 h-4 mt-[-6px] rotate-45 bg-yellow-300/80 shadow-lg"
          style={{
            border: "2px solid #fde68a",
            marginTop: "-6px",
            zIndex: 31,
          }}></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen w-full px-2">
        <div className="w-full flex flex-col items-center px-4 py-16">
          <div className="w-full max-w-3xl flex flex-col items-center">
            <h1
              ref={headingRef}
              className="text-5xl md:text-7xl font-extrabold font-montserrat text-yellow-400 mb-4 drop-shadow-lg text-center tracking-tight bg-clip-text"
              style={{
                textShadow: "0 4px 24px #facc15, 0 1px 0 #fff",
                letterSpacing: "0.04em",
              }}>
              Read Our Journey
            </h1>
            <h2
              ref={subHeadingRef}
              className="text-2xl md:text-4xl font-bold font-montserrat  mb-10 text-center tracking-wide bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent ">
              BB Ki Vines Se Youthiapa Tak: Ek Unfiltered Safar
            </h2>
            <div className="w-full flex flex-col gap-8">
              {aboutParagraphs.map((text, idx) => (
                <div
                  key={idx}
                  ref={(el) => (paraRefs.current[idx] = el)}
                  className={`relative group transition-all duration-300`}>
                  <div className="absolute -left-4 top-2 h-16 w-1 bg-gradient-to-b from-yellow-400 to-yellow-200 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300 hidden md:block"></div>
                  <p
                    className="text-lg md:text-2xl text-gray-100 font-poppins leading-relaxed text-justify md:text-left px-2 md:px-6 py-4 rounded-xl bg-zinc-800/70 shadow-lg border-l-4 border-yellow-400 hover:scale-[1.025] transition-transform duration-300"
                    style={{
                      backdropFilter: "blur(2px)",
                      boxShadow: "0 6px 32px 0 rgba(250,204,21,0.08)",
                    }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* BB Story Section */}
        <div className="bhuvan_bam_story w-full mt-20 min-h-[70vh] md:min-h-screen px-0 md:px-0 py-0 md:py-0 relative z-10 flex flex-col">
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center w-full px-2 md:px-10 py-10 gap-6 md:gap-10">
            <h1
              className="font-montserrat text-center leading-tight mx-auto text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-6"
              style={{
                letterSpacing: "0.01em",
                lineHeight: "1.2",
                textShadow: "0 2px 16px #facc15, 0 1px 0 #fff",
                wordBreak: "break-word",
                flexWrap: "wrap",
              }}>
              {renderBBHeading()}
            </h1>
          </div>
          {/* Full Width Image */}
          <div
            className="image-bb font-poppins relative w-full h-[320px]  sm:h-[400px] lg:w-[90%] md:h-[520px] lg:h-[100vh] rounded-md md:rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-yellow-400/20 via-zinc-900/60 to-yellow-200/10 flex items-center justify-center"
            style={{
              margin: "0 auto",
              // width: "100%",
              maxWidth: "100%",
              minHeight: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            ref={bbImageRef}>
            <img
              className="w-full h-full object-cover object-center transition-all duration-500"
              src={bb2}
              alt="Bhuvan Bam"
              style={{
                borderRadius: "0",
                boxShadow: "0 8px 32px 0 rgba(250,204,21,0.13)",
                background: "linear-gradient(135deg, #facc15 0%, #fffbe6 100%)",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-yellow-400/10 via-transparent to-yellow-200/0 md:rounded-2xl"></div>
            {/* Character Spots with Cool Tooltip */}
            {characterSpots.map((spot, idx) => (
              <React.Fragment key={spot.name}>
                <CharacterSpot {...spot} />
              </React.Fragment>
            ))}
          </div>
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center w-full px-2 md:px-10 py-10 gap-6 md:gap-10">
            <section
              ref={bbTextRef}
              className="text-section w-full md:w-4/5 max-w-2xl bg-zinc-800/80 rounded-2xl shadow-2xl border-l-4 border-yellow-400 px-4 md:px-8 py-6 mt-2 mb-2 md:mb-0 transition-all duration-300"
              style={{
                backdropFilter: "blur(3px)",
                boxShadow: "0 8px 32px 0 rgba(250,204,21,0.10)",
              }}>
              <p className="text-lg md:text-2xl font-poppins text-gray-100 leading-relaxed text-justify md:text-left">
                {bbText}
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
