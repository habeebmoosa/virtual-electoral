import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Sidebar.css'
import { faCheckToSlot, faGear, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>E - Voting</h1>
      </div>
      <div className="menu">
        <ul>
          <li className='listItem'>
            <FontAwesomeIcon icon={faCheckToSlot} />
            <Link className="link" to="/dashboard/joinelection">Join Election</Link>
          </li>
          <li className='listItem'>
            <FontAwesomeIcon icon={faSquarePlus} />
            <Link className="link" to="/dashboard/myelection">My Elections</Link>
          </li>
          <li className='listItem'>
            <FontAwesomeIcon icon={faUser} />
            <Link className="link" to="/dashboard/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="logout">
        <button className='btn-white' onClick={()=>{
          localStorage.removeItem('token');
          // navigate('auth/login');
          if(window.location.pathname === '/dashboard' && !localStorage.getItem('token')){
            navigate('/auth/login');
          }
        }}>Log Out</button>
      </div>
    </div>
  );
};