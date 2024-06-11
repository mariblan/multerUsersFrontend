import { useState } from 'react';
import axios from 'axios';

function NewUserForm({ onUserAdded }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log('name:', name, 'value:', value, 'files:', files);
    setUserData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  console.log(userData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('image', userData.image);
    console.log('formData:', formData);

    try {
      const response = await axios.post(
        'http://localhost:8040/users',
        formData
      );
      console.log('New user added:', response.data);
      onUserAdded(response.data);
      alert('User added');
      // reset form
      setUserData({
        name: '',
        email: '',
        image: null,
      });
    } catch (error) {
      console.error('Error adding book', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new User</h1>
      <div>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={userData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor='author'>Email:</label>
        <input
          type='text'
          name='email'
          value={userData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor='image'>Image:</label>
        <input type='file' name='image' onChange={handleChange} />
      </div>
      <button type='submit'>Add User</button>
    </form>
  );
}

export default NewUserForm;
