import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [expenses, setExpenses] = useState([
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      category: "Groceries",
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      category: "Electronics",
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      category: "Auto & Transport",
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      category: "Furniture",
    },
  ]);

  // Filter expenses based on the selected category
  const filteredExpenses =
    selectedFilter === "all"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedFilter);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <hr />
      <ExpenseForm onSubmit={(expense) => setExpenses([...expenses, { ...expense, id: Date.now().toString() }])} />
      <ExpenseFilter
        onSelectCategory={(category) => setSelectedFilter(category)}
      />
      {filteredExpenses.length === 0 ? (
        <h2>No expenses found</h2>
      ) : (
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        />
      )}
    </div>
  );
}

export default App;
