import userService, { User } from "./services/user-service";
import useUser from "./hooks/useUser";

function App() {
  const {users, error, loading, setUsers } = useUser();

  const handleDelete = (user: User) => () => {
    const originalUsers = [...users];
    setUsers(originalUsers.filter((u) => u.id !== user.id));

    userService.delete(user.id).catch((error) => {
      console.error("Error deleting user:", error);
      setUsers(originalUsers); // Revert to original state
    });
  };

  const handleAddUser = () => {
    const newUser = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: "New User",
      email: "newuser@example.com",
    };
    setUsers([...users, newUser]);

    userService
      .add(newUser)
      .then((response) => {
        console.log("User added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handleEdit = (user: User) => () => {
    const updatedUser = { ...user, name: "Updated User" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.edit(updatedUser).catch((error) => {
      console.error("Error updating user:", error);
      setUsers(users.map((u) => (u.id === user.id ? user : u))); // Revert to original state
    });
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <h1>Users</h1>
      <hr />
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}{" "}
            <button onClick={handleEdit(user)}>Edit</button>{" "}
            <button onClick={handleDelete(user)}>Delete</button>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
