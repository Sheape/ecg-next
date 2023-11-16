"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    <div className="ml-auto flex justify-between space-x-6">
      <button
        className={pathname === "/" ? current_page_btn : inactive_btn_style}
      >
        <Link href="/">
          Home
        </Link>
      </button>
      <button
        className={pathname === "/assistant"
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
    </div>
  );
};

const Navbar = () => {
  return (
    <>
      <header className="bg-hr-bg">
        <nav className="flex items-center my-4 mx-7">
          <Logo />
          <Links />
        </nav>
      </header>
    </>
  );
};

export default Navbar;
