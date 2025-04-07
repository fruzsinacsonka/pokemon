import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface Inputs {
  username: string;
  email: string;
  password: string;
  name: string;
}

function Register() {
  const [inputs, setInputs] = useState<Inputs>({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3001/auth/register", inputs)
        .then((response) => {
          console.log(response.data);
          navigate("/");
        });
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <div>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <form>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Register</button>
      </form>
    </div>
  );
}

export default Register;
