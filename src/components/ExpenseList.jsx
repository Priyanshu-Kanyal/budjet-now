import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import {
  formatCurrency,
  formatDate,
  getCategoryTextColor,
} from "../utils/expenses";

const ExpenseList = ({ username }) => {
  const { expenses, refreshExpenses } = useExpenses();
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryOptions = [
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
    { value: "health", label: "Health & Medical" },
    { value: "other", label: "Other" },
  ];

  const filteredExpenses = expenses.filter(
    (expense) => categoryFilter === "all" || expense.category === categoryFilter
  );

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/expenses/${username}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Expense deleted");
        refreshExpenses();
      } else {
        toast.error("Failed to delete expense");
      }
    } catch {
      toast.error("Failed to delete expense");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-expense-dark">
          Expense History
        </h2>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
          <p className="mb-2">No expenses found</p>
          {categoryFilter !== "all" && (
            <p>Try changing the category filter or add new expenses.</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`${getCategoryTextColor(expense.category)} font-medium`}>
                        {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;