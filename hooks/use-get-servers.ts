import { Server } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

export const useGetServers = () => {
  return useQuery({
    queryKey: ["servers"],
    queryFn: () => {
      return axios.get("/api/servers")
    },
  })
}
