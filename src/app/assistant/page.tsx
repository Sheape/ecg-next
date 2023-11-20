
export const runtime = 'nodejs'
import Navbar from "@/components/Navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getRecords } from "@/app/actions";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const r2PublicBucket = 'https://pub-dbb2b6348bb94fb48b304e8a044d5434.r2.dev';
export default async function Assistant() {
  const { userId } = auth();

  const records = await getRecords(userId);
  if (records === null) {
    redirect("/assistant/new");
  }
  const actualRecords = records.records;
  console.log(actualRecords);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
        <Button color="primary" className="text-hr-bg font-bold text-lg">
          Create New
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 m-10">
        {
          actualRecords.map((item, index) => {
            return (
              <Card key="cards" className="w-[20%] h-60" shadow='sm' isPressable>
                <CardBody>
                  <Image radius="none" className="w-full object-cover scale-[5]" src={`${r2PublicBucket}/${item.recordId}-${item.imagePath.replace(/\.[^/.]+$/, ".png")}`} />
                </CardBody>
                <CardFooter>
                  {item.patientName}
                </CardFooter>
              </Card>
            )
          })
        }
      </div>
    </>
  )
}
