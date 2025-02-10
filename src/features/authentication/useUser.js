import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    onError: (error) => {
      console.error(error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
