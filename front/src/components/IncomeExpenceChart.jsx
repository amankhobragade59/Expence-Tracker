import React, { useMemo } from "react";
import {
  PieChart, Pie, Cell,Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // green for income, red for expense

const IncomeExpenseChart = ({ transactions }) => {
  // Compute totals
  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount), 0);
    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount), 0);
    return { income, expense };
  }, [transactions]);

  const data = [
    { name: "Income", value: summary.income },
    { name: "Expense", value: summary.expense },
  ];

  return (
    <div className="h-96 flex flex-col md:flex-row justify-center items-center p-6 bg-transparent rounded-2xl shadow-md">
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 h-64">
        <h2 className="text-center text-lg font-semibold mb-2">Income vs Expense (Pie)</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
