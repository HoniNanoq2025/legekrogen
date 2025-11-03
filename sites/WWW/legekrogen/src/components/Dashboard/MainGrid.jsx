import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import DataGridDemo from "./DataGridDemo";

export default function MainGrid() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Oversigt
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Totale brugere"
            value="2,420"
            interval="Sidste 30 dage"
            trend="up"
            data={[200, 240, 220, 280, 240, 300, 320]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Nye kunder"
            value="1,320"
            interval="Sidste 30 dage"
            trend="up"
            data={[100, 140, 180, 220, 260, 240, 300]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Ordre"
            value="540"
            interval="Sidste 30 dage"
            trend="down"
            data={[80, 100, 90, 85, 70, 75, 60]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Omsætning"
            value="12,500 kr"
            interval="Sidste 30 dage"
            trend="up"
            data={[1000, 1200, 1100, 1300, 1400, 1350, 1450]}
          />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Detaljer
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Seneste aktivitet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ingen aktivitet at vise
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <DataGridDemo />
        </Grid>
      </Grid>
    </Box>
  );
}
