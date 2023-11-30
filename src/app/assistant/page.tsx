'use client'

import Navbar from "@/components/Navbar";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getRecords } from "@/app/actions";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useEffect, useState } from 'react';

const r2PublicBucket = 'https://pub-dbb2b6348bb94fb48b304e8a044d5434.r2.dev';

export default function Assistant() {
  const [records, setRecords] = useState(null);
  const { user } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const fetchRecords = async () => {
      const records = await getRecords(user.id);
      if (records === null) {
        redirect("/assistant/new");
      }
      const actualRecords = records.records;
      setRecords(actualRecords);
    }

     fetchRecords();
  }, [])


  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
        <Button color="primary" className="text-hr-bg font-bold text-lg" onPress={() => router.push("/assistant/new")}>
            Create New
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 m-10">
          {
            records && records.map((item, index) => {
              return (
                <Card key="cards" className="w-[20%] h-60" shadow='sm' isPressable onPress={() => router.push("/assistant/" + item.recordId)}>
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
