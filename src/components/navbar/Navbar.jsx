import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-white.png";
import { FiMenu } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import ResponsivNavBar from "./ResponsivNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useClerk } from "@clerk/clerk-react";
import { logOut } from "../../store/reducer/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { signOut } = useClerk();
  // auth
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log(isAuthenticated,user);
  const [isResponsiveOpen, setIsResponsiveOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const handleLogout = async () => {
    await signOut();
    dispatch(logOut());
  };
  const handleMenuClick = () => {
    setIsResponsiveOpen(true);
  };
  return (
    <>
      <nav className=" md:glass rounded-full w-full px-3 py-2 flex md:px-5  font-poppins  justify-between items-center  ">
        <NavLink to="/" className="text-white ">
          <img className="w-40" src={logo} alt="Logo" />
        </NavLink>
        <div className=" glass hidden md:flex gap-6 px-6 py-2 rounded-full shadow-2xl ">
          <NavLink to="/" className="text-lg ">
            Home
          </NavLink>
          <NavLink to="/shop" className="text-lg  ">
            Shop
          </NavLink>
          <NavLink to="/About" className="text-lg  ">
            About
          </NavLink>
          {isAuthenticated ? (
            <button  onClick={()=>handleLogout()} className="text-lg cursor-pointer">LogOut</button>
          ) : (
            <NavLink to="/Login" className="text-lg  ">
              Login
            </NavLink>
          )}
        </div>
        <div className="glass flex md:gap-6 items-center  px-4 py-1.5 rounded-full  gap-4">
          <NavLink to="/search">
            <span className="text-3xl ">
              <IoIosSearch />
            </span>
          </NavLink>
          <NavLink className="hidden md:flex">
            <span className="text-3xl ">
              <MdOutlineFavoriteBorder />
            </span>
          </NavLink>
          <NavLink to="/cart" className="relative">
            <h2 className=" absolute -right-3 bg-red-700 font-poppins text-sm -top-1/2 px-1.5 py-.5 rounded-full">
              {items.length}
            </h2>
            <span className="text-3xl">
              <IoCartOutline />
            </span>
          </NavLink>
          <button
            className="menu md:hidden"
            onClick={handleMenuClick}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
            }}
            aria-label="Open menu"
            type="button">
            <span className="text-3xl">
              <FiMenu />
            </span>
          </button>
        </div>
      </nav>
      <ResponsivNavBar
        isOpen={isResponsiveOpen}
        setIsOpen={setIsResponsiveOpen}
      />
    </>
  );
};

export default Navbar;
