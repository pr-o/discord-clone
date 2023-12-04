import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { redirectToSignIn } from "@clerk/nextjs"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { ServerSidebar } from "@/components/server/server-sidebar"

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: { serverId: string }
}) => {
  const { serverId } = params
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (!server) {
    return redirect("/")
  }

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  )
}

export default ServerIdLayout
