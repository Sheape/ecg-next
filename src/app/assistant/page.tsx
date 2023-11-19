import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const getUserId = async (userId, xataClient) => {
  const user = await xataClient.db.ecg.filter({ id: userId }).getFirst();
  return user
}

export default async function Assistant() {
  const { userId } = auth();
  const xataClient = getXataClient();

  const retrievedUserId = await getUserId(userId, xataClient);
  if (retrievedUserId === null) {
    redirect("/assistant/new");
  }
}
