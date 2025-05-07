import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js";
import {
  selectCompletedTasksCount,
  selectImportantTasksCount,
  selectOverdueTasksCount,
  selectTodayTasksCount,
} from "@/app/Selector";
import { useSelector } from "react-redux";

function ChartComponent() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // Removed generic argument

  const todayCount = useSelector(selectTodayTasksCount);
  const overdueCount = useSelector(selectOverdueTasksCount);
  const importantCount = useSelector(selectImportantTasksCount);
  const completedCount = useSelector(selectCompletedTasksCount);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Today's Tasks",
          "Overdue Tasks",
          "Important Tasks",
          "Completed Tasks",
        ],
        datasets: [
          {
            data: [todayCount, overdueCount, importantCount, completedCount],
            borderColor: [
              "rgb(54, 162, 235)",
              "rgb(255, 99, 132)",
              "rgb(255, 206, 86)",
              "rgb(75, 192, 192)",
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right" },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const label = context.label || "";
                const value = context.raw || 0;
                const data = context.dataset.data;
                const total = data.reduce((a: number, b: number) => a + b, 0);
                const percentage =
                  total > 0 ? Math.round((value / total) * 100) : 0;
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        cutoutPercentage: 70, // Replaced `cutout` with `cutoutPercentage`
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [todayCount, overdueCount, importantCount, completedCount]);

  return (
    <div className="w-full max-w-[300px] h-[400px] mx-auto my-4">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default ChartComponent;
