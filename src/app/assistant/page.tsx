import Image from "next/image";
import Navbar from "../../components/Navbar";



export default function Assistant() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-hr-accent">
          <h1>Nice</h1>
        </div>
        <div>
          <h2>Col 2</h2>
        </div>
        <div>
          <h2>Col 3</h2>
        </div>
      </div>
    </>
  );
}
