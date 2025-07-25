import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import bb from "../../assets/images/bhuvan-2.png";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/action/authAction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const GoogleIcon = () => (
  <span
    style={{
      background: "linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC05 75%, #EA4335 100%)",
      borderRadius: "50%",
      padding: "4px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 8px rgba(66,133,244,0.2)"
    }}
  >
    <FaGoogle size={22} color="#fff" />
  </span>
);
const FacebookIcon = () => (
  <span
    style={{
      background: "linear-gradient(135deg, #1877F3 0%, #42A5F5 100%)",
      borderRadius: "50%",
      padding: "4px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 8px rgba(24,119,243,0.2)"
    }}
  >
    <FaFacebookF size={22} color="#fff" />
  </span>
);
const XIcon = () => (
  <span
    style={{
      background: "linear-gradient(135deg, #000 0%, #6e6e6e 100%)",
      borderRadius: "50%",
      padding: "4px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
    }}
  >
    <FaXTwitter size={22} color="#fff" />
  </span>
);

const Login = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Refs for GSAP animation
  const imageSectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    if (imageSectionRef.current && textRef.current && imgRef.current) {
      // Animate background gradient (cool effect)
      gsap.fromTo(
        imageSectionRef.current,
        {
          background:
            "linear-gradient(135deg, #915fe2 0%, #5641F3 100%)"
        },
        {
          background:
            "linear-gradient(120deg, #ff6a00 0%, #ee0979 40%, #5641F3 100%)",
          duration: 1.2,
          ease: "power2.inOut"
        }
      );
      // Animate text: fade in and slide from left
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );
      // Animate image: fade in and slide from bottom
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.4 }
      );
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // loginhandler
  const loginHandler = async (data) => {
    dispatch(loginUser(data.email , data.password))
    reset()
  };

  return (
    <div className="w-full   lg:mt-0  p-2   lg:p-10 ">
      <div className=" border border-[#897cec] p-2 log-in-conatiner gap-1 flex w-full h-full overflow-hidden rounded-2xl">
        {/* image section */}
        <div
          className="image-section w-1/2 hidden p-2 md:flex rounded-xl  relative"
          ref={imageSectionRef}
          style={{
            background:
              "linear-gradient(135deg, #915fe2 0%, #5641F3 100%)",
            transition: "background 0.8s cubic-bezier(0.4,0,0.2,1)"
          }}
        >
          <h1
            className="text-7xl font-montserrat w-1/2"
            ref={textRef}
            style={{ opacity: 0 }}
          >
            Welcome to the Unfiltered Tribe
          </h1>
          <div className="-translate-x-1/2 w-full bottom-0 absolute  left-1/2">
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
          <h1 className="text-4xl font-montserrat text-center">Sign In</h1>
          <form onSubmit={handleSubmit(loginHandler)} className="w-full  font-manrope flex flex-col gap-6 px-6 ">
            {/* email and userName */}
            <div className="platform flex hover-effect flex-col px-3 py-1 rounded-xl border-[1px] border-[#897cec] duration-300">
              <label className="font-manrope font-extralight ">
                Username or Email Address
              </label>
              <input required {...register("email")} className="p-2 outline-0 border-none" type="email" />
            </div>
            {/* password*/}
            <div className="platform flex hover-effect flex-col px-3 py-1 rounded-xl border-[1px] border-[#897cec] duration-300">
              <label className="font-manrope font-extralight ">Password</label>
              <input required {...register("password")} className="p-2 outline-0 border-none" type="password" />
            </div>
            {/* forget-password Remendar me */}
            <div className="forget-pass-remendar  flex items-center justify-between px-1">
              <label className="flex items-center gap-2 font-manrope text-sm">
                <input type="checkbox" className="accent-[#897cec] " />
                Remember me
              </label>
              <Link
                to="#"
                className="text-[#897cec]  hover:underline font-manrope">
                Forgot password?
              </Link>
            </div>
            {/*Log In */}
            <button
              type="submit"
              className="mt-2 bg-[#5641F3] font-bold py-2 px-4 rounded-xl hover:bg-[#5641f3b0] transition-colors duration-200 font-poppins">
              Log In
            </button>
            <h2 className="text-center text-xl">Or</h2>
            {/* login with */}
            <div className="flex justify-center gap-3">
              <button
                type="button"
                className="btn  btn-soft btn-secondary rounded-lg">
                <GoogleIcon />
              </button>
              <button
                type="button"
                className="btn btn-soft btn-info rounded-lg">
                <FacebookIcon />
              </button>
              <button
                type="button"
                className="btn btn-soft btn-outline rounded-lg">
                <XIcon />
              </button>
            </div>
          </form>
          {/* Dont'have account */}
          <div className="mt-4 text-center">
            <span className="font-manrope text-sm text-gray-400">
              Don't have an account?{' '}
            </span>
            <Link
              to="/signIn"
              className="text-[#897cec] font-manrope font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
          {/* Show error if any */}
          {error && (
            <div className="mt-2 text-center text-red-500 font-manrope text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
