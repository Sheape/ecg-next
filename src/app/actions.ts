"use server"
import { auth } from "@clerk/nextjs";
import { getXataClient } from "@/xata";

const getUserId = async () => {
  const { userId } = auth();
  return String(userId);
}

const getId = async (recordId) => {
  const xata = getXataClient();
  const idUnfiltered = await xata.db.ecg.search(recordId)
  const id = idUnfiltered.records[0].id

  return id
}

const updateDbPredictions = async (recordId, prediction) => {
  const xata = getXataClient();
  const idUnfiltered = await xata.db.ecg.search(recordId)
  const id = idUnfiltered.records[0].id
  const pred = await xata.db.ecg.update(id, {prediction: prediction})

  return 0
}


export { getId, getUserId, updateDbPredictions }
