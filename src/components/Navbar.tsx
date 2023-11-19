"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div>
        <img className="mx-3 w-12" src="/logo-circle.png" />
      </div>
      <div className="text-2xl">
        <span className="text-hr-accent font-medium">
          Heart
        </span>
        <span className="text-hr-accent font-bold">
          Read
        </span>
      </div>
    </div>
  );
};

const Links = () => {
  const pathname = usePathname();
  const current_page_btn =
    "py-1 px-5 items-center gap-x-2 font-semibold rounded-full bg-hr-accent text-hr-bg hover:bg-hr-cyan disabled:opacity-50 disabled:pointer-events-none";
  const inactive_btn_style =
    "py-1 px-5 items-center gap-x-2 font-semibold rounded-full text-hr-accent hover:bg-hr-accent hover:text-hr-bg disabled:opacity-50 disabled:pointer-events-none";
  return (
    <>
      <button
        className={pathname === "/" ? current_page_btn : inactive_btn_style}
      >
        <Link href="/">
          Home
        </Link>
      </button>
      <button
        className={(pathname === "/assistant" || pathname === "/assistant/new")
          ? current_page_btn
          : inactive_btn_style}
      >
        <Link href="/assistant">
          Assistant
        </Link>
      </button>
      <button
        className={pathname === "/about"
          ? current_page_btn
          : inactive_btn_style}
      >
        <Link href="/about">
          About
        </Link>
      </button>
      <button
        className={pathname === "/usage"
          ? current_page_btn
          : inactive_btn_style}
      >
        <Link href="/usage">
          How to Use
        </Link>
      </button>
    </>
  );
};

const UserProfile = () => {
  return (
    <UserButton afterSignOutUrl='/' />
  )
}

const GetStarted = () => {
  return (
    <>
      <SignUpButton>
        <button className="flex justify-center items-center bg-gradient-to-r from-hr-accent from-70% to-hr-text font-semibold text-hr-bg text px-3 rounded-full hover:flip">
          <p> Get Started </p>
          <ArrowRight className="mx-2 h-5 w-5" />
        </button>
      </SignUpButton>
    </>
  )
}

const Navbar = () => {
  return (
    <>
      <header className="bg-hr-bg">
        <nav className="flex items-center my-4 mx-7">
          <Logo />
          <div className="ml-auto flex justify-between space-x-6">
            <Links />
            <SignedIn>
              <UserProfile />
            </SignedIn>
            <SignedOut>
              <GetStarted />
            </SignedOut>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
