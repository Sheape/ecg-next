import Image from "next/image";
import Navbar from "@/components/Navbar";

const gap_padding = "p-3"

const UploadButton = () => {
  return (
    <button className="bg-hr-primary text-white rounded-lg">
      <div className="flex flex-col min-w-[35rem] min-h-[22rem] rounded-lg border-dashed border-2 p-6 justify-center items-center text-center">
        <span className="material-icons text-[3rem]">upload_file</span>
        <p className="text-hr-text">Upload Digital ECG Recording <br/> (.mat or .dat)</p>
      </div>
    </button>
  )
}

const PatientNameInput = () => {
  return (
    <div className="flex flex-col p-3">
      <p className="text-hr-text">Patient's Name</p>
      <input className="border-2 border-gray-200 text-hr-text p-2 rounded-lg" type="text" />
    </div>
  )
}

const GenderInput = () => {
  return (
    <div className="flex flex-col p-3">
      <p className="text-hr-text">Gender</p>
      <select className="border-2 border-gray-200 text-hr-text p-2 rounded-lg">
        <option value="">Choose a gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  )
}

const AgeInput = () => {
  return (
    <div className="flex flex-col p-3">
      <p className="text-hr-text">Age</p>
      <input className="border-2 border-gray-200 text-hr-text p-2 rounded-lg" type="number" />
    </div>
  )
}

const DescriptionInput = () => {
  return (
    <div className="flex flex-col p-3">
      <p className="text-hr-text">Symptoms/Description</p>
      <textarea className="border-2 border-gray-200 text-hr-text p-2 rounded-lg"
        placeholder="Ex: The patient experiences dizziness and difficulty when
        exercising. The heart's rhythm is irregular." />
    </div>
  )
}

const AnalyzeButton = () => {
  return (
    <button className="bg-hr-accent text-hr-bg px-10 py-3 mx-3 my-3 rounded-lg font-semibold">
      Analyze
    </button>
  )
}

const Mode = () => {
  return (
    <div className="mx-auto rounded-2xl bg-hr-bg">
      Nice
    </div>
  )
}

const CreateNew = () => {
  return (
    <>
      <div className="flex p-10 mx-auto items-center max-w-6xl min-h-[80vh]">
        <Mode />
        <UploadButton />
        <div className="flex flex-col px-10 max-w-full">
          <PatientNameInput />
          <div className="flex">
            <GenderInput />
            <AgeInput />
          </div>
          <DescriptionInput />
          <AnalyzeButton />
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
