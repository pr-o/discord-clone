import { auth } from "@clerk/nextjs"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

const handleAuth = () => {
  const { userId } = auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }
  return { userId }
}

// FileRouter for your app, can contain multiple FileRoutes
export const fileRouter = {
  serverImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter

export type CustomFileRouter = typeof fileRouter
