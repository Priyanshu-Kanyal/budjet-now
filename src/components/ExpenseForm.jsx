import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";

const ExpenseForm = ({ username }) => {
  const { refreshExpenses } = useExpenses();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
    { value: "health", label: "Health & Medical" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (Number(amount) <= 0) {
    toast.error("Amount must be greater than zero");
    setIsSubmitting(false);
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        description,
        amount: Number(amount),
        category,
        date,
      }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Expense added successfully");
      setDescription("");
      setAmount("");
      setCategory("food");
      setDate(new Date().toISOString().split("T")[0]);
      refreshExpenses(); // <-- THIS LINE UPDATES THE EXPENSE LIST
    } else {
      toast.error("Failed to add expense");
    }
  } catch {
    toast.error("Failed to add expense");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-expense-dark mb-6 text-center">
        Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="What did you spend on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            placeholder="0.00"
            value={amount}
            min="0"
            onChange={(e) => {
              const val = e.target.value;
              // Only allow non-negative values
              if (Number(val) >= 0 || val === "") {
                setAmount(val);
              }
            }}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all"
            disabled={isSubmitting}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-expense text-white py-2 rounded-md hover:bg-expense-dark font-medium focus:outline-none focus:ring-2 focus:ring-expense-light transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;