import { useState, useEffect } from 'react';
import axios from 'axios';
import NewUserForm from './NewUserForm';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8040/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error by fetch', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8040/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      alert('User was deleted');
    } catch (error) {
      console.error('Error deleting buser', error);
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <div>
      <NewUserForm onUserAdded={handleUserAdded} />
      {users.length === 0 ? (
        <p>No users available...</p>
      ) : (
        <ul className='book-list'>
          {users.map((user) => (
            <li key={user._id} className='book-item'>
              <h2>{user.name}</h2>
              <p>Author: {user.author}</p>
              {user.image_url && <img src={user.image_url} alt={user.name} />}
              <button onClick={() => handleDelete(user._id)}>DELETE</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
