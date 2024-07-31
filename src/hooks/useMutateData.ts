import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "../services/todoService";

const useMutateData = () => {
  return useMutation({
    mutationFn: async (data: Todo) =>
      axios
        .post("https://jsonplaceholder.typicode.com/todos", data)
        .then((response) => response.data),
  });
};

export default useMutateData;