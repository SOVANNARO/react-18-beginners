interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

function ExpenseList({ expenses, onDelete }: Props) {
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            return (
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="col">Total</th>
            <th scope="col">
              {expenses.reduce((total, expense) => total + expense.amount, 0)}
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default ExpenseList;
