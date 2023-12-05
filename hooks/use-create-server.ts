import { Server } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

interface Params {
  values: {
    name: string
    imageUrl: string
  }
}

interface Response {
  data: Server
}

export const useCreateServer = () => {
  const queryClient = useQueryClient()

  return useMutation<Response, unknown, Params>({
    mutationFn: ({ values }: Params) => {
      return axios.post("/api/servers", values)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servers"] })
    },
  })
}
