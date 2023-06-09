import {useMutation, useQuery, useQueryClient} from "react-query";
import {fetcher} from "@/lib/api";

export function useUser() {
  const query = useQuery("user", async () =>
      await fetcher("/api/user")
    ,
    {
      staleTime: 30_000, //ms
      cacheTime: Infinity,
      retry: false,
    })

  return query.data;
}

export function useSignIn() {
  const queryClient = useQueryClient()
  const mutation = useMutation(({email, password}) =>
    fetcher('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    }));
  return {
    isError: mutation.isError,
    isLoading: mutation.isLoading,
    signIn: async (email, password) => {
      try {
        const data = await mutation.mutateAsync({email, password});
        queryClient.setQueryData("user", data.user);
        return true
      } catch (e) {
        return false
      }
    },
  };
}


export function useSignOut() {
  const queryClient = useQueryClient()
  const mutation = useMutation(async () =>
    await fetcher("/api/logout"))

  return {
    isError: mutation.isError,
    isLoading: mutation.isLoading,
    signOut: async () => {
      const data = await mutation.mutateAsync();
      queryClient.setQueryData("user", undefined);
      return data
    },
  };
}