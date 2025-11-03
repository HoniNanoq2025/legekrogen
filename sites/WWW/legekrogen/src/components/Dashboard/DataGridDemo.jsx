import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Navn", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "role", headerName: "Rolle", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <Box
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          bgcolor: params.value === "Aktiv" ? "success.light" : "warning.light",
          color: params.value === "Aktiv" ? "success.dark" : "warning.dark",
          fontSize: "0.75rem",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "actions",
    headerName: "Handlinger",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Box>
        <IconButton
          size="small"
          onClick={() => console.log("Edit", params.row.id)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => console.log("Delete", params.row.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    ),
  },
];

const rows = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jon@mail.com",
    role: "Admin",
    status: "Aktiv",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cersei@mail.com",
    role: "Editor",
    status: "Aktiv",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaime@mail.com",
    role: "User",
    status: "Inaktiv",
  },
  {
    id: 4,
    name: "Arya Stark",
    email: "arya@mail.com",
    role: "Editor",
    status: "Aktiv",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerys@mail.com",
    role: "Admin",
    status: "Aktiv",
  },
  {
    id: 6,
    name: "Melisandre",
    email: "melisandre@mail.com",
    role: "User",
    status: "Aktiv",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferrara@mail.com",
    role: "User",
    status: "Inaktiv",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossini@mail.com",
    role: "Editor",
    status: "Aktiv",
  },
];

export default function DataGridDemo() {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography component="h2" variant="h6">
          Brugerliste
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => console.log("Add new user")}
        >
          Tilføj bruger
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Box>
  );
}
