import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

interface Inputs {
  username: string;
  password: string;
}

function Login() {
  const [inputs, setInputs] = useState<Inputs>({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const { currentUser, login, logout } = useContext(AuthContext)!;

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/pokemon");
    } catch (err: any) {
      setErr(err.response);
    }
  };

  return (
    <div>
      <div>
        <div>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
