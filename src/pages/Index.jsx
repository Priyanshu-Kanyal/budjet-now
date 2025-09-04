import React from "react";
import { ExpenseProvider } from "../context/ExpenseContext";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
const Index = ({ username }) => {
  if (!username) return <div>Please log in.</div>;
  return (
    // Changed "flex align-middle" to "flex flex-col"
    <div className="flex flex-col">
      <Header />
      <main className="main-content">
        <ExpenseProvider username={username}>
          <Dashboard username={username} />
        </ExpenseProvider>
      </main>

    </div>
  );
};

export default Index;