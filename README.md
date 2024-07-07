## 🟢 Building Forms

### Tooling

- React Hook Form
- Zod

### 🟢 Building a Form

Form.tsx

```typeScript
function Form() {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
            Age
        </label>
        <input id="age" type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}

export default Form;

```

### 🟢 Handling Form Submission

```typeScript
import { FormEvent } from "react";

function Form() {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="w-25">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input id="name" type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input id="age" type="number" className="form-control" />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;

```

### 🟢 Accessing Input Fields

```typeScript
import { FormEvent, useRef } from "react";

function Form() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = { name: "", age: 0 };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!nameRef.current || !ageRef.current) return;
    person.name = nameRef.current.value;
    person.age = parseInt(ageRef.current.value);
    console.log(person);
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="w-25">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input ref={nameRef} id="name" type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input ref={ageRef} id="age" type="number" className="form-control" />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;

```

### 🟢 Controlled Components

```typeScript
import { FormEvent, useState } from "react";

function Form() {
  const [person, setPerson] = useState({
    name: "",
    age: 0,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(person);
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="w-25">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={(event) =>
              setPerson({
                ...person,
                name: event.target.value,
              })
            }
            value={person.name}
            id="name"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input
            onChange={(event) =>
              setPerson({ ...person, age: parseInt(event.target.value) })
            }
            value={person.age}
            id="age"
            type="number"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;

```

### 🟢 Managing Forms with React Hook Form

`npm install react-hook-form`

```typeScript
import { FieldValues, useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-25">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input
            {...register("age", { required: true, min: 18, max: 100 })}
            id="age"
            type="number"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;

```

### 🟢 Applying Validation

```typeScript
import { FieldValues, useForm } from "react-hook-form";

interface FormData {
  name: string;
  age: number;
}

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-25">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="text"
            className="form-control"
          />
          {errors.name && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input
            {...register("age", { required: true, min: 18, max: 100 })}
            id="age"
            type="number"
            className="form-control"
          />
          {errors.age && (
            <span className="text-danger">This field is required</span>
          )}
          {errors.age?.type === "min" && (
            <span className="text-danger">Age must be greater than 18</span>
          )}
          {errors.age?.type === "max" && (
            <span className="text-danger">Age must be less than 100</span>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;

```

### 🟢 Schema-Based Validation with Zod

#### Validation Libs

- Joi
- Yub
- Zod

`npm install zod` <br/>
`npm i @hookform/resolvers`

```typeScript
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, "You must be at least 18 years old"),
});

type FormData = z.infer<typeof schema>;

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-25">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            id="age"
            type="number"
            className="form-control"
          />
          {errors.age && (
            <span className="text-danger">{errors.age.message}</span>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;

```

### 🟢 Disable the submit Button

```typeScript
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, "You must be at least 18 years old"),
});

type FormData = z.infer<typeof schema>;

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-25">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            id="age"
            type="number"
            className="form-control"
          />
          {errors.age && (
            <span className="text-danger">{errors.age.message}</span>
          )}
        </div>
        <button disabled={isValid} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;

```

### 🟢 Building ExpenseList

`expenseList.tsx`

```typeScript
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
  );
}

export default ExpenseList;

```

`App.tsx`

```typeScript
import { useState } from "react";
import ExpenseList from "./components/ExpenseList";

function App() {
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
  if (expenses.length === 0) return <h2>No expenses found</h2>;
  return (
    <div>
      <ExpenseList
        expenses={expenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
}

export default App;

```

### 🟢 Building ExpenseFilter

`ExpenseFilter.tsx`

```typeScript
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
        <option value="all" selected>
          All
        </option>
        <option value="Groceries">Groceries</option>
        <option value="Electronics">Electronics</option>
        <option value="auAuto & Transportto">Auto & Transport</option>
        <option value="Furniture">Furniture</option>
      </select>
    </div>
  );
}

export default ExpenseFilter;

```

`App.tsx`

```typeScript
import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";

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
```

### 🟢 Building the expense Form

```typeScript
import { categories } from "../App";

const ExpenseForm = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input type="text" className="form-control" id="title" />
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input type="number" className="form-control" id="amount" />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select className="form-select" id="category">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <hr />
    </form>
  );
};

export default ExpenseForm;

```

### 🟢 Integrating with React Hook Form and Zod

```typeScript
import { z } from "zod";
import { categories } from "../constants/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  amount: z
    .number({ invalid_type_error: "Amount field is required" })
    .min(1, "Amount must be greater than 0"),
  category: z.enum(categories),
});

type ExpenseFormData = z.infer<typeof schema>;

const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
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
          {...register("amount")}
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

```

### 🟢 Adding an Expense

`ExpenseFilter.tsx`

```typeScript
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

```

`App.tsx`

```typeScript
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

```

#### Terms

- React Hook Form
- Ref hook
- Schema-based validation libraries
- Zod

#### Summary

- To handle form submissions, we set the onSubmit attribute of the form element.
- We can use the ref hook to access elements in the DOM. This technique is often used to
  read the value of input fields upon submitting a form.
- We can also use the state hook to create state variables and update them as the user
  types into input fields. With this technique, every time the user types a character into an
  input field, the component containing the form gets re-rendered. While in theory this
  can cause a performance penalty, in practice this is often negligible.
- React Hook Form is a popular library that helps us build forms quickly with less code.
  With React Hook Form, we no longer have to worry about using the ref or state hooks
  to manage the form state.
- React Hook Form supports the standard HTML attributes for data validation such as
  required, minLength, etc.
- We can validate our forms using schema-based validation libraries such as joi, yup, zod,
  etc. With these libraries, we can define all our validation rules in a single place called a
  schema.

### 🔥 HANDLING FORM SUBMISSION

```javascript
const App = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Submitted");
  };

  return <form onSubmit={handleSubmit}></form>;
};
```

---

### 🔥 ACCESSING INPUT FIELDS USING THE REF HOOK

```javascript
const App = () => {
  const nameRef = useRef < HTMLInputElement > null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (nameRef.current) {
      console.log(nameRef.current.value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" />
    </form>
  );
};
```

### 🔥 MANAGING FORM STATE USING THE STATE HOOK

```javascript
const App = () => {
  const [name, setName] = useState("");

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </form>
  );
};
```

---

### 🔥 MANAGING FORM STATE USING REACT HOOK FORM

```javascript
import { FieldValues, useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log("Submitting the form", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} type="text" />
    </form>
  );
};
```

### 🔥 VALIDATION USING HTML5 ATTRIBUTES

```javascript
const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    console.log('Submitting the form', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} type="text" />
      {errors.name?.type === 'required' && <p>Name is required.</p>}
    </form>
  );
};
```

---

### 🔥 DISABLING THE SUBMIT BUTTON

```javascript
const App = () => {
  const {
    formState: { isValid },
  } = useForm<FormData>();

  return (
    <form>
      <button disabled={!isValid}>Submit</button>
    </form>
  );
};
```

### 🔥 SCHEMA-BASED VALIDATION WITH ZOD

```typeScript
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the schema using zod
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long")
});

// Infer the form data type from the schema
type FormData = z.infer<typeof schema>;

const App = () => {
  // Initialize the form with useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  // Handle form submission
  const onSubmit = (data: FieldValues) => {
    console.log('Submitting the form', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} type="text" />
      {errors.name && <p>{errors.name.message}</p>}
    </form>
  );
};

export default App;

```
