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