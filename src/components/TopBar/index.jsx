import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */

function TopBar() {
    const location = useLocation();
    const [contextInfo, setContextInfo] = useState("");
    
    useEffect(() => {
        const path = location.pathname;
        const parts = path.split('/');
        
        let newContextInfo = "";
        
        if (parts.length >= 3 && (parts[1] === 'users' || parts[1] === 'photos')) {
            const userId = parts[2];
            const user = models.userModel(userId);
            
            if (user) {
                if (parts[1] === 'photos') {
                    newContextInfo = `Photos of ${user.first_name} ${user.last_name}`;
                } else {
                    newContextInfo = `${user.first_name} ${user.last_name}`;
                }
            }
        }
        
        setContextInfo(newContextInfo);
    }, [location.pathname]);

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar>
                <Typography variant="h5" color="inherit" className="topbar-title">
                    Mai Danh Hieu
                </Typography>
                {contextInfo && (
                    <Typography variant="h6" color="inherit" className="topbar-context">
                        {contextInfo}
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
