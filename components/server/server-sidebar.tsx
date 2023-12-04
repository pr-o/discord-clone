import { channel } from "diagnostics_channel"
import { redirect } from "next/navigation"
import { redirectToSignIn } from "@clerk/nextjs"
import { ChannelType } from "@prisma/client"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { ServerHeader } from "@/components/server/server-header"

interface ServerSidebarProps {
  serverId: string
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile()
  if (!profile) {
    return redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  })

  if (!server) {
    return redirect("/")
  }

  const textChannels = server?.channels.filter(
    ({ type }) => type === ChannelType.TEXT
  )
  const audioChannels = server?.channels.filter(
    ({ type }) => type === ChannelType.AUDIO
  )
  const videoChannels = server?.channels.filter(
    ({ type }) => type === ChannelType.VIDEO
  )

  const members = server?.members.filter(
    ({ profileId }) => profileId !== profile.id
  )

  const role = server.members.find(({ profileId }) => profileId === profile.id)
    ?.role

  return (
    <div className="flex h-full w-full flex-col bg-[#F2F3F5] text-primary dark:bg-[#282D31]">
      <ServerHeader server={server} role={role} />
      server sidebar
    </div>
  )
}
