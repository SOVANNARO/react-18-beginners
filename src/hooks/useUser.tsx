import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { AxiosError } from "axios";

const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { request, cancel } = userService.getAll<User>();
    setLoading(true);
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof AxiosError) return;
        setError("Failed to fetch users");
        setLoading(false);
      });
    return () => cancel();
  }, []);

  return { users, error, loading, setUsers, setError, setLoading };
};

export default useUser;
