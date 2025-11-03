import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideMenu({ userRole }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      roles: ["user", "editor", "admin"],
    },
    {
      text: "Profil",
      icon: <PeopleIcon />,
      path: "/profile",
      roles: ["user", "editor", "admin"],
    },
    {
      text: "Editor Panel",
      icon: <EditIcon />,
      path: "/editor",
      roles: ["editor", "admin"],
    },
    {
      text: "Admin Panel",
      icon: <AdminPanelSettingsIcon />,
      path: "/admin",
      roles: ["admin"],
    },
    {
      text: "Analytics",
      icon: <BarChartIcon />,
      path: "/dashboard/analytics",
      roles: ["editor", "admin"],
    },
    {
      text: "Indstillinger",
      icon: <SettingsIcon />,
      path: "/dashboard/settings",
      roles: ["user", "editor", "admin"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <List>
      {filteredMenuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
