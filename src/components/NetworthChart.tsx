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

export function NetworthChart({
  data,
  networth,
}: {
  data?: {
    day: string;
    net_worth: number;
  }[];
  networth?: number | null;
}) {
  const displayNetworth = networth ?? 0;
  const hasData = networth !== null && networth !== undefined;
  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Net Worth</CardDescription>
        <CardTitle
          className={`text-2xl font-semibold tabular-nums ${!hasData ? "text-muted-foreground" : ""}`}
        >
          {hasData ? fmtCurrency(displayNetworth) : "No data"}
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 16, right: 12, left: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              padding={{ left: 25, right: 25 }}
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              domain={[(dataMin: number) => Math.floor(dataMin), "auto"]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={7}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="net_worth"
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
