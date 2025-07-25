import React, { useRef } from "react";
import { Link } from "react-router-dom";
import bb from "../../assets/images/bhuvan-2.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/action/authAction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Register = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Refs for GSAP animation
  const imageSectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  // Cool animation for image section
  useGSAP(() => {
    if (imageSectionRef.current && textRef.current && imgRef.current) {
      // Animate background gradient
      gsap.fromTo(
        imageSectionRef.current,
        { background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)" },
        {
          background:
            "linear-gradient(135deg, #ff6a00 0%, #ee0979 50%, #1e3c72 100%)",
          duration: 1.2,
          ease: "power2.inOut",
        }
      );
      // Animate text: fade in, scale up, slide from left
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -80, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
      // Animate image: fade in, slide up, rotate
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, y: 80, rotate: -15, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }
  }, []);

  const ResisterHandler = (data) => {
    dispatch(registerUser(data.email, data.password));
    reset();
  };

  return (
    <div className="w-full lg:mt-0 p-2 lg:p-10 ">
      <div className="border border-[#897cec] p-2 log-in-conatiner gap-1 flex w-full h-full overflow-hidden rounded-2xl">
        {/* image section */}
        <div
          className="image-section w-1/2 hidden p-2 md:flex rounded-xl overflow-hidden relative"
          ref={imageSectionRef}
          style={{
            background:
              "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            transition: "background 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <h1
            className="text-7xl font-montserrat w-1/2"
            ref={textRef}
            style={{ opacity: 0 }}
          >
            Be a part of Youthiapa’s Story
          </h1>
          <div className="-translate-x-1/2 w-full bottom-0 absolute left-1/2">
            <img
              className="w-full h-full object-cover"
              src={bb}
              alt=""
              ref={imgRef}
              style={{ opacity: 0 }}
            />
          </div>
        </div>
        {/* from section */}
        <div className="from-section rounded-xl bg-[#1C1D20] w-full md:w-1/2 flex flex-col gap-4 px-2 py-2 ">
          <h1 className="text-4xl font-montserrat text-center">
            Create An Account
          </h1>
          <form
            onSubmit={handleSubmit(ResisterHandler)}
            className="w-full font-manrope flex flex-col gap-6 px-6 "
          >
            {/* username */}
            <div className="platform flex hover-effect flex-col px-3 py-1 rounded-xl border-[1px] border-[#897cec] duration-300">
              <label className="font-manrope font-extralight ">
                Username
              </label>
              <input
                {...register("username")}
                className="p-2 outline-0 border-none"
                type="text"
              />
            </div>
            {/* email */}
            <div className="platform flex hover-effect flex-col px-3 py-1 rounded-xl border-[1px] border-[#897cec] duration-300">
              <label className="font-manrope font-extralight ">
                Email Address
              </label>
              <input
                {...register("email")}
                className="p-2 outline-0 border-none"
                type="email"
              />
            </div>
            {/* password*/}
            <div className="platform flex hover-effect flex-col px-3 py-1 rounded-xl border-[1px] border-[#897cec] duration-300">
              <label className="font-manrope font-extralight ">Password</label>
              <input
                {...register("password")}
                className="p-2 outline-0 border-none"
                type="password"
              />
            </div>
            {/*register */}
            <button
              type="submit"
              className="mt-2 bg-[#5641F3] font-bold py-2 px-4 rounded-xl hover:bg-[#5641f3b0] transition-colors duration-200 font-poppins"
            >
              {loading ? "Loading..." : "Register"}
            </button>
            <h2 className="text-center text-xl">Or</h2>
          </form>
          {/* alredy have account */}
          <div className="mt-4 text-center">
            <span className="font-manrope text-sm text-gray-400">
              I have an account?{" "}
            </span>
            <Link
              to="/Login"
              className="text-[#897cec] font-manrope font-semibold hover:underline"
            >
              Log IN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
