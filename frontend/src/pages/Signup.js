import { useState } from 'react';
import { apiPost } from '../api';

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function submit() {
    const res = await apiPost('/auth/signup', form);
    alert(res.message);
  }

  return (
    <div className="section">
      <h1>Signup</h1>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Signup</button>
    </div>
  );
}

export default Signup;