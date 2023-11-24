import Image from "next/image";
import Navbar from "@/components/Navbar";

export const runtime = "edge"
export default function Home() {
  return (
    <>
      <Navbar />
      <h1>Nice</h1>
    </>
  );
}
