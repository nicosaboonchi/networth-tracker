"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";
import { fmtCurrency } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const chartConfig = {
  networth: {
    label: "Net Worth",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const netWorthHistory = [
  { date: "2026-01-01", NetWorth: 42000 },
  { date: "2026-01-15", NetWorth: 43500 },
  { date: "2026-02-01", NetWorth: 41800 },
  { date: "2026-02-15", NetWorth: 44200 },
  { date: "2026-03-01", NetWorth: 46000 },
  { date: "2026-03-15", NetWorth: 45100 },
  { date: "2026-04-01", NetWorth: 48300 },
  { date: "2026-04-04", NetWorth: 49100 },
];

export function NetworthChart({ networth }: { networth: string }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Net Worth</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          {networth}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={netWorthHistory}
            margin={{ right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, {
                  month: "short",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}k` : fmtCurrency(value)
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="NetWorth"
              fill="var(--color-networth)"
              stroke="var(--color-networth)"
              fillOpacity={0.4}
              type="natural"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
