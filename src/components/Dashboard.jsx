import React, { useState } from "react";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const Dashboard = ({ username }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Callback to trigger refresh
  const handleExpenseAdded = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExpenseChart />
        </div>
        <div>
          <ExpenseForm username={username} onExpenseAdded={handleExpenseAdded} />
        </div>
      </div>
      {/* Expense summary */}
      <ExpenseList username={username} refreshKey={refreshKey} />
    </div>
  );
};

export default Dashboard;