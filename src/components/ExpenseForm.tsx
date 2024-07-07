import { z } from "zod";
import { categories } from "../constants/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (expense: ExpenseFormData) => void;
}

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  amount: z
    .number({ invalid_type_error: "Amount field is required" })
    .min(1, "Amount must be greater than 0"),
  category: z.enum(categories),
});

type ExpenseFormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          {...register("title")}
          type="text"
          className="form-control"
          id="title"
        />
        {errors.title && (
          <span className="text-danger">{errors.title.message}</span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          className="form-control"
          id="amount"
        />
        {errors.amount && (
          <span className="text-danger">{errors.amount.message}</span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} className="form-select" id="category">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-danger">{errors.category.message}</span>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <hr />
    </form>
  );
};

export default ExpenseForm;
