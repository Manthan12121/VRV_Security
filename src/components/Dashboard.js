

import React, { useState, useEffect } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { PlaneGeometry } from "three";
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "./dashboard.css";

// Extend THREE namespace to include PlaneGeometry
extend({ PlaneGeometry });

// 3D Animated Cyber Grid Background Component
const CyberGrid = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#00ff88" wireframe />
    </mesh>
  );
};

const API_URL = "http://localhost:3001";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [userData, setUserData] = useState({ name: "", role: "" });
  const [roleData, setRoleData] = useState({ name: "", permissions: "" });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}/roles`);
      setRoles(response.data);
    } catch (error) {
      toast.error("Failed to fetch roles.");
    }
  };

  const handleUserSubmit = async () => {
    try {
      if (selectedUser) {
        // Update existing user
        await axios.put(`${API_URL}/users/${selectedUser.id}`, userData);
        toast.success("User updated successfully!");
      } else {
        // Add new user
        await axios.post(`${API_URL}/users`, userData);
        toast.success("User added successfully!");
      }
      setUserDialogOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to save user.");
    }
  };

  const handleRoleSubmit = async () => {
    try {
      if (selectedRole) {
        // Update existing role
        await axios.put(`${API_URL}/roles/${selectedRole.id}`, roleData);
        toast.success("Role updated successfully!");
      } else {
        // Add new role
        await axios.post(`${API_URL}/roles`, roleData);
        toast.success("Role added successfully!");
      }
      setRoleDialogOpen(false);
      fetchRoles();
    } catch (error) {
      toast.error("Failed to save role.");
    }
  };

  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`${API_URL}/${type}/${id}`);
      toast.success("Deleted successfully!");
      if (type === "users") fetchUsers();
      else fetchRoles();
    } catch (error) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 3D Background with Dark Theme */}
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          background: "black", // Dark background
        }}
      >
        <ambientLight intensity={0.4} /> {/* Reduced light for darker theme */}
        <CyberGrid />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />
        <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
      </Canvas>

      {/* Dashboard UI */}
      <Container className="container">
        {/* Updated Heading with Gradient Effect */}
        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: "white",
            fontFamily: "'Roboto', sans-serif",
            background: "linear-gradient(45deg, #00ff88, #00bfff, #ff0080)", // Gradient background
            WebkitBackgroundClip: "text", // Background clip to text
            color: "transparent", // Make text color transparent to show gradient
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Optional text shadow for effect
            fontSize: "2.5rem", // Adjust size as needed
            padding: "10px 0", // Add padding for some space around the text
          }}
        >
          Cybersecurity RBAC Dashboard
        </Typography>

        <Grid container spacing={3} className="grid-container">
          {/* Users Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" style={{ color: "white" }}>
              Users
            </Typography>
            <Button
              variant="contained"
              className="add-button"
              onClick={() => {
                setSelectedUser(null);
                setUserData({ name: "", role: "" });
                setUserDialogOpen(true);
              }}
            >
              Add User
            </Button>
            <Table className="table">
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="table-head-cell">Name</TableCell>
                  <TableCell className="table-head-cell">Role</TableCell>
                  <TableCell className="table-head-cell">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="table-body-row">
                    <TableCell className="table-cell">{user.name}</TableCell>
                    <TableCell className="table-cell">{user.role}</TableCell>
                    <TableCell className="table-cell">
                      <IconButton
                        className="action-icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setUserData({ name: user.name, role: user.role });
                          setUserDialogOpen(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        className="action-icon"
                        onClick={() => handleDelete("users", user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>

          {/* Roles Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" style={{ color: "white" }}>
              Roles
            </Typography>
            <Button
              variant="contained"
              className="add-button"
              onClick={() => {
                setSelectedRole(null);
                setRoleData({ name: "", permissions: "" });
                setRoleDialogOpen(true);
              }}
            >
              Add Role
            </Button>
            <Table className="table">
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="table-head-cell">Role</TableCell>
                  <TableCell className="table-head-cell">Permissions</TableCell>
                  <TableCell className="table-head-cell">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id} className="table-body-row">
                    <TableCell className="table-cell">{role.name}</TableCell>
                    <TableCell className="table-cell">
                      {role.permissions}
                    </TableCell>
                    <TableCell className="table-cell">
                      <IconButton
                        className="action-icon"
                        onClick={() => {
                          setSelectedRole(role);
                          setRoleData({
                            name: role.name,
                            permissions: role.permissions,
                          });
                          setRoleDialogOpen(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        className="action-icon"
                        onClick={() => handleDelete("roles", role.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        {/* User Dialog */}
        <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)}>
          <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <TextField
              label="Role"
              fullWidth
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUserDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUserSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Role Dialog */}
        <Dialog open={roleDialogOpen} onClose={() => setRoleDialogOpen(false)}>
          <DialogTitle>{selectedRole ? "Edit Role" : "Add Role"}</DialogTitle>
          <DialogContent>
            <TextField
              label="Role Name"
              fullWidth
              value={roleData.name}
              onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
            />
            <TextField
              label="Permissions"
              fullWidth
              value={roleData.permissions}
              onChange={(e) => setRoleData({ ...roleData, permissions: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRoleDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleRoleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default Dashboard;
