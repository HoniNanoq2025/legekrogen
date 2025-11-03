import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", salg: 4000, kunder: 2400 },
  { name: "Feb", salg: 3000, kunder: 1398 },
  { name: "Mar", salg: 2000, kunder: 9800 },
  { name: "Apr", salg: 2780, kunder: 3908 },
  { name: "Maj", salg: 1890, kunder: 4800 },
  { name: "Jun", salg: 2390, kunder: 3800 },
  { name: "Jul", salg: 3490, kunder: 4300 },
];

export default function ChartCard() {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="h6" gutterBottom>
          Salg og kunder
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="salg"
              stroke="#1976d2"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="kunder"
              stroke="#dc004e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
