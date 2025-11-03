import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function StatCard({ title, value, interval, trend, data }) {
  const chartData = data.map((val, idx) => ({ value: val, index: idx }));
  const trendColor = trend === "up" ? "success.main" : "error.main";

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: 1, gap: 1 }}
        >
          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="h4" component="p">
                {value}
              </Typography>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: "center", color: trendColor }}
              >
                {trend === "up" ? (
                  <TrendingUpIcon fontSize="small" />
                ) : (
                  <TrendingDownIcon fontSize="small" />
                )}
                <Typography variant="caption" sx={{ color: trendColor }}>
                  {trend === "up" ? "+5%" : "-5%"}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {interval}
            </Typography>
          </Stack>
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart data={chartData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={trend === "up" ? "#4caf50" : "#f44336"}
                fill={trend === "up" ? "#4caf5020" : "#f4433620"}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Stack>
      </CardContent>
    </Card>
  );
}
