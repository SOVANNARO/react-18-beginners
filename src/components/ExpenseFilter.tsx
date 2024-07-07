import { categories } from "../constants/categories";

interface Props {
  onSelectCategory: (category: string) => void;
}

function ExpenseFilter({ onSelectCategory }: Props) {
  return (
    <div className="pb-3">
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(event) => onSelectCategory(event.target.value)}
      >
        {["All", ...categories].map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ExpenseFilter;
