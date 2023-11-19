"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FileUpload from "@/components/FileUpload";
import { useState } from "react";
import { getUserId } from "@/app/actions"

const gap_padding = "p-3"

const send = async (e, url, recordId) => {
  const formData = new FormData(e.currentTarget);
  const userId = await getUserId();

  fetch("/api/add-record", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: String(userId),
      patientName: formData.get("patientName"),
      gender: formData.get("gender"),
      age: parseInt(formData.get("age")),
      symptoms: formData.get("symptoms"),
      recordId,
      imageLink: url
    })
  }).then(() => window.location.reload())
}

const PatientNameInput = () => {
  return (
    <div className="flex flex-col p-3">
      <p className="text-hr-text">Patient's Name</p>
      <input className="border-2 border-gray-200 text-hr-text p-2 rounded-lg" name="patientName" type="text" />
    </div>
  )
}

const GenderInput = () => {
  return (
    <div className="flex flex-col p-3">
      <p className="text-hr-text">Gender</p>
      <select name="gender" className="border-2 border-gray-200 text-hr-text p-2 rounded-lg">
        <option value="">Select a gender</option>
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
      <input name="age" className="border-2 border-gray-200 text-hr-text p-2 rounded-lg" type="number" />
    </div>
  )
}

const DescriptionInput = () => {
  return (
    <div className="flex flex-col p-3">
      <p className="text-hr-text">Symptoms/Description</p>
      <textarea name="symptoms" className="border-2 border-gray-200 text-hr-text p-2 rounded-lg"
        placeholder="Ex: The patient experiences dizziness and difficulty when
        exercising. The heart's rhythm is irregular." />
    </div>
  )
}

const AnalyzeButton = () => {
  return (
    <button type="submit" name="submit" className="bg-hr-accent text-hr-bg px-10 py-3 mx-3 my-3 rounded-lg font-semibold">
      Analyze
    </button>
  )
}

const Tabs = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }
  return (
      <div className="flex justify-center rounded-full bg-slate-400 p-1">
        <button
          className={`px-4 rounded-full focus:outline-none ${
            activeTab === 'Single' ? 'bg-hr-accent text-hr-bg' : 'bg-gray-200'
          }`}
          onClick={() => handleTabClick('Single')}
        >
          Single
        </button>
        <button
          className={`px-4 rounded-full focus:outline-none ${
            activeTab === 'Multi' ? 'bg-hr-accent text-hr-bg' : 'bg-gray-200'
          }`}
          onClick={() => handleTabClick('Multi')}
        >
          Multi
        </button>
      </div>
  )
}

const TabContent = ({ activeTab }) => {
  const [url, setUrl] = useState()
  const [recordId, setRecordId] = useState()

  return (
    <div className="flex p-10 mx-auto items-center max-w-6xl min-h-[80vh]">
      {activeTab === 'Single' &&
        (
          <>
            <FileUpload setUrl={setUrl} setRecordId={setRecordId} />
            <form onSubmit={(e) => {
              e.preventDefault()
              send(e, url, recordId)
            }}>
              <div className="flex flex-col px-10 max-w-full">
                <PatientNameInput />
                <div className="flex">
                  <GenderInput />
                  <AgeInput />
                </div>
                <DescriptionInput />
                <AnalyzeButton />
              </div>
            </form>
          </>
        )
      }
      {activeTab === 'Multi' &&
        (
          <div className="flex flex-col mx-auto">
            <FileUpload />
            <AnalyzeButton />
          </div>
        )
      }
    </div>
  )
}

const CreateNew = () => {
  const [activeTab, setActiveTab] = useState('Single');
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex justify-center items-center">
        <TabContent activeTab={activeTab} />
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