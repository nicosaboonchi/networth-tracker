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

const sampleNetworthData = (): { day: string; net_worth: number }[] => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return {
      day: date.toISOString().split("T")[0],
      net_worth: 12699 + index * 750,
    };
  });
};

export function NetworthChart({
  data,
  networth,
  className,
}: {
  data?: {
    day: string;
    net_worth: number;
  }[];
  networth?: string;
  className?: string;
}) {
  const chartData = data && data.length > 0 ? data : sampleNetworthData();
  const displayNetworth =
    networth ?? fmtCurrency(chartData[chartData.length - 1].net_worth);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Net Worth</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          {displayNetworth}
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
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
              cursor={false}
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
