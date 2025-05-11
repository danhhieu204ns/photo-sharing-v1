import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  ListItemAvatar,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      // Fetch user list data from the API
      setLoading(true);
      fetchModel('/api/user/list')
        .then((userList) => {
          setUsers(userList);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading user list:', error);
          setError('Failed to load users. Please try again later.');
          setLoading(false);
        });
    }, []);
    
    if (loading) {
      return (
        <div className="user-list-container">
          <Typography variant="h5" component="h1" className="user-list-title">
            Users
          </Typography>
          <div className="loading-container">
            <CircularProgress />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="user-list-container">
          <Typography variant="h5" component="h1" className="user-list-title">
            Users
          </Typography>
          <Typography color="error">{error}</Typography>
        </div>
      );
    }
    
    return (
      <div className="user-list-container">
        <Typography variant="h5" component="h1" className="user-list-title">
          Users
        </Typography>
        <List component="nav" className="user-list">
          {users.map((user) => (
            <React.Fragment key={user._id}>
              <ListItem 
                button 
                component={Link} 
                to={`/users/${user._id}`}
                className="user-list-item"
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: stringToColor((user.first_name || '') + (user.last_name || '')) }}>
                    {(user.first_name || '').charAt(0) || '?'}{(user.last_name || '').charAt(0) || '?'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={`${user.first_name || user.first || ''} ${user.last_name || ''}`}
                  className="user-list-item-text"
                />
              </ListItem>
              <Divider variant="inset" component="li" className="user-list-divider" />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
}

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

export default UserList;
