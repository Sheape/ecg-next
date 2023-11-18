"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import {
  MultiFileDropzone,
  type FileState,
} from '@/components/MultiFileDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';

const gap_padding = "p-3"

const MultiFileDropzoneUsage = () => {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  options: {
                    temporary: true
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                console.log(res);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
    </div>
  );
}

const UploadButton = () => {
  return (
    <button className="bg-hr-primary text-white rounded-lg">
      <div className="flex flex-col min-w-[35rem] min-h-[22rem] rounded-lg border-dashed border-2 p-6 justify-center items-center text-center">
        <span className="material-icons text-[3rem]">upload_file</span>
        <p className="text-hr-text">Upload Digital ECG Recording <br/> (.mat or .dat)</p>
        <FileUpload />
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
  return (
    <div className="flex p-10 mx-auto items-center max-w-6xl min-h-[80vh]">
      {activeTab === 'Single' &&
        (
          <>
            <MultiFileDropzoneUsage />
            <div className="flex flex-col px-10 max-w-full">
              <PatientNameInput />
              <div className="flex">
                <GenderInput />
                <AgeInput />
              </div>
              <DescriptionInput />
              <AnalyzeButton />
            </div>
          </>
        )
      }
      {activeTab === 'Multi' &&
        (
          <div className="flex flex-col mx-auto">
            <MultiFileDropzoneUsage />
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
