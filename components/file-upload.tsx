"use client"

import Image from "next/image"
import { X } from "lucide-react"

import { UploadDropzone } from "@/lib/uploadthing"

import "@uploadthing/react/styles.css"

import { useState } from "react"

import { useToast } from "@/components/ui/use-toast"

interface FileUploadProps {
  endPoint: "messageFile" | "serverImage"
  value: string
  onChange: (url?: string) => void
}

const FileUpload = ({ endPoint, value, onChange }: FileUploadProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const fileType = value?.split(".").pop()
  const { toast } = useToast()

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          onLoad={() => setImageLoaded(true)}
          alt="Image to upload"
          className="rounded-full"
        />
        {imageLoaded ? (
          <button
            disabled={!value}
            type="button"
            className="absolute right-0 top-0 -mr-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
            onClick={() => {
              onChange("")
              setImageLoaded(false)
            }}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "Something went wrong! Try again later",
          description: error.message,
          variant: "destructive",
        })
      }}
    />
  )
}

export default FileUpload
