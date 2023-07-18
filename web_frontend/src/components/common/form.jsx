import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Form;
