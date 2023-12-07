"use client"

import { UserButton } from "@clerk/nextjs"
import { Server } from "@prisma/client"

import { currentProfile } from "@/lib/current-profile"
import { useGetServers } from "@/hooks/use-get-servers"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components//ui/scroll-area"
import { NavigationAction } from "@/components/navigation/navigation-action"
import { NavigationItem } from "@/components/navigation/navigation-item"
import { ThemeToggle } from "@/components/theme-toggle"

const NavigationSidebar = () => {
  // const profile = await currentProfile()
  const { isLoading, data: serversData } = useGetServers()

  // if (!profile) {
  //   return redirect("/")
  // }

  const servers = serversData?.data
  console.log("serversData =>", serversData)

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 bg-[#E3E5E8] py-3 text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {servers?.map((server: Server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ThemeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  )
}

export default NavigationSidebar
