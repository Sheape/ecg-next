export const runtime = 'nodejs';

import Navbar from '@/components/Navbar';
import { getXataClient } from '@/xata';
import {
  Avatar,
  AvatarIcon,
  Progress,
  Image,
  Input,
  Textarea,
  Card,
  CardBody
} from '@nextui-org/react';

function PatientName({ patientName }) {
  return (
    <div className="flex items-center mx-auto">
      <Avatar icon={<AvatarIcon />} className={{
        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
        icon: "text-black/60"
      }} />
      <span className="mx-2 text-lg font-bold">{patientName}</span>
    </div>
  )
}

function AgeGender({ age, gender }) {
  return (
    <div className="flex items-center mx-auto">
      <Input className="mx-2"
        isReadOnly
        label="Age"
        labelPlacement="outside-left"
        defaultValue={age}
      />
      <Input className="mx-2"
        isReadOnly
        label="Gender"
        labelPlacement="outside-left"
        defaultValue={gender}
      />
    </div>
  )
}

function Symptoms({ symptoms }) {
  return (
    <Textarea
      isReadOnly
      label="Symptoms"
      labelPlacement="outside"
      defaultValue={symptoms}
    />
  )
}

function HeartArrhythmia({ prediction }) {
  return (
    <Card>
      <CardBody>
        The possible heart arrhythmias of the patient could be <span className="text-hr-accent"> {Object.keys(prediction.classifications).join(', ')} </span>
      </CardBody>
    </Card>
  )
}

export default async function Record({ params }) {
  const r2PublicBucket = 'https://pub-dbb2b6348bb94fb48b304e8a044d5434.r2.dev'
  const client = getXataClient()
  const recordId = params.recordId

  console.log(recordId)
  const data = await client.db.ecg.search(recordId)
  const { imagePath, patientName, symptoms, prediction, age, gender } = data.records[0]
  const pngFile = imagePath.replace(/\.[^/.]+$/, ".png")

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 gap-4 min-height-screen">
        <div className="col-span-3">
          <header className="text-2xl text-center text-hr-accent font-bold col-span-3">ECG Analysis Report</header>
          <Image className="mx-auto max-w-[80%]" src={`${r2PublicBucket}/${recordId}-${pngFile}`} />
          <div className="grid grid-cols-2 gap-4 mt-4 justify-items-center">
            {Object.entries(prediction.classifications).map(([label, value]) => (
              <Progress key="progress" color="primary" className="max-w-md" label={label} showValueLabel={true} size="md" value={value} maxValue={1.0} />
            ))}
          </div>
        </div>
        <div className="rounded-xl p-10 mr-5 bg-default-300/50 flex flex-col gap-y-10 col-span-1 min-h-full">
          <PatientName patientName={ patientName } />
          <AgeGender age={age} gender={gender} />
          <Symptoms symptoms={symptoms} />
          <HeartArrhythmia prediction={prediction} />
        </div>
      </div>
    </>
  )
}
