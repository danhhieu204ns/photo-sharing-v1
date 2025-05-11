import React, { useState, useEffect } from "react";
import { 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  Box, 
  Divider,
  Avatar,
  Paper,
  Chip,
  CircularProgress
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      // Fetch user details from the API
      setLoading(true);
      fetchModel(`/api/user/${userId}`)
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading user details:', error);
          setError('Failed to load user details. Please try again later.');
          setLoading(false);
        });
    }, [userId]);
    
    if (loading) {
      return (
        <Box className="user-detail-container" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      );
    }
    
    if (!user) {
        return (
            <Typography variant="h5" color="error">
                User not found
            </Typography>
        );
    }
    
    return (
        <Box className="user-detail-container">
            <Card className="user-detail-card" elevation={3}>
                <Box className="user-detail-header">
                    <Avatar 
                        className="user-detail-avatar"
                        sx={{ bgcolor: stringToColor((user.first_name || '') + (user.last_name || '')) }}
                    >
                        {(user.first_name || '').charAt(0) || '?'}{(user.last_name || '').charAt(0) || '?'}
                    </Avatar>
                    <div>
                        <Typography variant="h4" gutterBottom>
                            {user.first_name || user.first || ''} {user.last_name || ''}
                        </Typography>
                        <Chip 
                            label={user.occupation || ''} 
                            sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
                        />
                    </div>
                </Box>
                
                <CardContent className="user-detail-content">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} className="user-detail-section">
                            <Typography variant="subtitle1" className="user-detail-field-label">
                                Location
                            </Typography>
                            <Typography variant="body1" className="user-detail-field-value">
                                {user.location || 'No location provided'}
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={12} className="user-detail-section">
                            <Typography variant="subtitle1" className="user-detail-field-label">
                                About
                            </Typography>
                            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                                <Typography variant="body1" className="user-detail-field-value">
                                    {user.description || 'No description provided'}
                                </Typography>
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Button 
                                variant="contained" 
                                component={Link} 
                                to={`/photos/${userId}`}
                                className="user-detail-button"
                            >
                                View Photos
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
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

export default UserDetail;
