/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toogleTheme } from "../redux/theme/themeSlice";
function Header() {
  const dispatch = useDispatch()
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const {theme} = useSelector((state)=> state.theme)
  return (
    <Navbar className="border-b-2 shadow-md dark:bg-slate-950">
      <Link
        to="/"
        className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="text-center px-2 mx-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          Blog{" "}
        </span>
        App
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search.."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10 color='gray' lg:hidden">
        <AiOutlineSearch />
      </Button>
      <NavbarCollapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/dashboard"} as={"div"}>
          <Link to="/dashboard">Dashboard</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/blogs"} as={"div"}>
          <Link to="/blogs">Blogs</Link>
        </Navbar.Link>
      </NavbarCollapse>
      <div className="flex flex-row gap-2 mf:order-2">
        <Button className="hidden sm:inline" color="gray" onClick={()=> dispatch(toogleTheme())} >
          {theme === 'light' ? (<FaMoon />): (<FaSun/>)}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon="false"
            inline
            label={<Avatar alt="user" img={currentUser.profilePic} rounded size='sm'/>}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-md">{currentUser.email}</span>
              <Link to='/dashboard?tab=profile'>
              <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem>Sign Out</DropdownItem>
            </Dropdown.Header>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button gradientDuoTone="purpleToBlue" outline>Login</Button>
          </Link>
        )}

        <NavbarCollapse />
      </div>
    </Navbar>
  );
}

export default Header;
