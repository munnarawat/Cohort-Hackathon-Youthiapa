import React, { useRef, useEffect } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useDispatch, useSelector } from "react-redux";
import { useClerk } from "@clerk/clerk-react";
import { logOut } from "../../store/reducer/authSlice";

const ResponsivNavBar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { signOut } = useClerk();
  const CloseRef = useRef(null);
  const menuRef = useRef(null);
  // auth
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // Array of refs for each h1
  const h1Refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  // Track if menu is closing
  const isClosingRef = useRef(false);
  // logout
  const handleLogout = async () => {
    await signOut();
    dispatch(logOut());
  };

  // Smoothly animate menu out (to -100% y) and then setIsOpen(false)
  const handleClose = () => {
    if (!menuRef.current || isClosingRef.current) return;
    isClosingRef.current = true;
    gsap.to(menuRef.current, {
      y: "-100%",
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        setIsOpen(false);
        isClosingRef.current = false;
      },
    });
  };

  // Animate menu in when isOpen becomes true
  useGSAP(() => {
    if (isOpen && menuRef.current) {
      // Reset menu position to above screen
      gsap.set(menuRef.current, { y: "-100%" });
      // Animate menu in
      gsap.to(menuRef.current, {
        y: "0%",
        duration: 0.9,
        ease: "power2.out",
      });

      // Animate all h1s from y:100 to y:0 with stagger
      gsap.fromTo(
        h1Refs.map((ref) => ref.current),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        }
      );
    }
  }, [isOpen]);

  // When isOpen becomes false, don't render the menu
  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="w-full h-screen fixed top-0 px-2 py-2 right-0 bg-background z-[10000]"
      style={{ willChange: "transform" }}>
      <div className="close_icon mt-5 flex justify-end px-4">
        <span
          ref={CloseRef}
          className="text-3xl cursor-pointer font-semibold"
          onClick={handleClose}>
          <RiCloseLargeLine />
        </span>
      </div>
      <div className="menu-text md:hidden font-manrope flex flex-col gap-4 w-full py-2 px-1 ">
        <Link
          to="/"
          className="elms overflow-hidden py-2"
          onClick={handleClose}>
          <h1 ref={h1Refs[0]} className="text-4xl font-semibold">
            Home
          </h1>
        </Link>
        <Link
          to="/shop"
          className="elms overflow-hidden py-2"
          onClick={handleClose}>
          <h1 ref={h1Refs[1]} className="text-4xl font-semibold">
            Product
          </h1>
        </Link>
        <Link
          to="/About"
          className="elms overflow-hidden py-2"
          onClick={handleClose}>
          <h1 ref={h1Refs[2]} className="text-4xl font-semibold">
            About
          </h1>
        </Link>
        {isAuthenticated ? (
          <button
            onClick={() => handleLogout()}
            ref={h1Refs[3]}
            className="text-4xl font-semibold text-start ">
            LogOut
          </button>
        ) : (
          <Link
            to="/Login"
            className="elms overflow-hidden py-2"
            onClick={handleClose}>
            <h1 ref={h1Refs[3]} className="text-4xl font-semibold">
              Log IN
            </h1>
          </Link>
        )}
        <Link
          className="elms overflow-hidden flex items-center gap-2 py-2"
          onClick={handleClose}>
          <span className="text-4xl">
            <FaRegHeart />
          </span>
          <h1 ref={h1Refs[4]} className="text-4xl font-semibold">
            Wishlist
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default ResponsivNavBar;
