import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const formHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);
    event.target.reset();

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...users, data];
        setUser(newUser);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <form onSubmit={formHandler}>
        <input type="text" name="name" id="" placeholder="name" />
        <br />
        <input type="email" name="email" id="" placeholder="email" />
        <br />
        <button type="submit">Add user</button>
      </form>

      <h2>user: {users.length}</h2>
      <div className="">
        {users.map((user) => (
          <p key={user._id}>
            {user.name}, {user.email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
