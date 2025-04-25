// src/App.jsx
import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "registrations"), formData);
      alert("Registered successfully!");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
