import React, { useState, useEffect } from "react";
import { 
  Typography, 
  Card, 
  CardContent,
  CardMedia,
  Grid, 
  Box, 
  Divider,
  List,
  Paper,
  Avatar,
  Stack,
  CircularProgress
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
    const { userId } = useParams();
    const [photos, setPhotos] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      // Load both user details and photos
      setLoading(true);
      
      // Fetch user data
      const fetchUserData = fetchModel(`/api/user/${userId}`);
      
      // Fetch photos data
      const fetchPhotosData = fetchModel(`/api/photo/${userId}`);
      
      // Wait for both requests to complete
      Promise.all([fetchUserData, fetchPhotosData])
        .then(([userData, photosData]) => {
          setUser(userData);
          setPhotos(photosData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading user photos:', error);
          setError('Failed to load photos. Please try again later.');
          setLoading(false);
        });
    }, [userId]);

    if (loading) {
      return (
        <Box className="photo-container" display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '300px' }}>
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

    if (!photos || photos.length === 0) {
        return (
            <Typography variant="h5">
                No photos found for {user.first_name || user.first || ''} {user.last_name || ''}
            </Typography>
        );
    }

    const formatDateTime = (dateTimeStr) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateTimeStr).toLocaleDateString(undefined, options);
    };

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

    return (
        <Box className="photo-container">
            <Typography variant="h4" gutterBottom className="photo-page-title">
                Photos by {user.first_name} {user.last_name}
            </Typography>
            
            <Grid container spacing={3}>
                {photos.map((photo) => (
                    <Grid item xs={12} key={photo._id}>
                        <Card elevation={3} className="photo-card">
                            <CardMedia
                                component="img"
                                image={`/images/${photo.file_name}`}
                                alt={`Photo by ${user.first_name || user.first || ''}`}
                                className="photo-image"
                            />
                            <CardContent>
                                <Typography variant="body2" className="photo-date">
                                    {formatDateTime(photo.date_time)}
                                </Typography>
                                
                                <Divider sx={{ my: 2 }} />
                                
                                <Typography variant="h6" className="comments-title">
                                    Comments ({photo.comments ? photo.comments.length : 0})
                                </Typography>
                                
                                {photo.comments && photo.comments.length > 0 ? (
                                    <List className="comments-section">
                                        {photo.comments.map((comment) => (
                                            <Paper elevation={1} className="comment-item" sx={{ p: 2 }} key={comment._id}>
                                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                                    <Avatar 
                                                        sx={{ 
                                                            bgcolor: stringToColor((comment.user?.first_name || '') + (comment.user?.last_name || '')),
                                                            width: 32,
                                                            height: 32,
                                                            fontSize: '0.8rem'
                                                        }}
                                                        className="comment-avatar"
                                                    >
                                                        {(comment.user?.first_name || '').charAt(0) || '?'}{(comment.user?.last_name || '').charAt(0) || '?'}
                                                    </Avatar>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Link to={`/users/${comment.user?._id || '0'}`} className="comment-user-link">
                                                            {comment.user?.first_name || ''} {comment.user?.last_name || ''}
                                                        </Link>
                                                        <Typography variant="caption" display="block" className="comment-date">
                                                            {formatDateTime(comment.date_time)}
                                                        </Typography>
                                                        <Typography variant="body1" className="comment-text">
                                                            {comment.comment}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Paper>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body2">
                                        No comments for this photo
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default UserPhotos;
