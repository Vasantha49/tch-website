import { useEffect, useState } from 'react';
import { apiGet } from '../api';

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    apiGet('/members').then(setMembers);
  }, []);

  return (
    <div className="section">
      <h1>Members</h1>
      {members.map(m => (
        <p key={m.id}>{m.name} ({m.role})</p>
      ))}
    </div>
  );
}

export default Members;