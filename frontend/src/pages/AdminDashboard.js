function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <h1>Not authorized</h1>;
  }

  return (
    <div className="section">
      <h1>Admin Dashboard</h1>
      <a href="/admin/events">Manage Events</a><br />
      <a href="/admin/members">Manage Members</a>
    </div>
  );
}

export default AdminDashboard;