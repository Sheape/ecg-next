import Image from "next/image";
import Navbar from "../../components/Navbar";

const CreateNew = () => {
  return (
    <>
      <div className="flex p-10 mx-auto items-center max-w-5xl min-h-[80vh]">
        <div className="flex flex-col min-w-[30rem] min-h-[20rem] rounded-lg border-dashed border-2 p-6 justify-center items-center text-center">
          <button className="bg-hr-primary text-white px-10 py-3 rounded-lg font-semibold">
            <span className="material-icons text-[3rem]">upload_file</span>
          </button>
          <p className="text-hr-text">Upload digital ECG Recording</p>
        </div>
      </div>
    </>
  )
}

export default function Assistant() {
  return (
    <>
      <Navbar />
      <CreateNew />
    </>
  );
}
