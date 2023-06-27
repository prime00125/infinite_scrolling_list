
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import '../Component/Home.css'
const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?`results=20');
      const data = await response.json();
      const newUsers = data.results.map((user) => ({
        name: `${user.name.first} ${user.name.last}`,
        photo: user.picture.large,
      }));
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!isLoading) {
        setIsLoading(true);
        setTimeout(fetchUsers, 1000);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h1 id="he">Home Page</h1>
    <Link to="/"><button id="btnout"type="button">Logout</button></Link>
      <ul className="contact-list" id="list">
        {users.map((user, index) => (
          <li key={index} className="contact-item" id="items">
            <img src={user.photo} alt={user.name} className="contact-photo" id="img"/>
            <span className="contact-name" id="names">{user.name}</span>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
