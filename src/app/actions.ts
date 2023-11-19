"use server"
import { auth } from "@clerk/nextjs";

const getUserId = async () => {
  const { userId } = auth();
  return String(userId);
}

export { getUserId }
