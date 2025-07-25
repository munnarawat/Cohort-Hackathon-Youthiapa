import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bb1 from "../../assets/images/bb-img1.jpg";
import img2 from "../../assets/images/clothes-2.jpg";
import img3 from "../../assets/images/clothes-3.png";
import { IoIosAdd } from "react-icons/io";
import { useRef } from "react";
import Collection from "./Collection";

gsap.registerPlugin(ScrollTrigger);

const NewChapter = () => {
  const titleRef = useRef(null);
  const text = "A New Chapter";
  const paragraph1 = `Born out of Youthiapa, Raised Right is our fresh drop for everyday
  comfort and clean, confident style. But this isn’t just about what
  you wear. It’s about what you stand for. We’re built on respect,
  responsibility, and resilience.`;
  const paragraph2 = `So when you wear Raised Right, you're repping more than style—you're repping values that matter.`;
  const paragraph3 = `No noise. No nonsense. Just daily wear, done right.`;

  useGSAP(() => {
    // Animate each character in the title
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".title-char");
      gsap.from(chars, {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        scrollTrigger: {
          trigger: titleRef.current,
          // markers: true,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      });
    }

    // Animate paragraphs as before
    const paragraphs = [".paragraph-1", ".paragraph-2", ".paragraph-3"];
    paragraphs.forEach((p) => {
      gsap.to(`${p} span`, {
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: p,
          start: "top 90%",
          end: "bottom 70%",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <>
      <div className="section-2 relative h-screen lg:px-[10%] w-full  p-5 ">
        <div
          className="title overflow-hidden flex gap-6 leading-none justify-center"
          ref={titleRef}
        >
          {/* "A" and "New" as separate, "Chapter" as a single word adjacent */}
          <h1
            className="text-center text-4xl lg:text-6xl mt-10 font-montserrat font-bold uppercase flex"
            style={{ gap: "0.15em" }}
          >
            {/* "A" */}
            {"A".split("").map((char, j) => (
              <span key={`a-${j}`} className="title-char inline-block">
                {char}
              </span>
            ))}
          </h1>
          <h1
            className="text-center text-4xl lg:text-6xl mt-10 font-montserrat font-bold uppercase flex"
            style={{ gap: "0.15em" }}
          >
            {/* "New" */}
            {"New".split("").map((char, j) => (
              <span key={`new-${j}`} className="title-char inline-block">
                {char}
              </span>
            ))}
          </h1>
          <h1
            className="text-center text-4xl lg:text-6xl mt-10 font-montserrat font-bold uppercase flex"
            style={{ gap: "0.15em" }}
          >
            {/* "Chapter" */}
            {"Chapter".split("").map((char, j) => (
              <span key={`chapter-${j}`} className="title-char inline-block">
                {char}
              </span>
            ))}
          </h1>
        </div>
        <div className="">
          <p className="paragraph-1 text-center  lg:mt-20 text-2xl mt-10 font-poppins">
            {paragraph1.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-2 opacity-20">
                {word}
              </span>
            ))}
          </p>
          <p className="paragraph-2 text-center  text-2xl mt-10 font-poppins">
            {paragraph2.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-2 opacity-20">
                {word}
              </span>
            ))}
          </p>
          <p className="paragraph-3 text-center text-2xl mt-5 font-poppins">
            {paragraph3.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-2 opacity-20">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
};

export default NewChapter;
