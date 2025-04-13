import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
    const users = models.userListModel();
    
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
                  <Avatar sx={{ bgcolor: stringToColor(user.first_name + user.last_name) }}>
                    {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={`${user.first_name} ${user.last_name}`}
                  secondary={user.occupation}
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
