import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";

function AdminMembers() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [members, setMembers] = useState([]);
  const [file, setFile] = useState(null);

  if (!user || user.role !== "admin") {
    return <h1 className="section">Not authorized</h1>;
  }

  useEffect(() => {
    apiGet("/members/admin").then(setMembers);
  }, []);

  async function promote(id) {
    const res = await apiPost("/members/promote", { id }, token);
    alert(res.message);
    apiGet("/members/admin").then(setMembers);
  }

  async function remove(id) {
    const res = await apiPost("/members/delete", { id }, token);
    alert(res.message);
    apiGet("/members/admin").then(setMembers);
  }

  async function exportExcel() {
    window.location.href = "http://localhost:5000/api/members/export";
  }

  async function importExcel() {
    if (!file) return alert("Please select an Excel file");

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];
      const res = await apiPost("/members/import", { fileBase64: base64 }, token);
      alert(res.message);
      apiGet("/members/admin").then(setMembers);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="section">
      <h1>Manage Members</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={exportExcel}>Export Members</button>
      </div>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={importExcel}>Import Members</button>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Promote</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.role}</td>
              <td>
                {m.role !== "admin" && (
                  <button onClick={() => promote(m.id)}>Make Admin</button>
                )}
              </td>
              <td>
                <button onClick={() => remove(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMembers;