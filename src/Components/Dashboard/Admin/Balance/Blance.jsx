import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Spinner from "../../../Common/Loading/Spinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
function Blance() {
  const axiosSecure = useAxiosSecure();
  const [balanceData, setBalanceData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        const balanceResponse = await axiosSecure.get("/balance");
        setBalanceData(balanceResponse.data);

        const statsResponse = await axiosSecure.get("/stats");
        setStatsData(statsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching balance data:", error);
        setLoading(false);
      }
    };

    fetchBalanceData();
  }, []);

  if (loading) return <Spinner />;
  if (!balanceData || !statsData) return <div>Error loading data</div>;

  const { totalBalance, transactions } = balanceData;
  const { totalSubscribers, totalPaidMembers } = statsData;

  const chartData = [
    { name: "Total Subscribers", value: totalSubscribers },
    { name: "Total Paid Members", value: totalPaidMembers },
  ];

  const COLORS = ["#0088FE", "#00C49F"];
  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-[#981840] mb-8">
        Balance Overview
      </h2>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-4">
        <h3 className="text-3xl font-bold text-center text-[#981840]">
          Total Balance: ${totalBalance}
        </h3>
        <div className="mt-8">
          <h4 className="text-xl font-bold text-[#981840] mb-4">
            Last Six Transactions
          </h4>
          <ul className="list-disc list-inside">
            {transactions.map((transaction, index) => (
              <li key={index} className="text-gray-400">
                {transaction.userName} - {transaction.packageName} - $
                {transaction.price}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h4 className="text-xl font-bold text-[#981840] mb-4">
            Newsletter Subscribers vs Paid Members
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Blance;
