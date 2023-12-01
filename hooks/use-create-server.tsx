import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

interface Params {
  values: {
    name: string
    imageUrl: string
  }
}

interface Params2 {
  onSuccess: () => void
  onError: () => void
}

export const useCreateServer = ({ onSuccess, onError }: Params2) => {
  //      const { toast } = useToast()
  //   const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ values }: Params) => {
      const { data } = await axios.post("/api/servers", values)
    },
    onSuccess,
    onError,
  })
}
