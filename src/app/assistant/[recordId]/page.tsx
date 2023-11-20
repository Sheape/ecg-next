import Navbar from '@/components/Navbar';
import { getXataClient } from '@/xata';
import { Progress } from '@nextui-org/react';

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
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <img className="max-w-[90%]" src={`${r2PublicBucket}/${recordId}-${pngFile}`} />
          <div className="space-y-4">
            {Object.entries(prediction.clasifications).map(([label, value]) => (
              <Progress color="primary" className="max-w-md" label={label} size="md" value={value} maxValue={1.0} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
