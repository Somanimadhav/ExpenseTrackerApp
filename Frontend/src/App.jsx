import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import "./index.css";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showExpenseReport, setShowExpenseReport] = useState(false);
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [editingExpense, setEditingExpense] = useState(null);
  const [showEditExpense, setShowEditExpense] = useState(false);

  // Fetch expenses from backend
  const fetchExpenses = () => {
    fetch("http://localhost:5000/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Error fetching expenses:", err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = () => setShowAddExpense(!showAddExpense);
  const handleExpenseReport = () => setShowExpenseReport(!showExpenseReport);

  const addExpense = () => {
    fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, date, value }),
    })
      .then((res) => res.json())
      .then(() => {
        setLabel("");
        setDate("");
        setValue("");
        setShowAddExpense(false);
        fetchExpenses();
      })
      .catch((err) => console.error("Error adding expense:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/expenses/${id}`, {
      method: "DELETE",
    }).then(() => fetchExpenses());
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setShowEditExpense(true);
  };

  const handleUpdateExpense = () => {
    fetch(`http://localhost:5000/expenses/${editingExpense._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingExpense),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingExpense(null);
        setShowEditExpense(false);
        fetchExpenses();
      });
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Group expenses for pie chart
  const pieData = Object.entries(
    expenses.reduce((acc, expense) => {
      const label = expense.label || "Other";
      acc[label] = (acc[label] || 0) + Number(expense.value);
      return acc;
    }, {})
  ).map(([label, value], index) => ({
    id: index,
    value,
    label,
  }));

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-[3%] w-[80%] mx-auto">
        <h1 className="text-2xl font-medium text-[#555]">Expense Tracker</h1>

        <div className="relative flex justify-between items-center mt-5 w-full max-w-[800px]">
          <button
            className="bg-[#af8978] p-[10px] border-none outline-none cursor-pointer text-white"
            onClick={handleAddExpense}
          >
            Add Expense
          </button>

          <div className="relative flex items-center gap-[300px]">
            <button
              className="bg-[#af8978] p-[10px] border-none outline-none cursor-pointer text-white"
              onClick={handleExpenseReport}
            >
              Expense Report
            </button>

            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-[10px] w-[150px] border-2 border-[#444] border-solid"
            />

            {showExpenseReport && (
              <div className="fixed z-[999] flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] h-[400px] bg-[#fff] shadow-xl p-4">
                <FaWindowClose
                  className="self-end text-2xl text-red-500 cursor-pointer"
                  onClick={handleExpenseReport}
                />
                <PieChart
                  series={[
                    {
                      data:
                        pieData.length > 0
                          ? pieData
                          : [{ id: 0, value: 1, label: "No Data" }],
                      innerRadius: 25,
                      outerRadius: 80,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -45,
                      endAngle: 225,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                />
              </div>
            )}
          </div>

          {/* ➕ Add Expense */}
          {showAddExpense && (
            <div className="absolute z-[999] flex flex-col top-[20px] left-0 h-[300px] w-[300px] bg-[#fff] shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                onClick={handleAddExpense}
              />
              <label className="mt-[10px] font-semibold text-[14px]">
                Expense Name
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Snacks"
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
              />
              <label className="mt-[10px] font-semibold text-[14px]">
                Expense Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
              />
              <label className="mt-[10px] font-semibold text-[14px]">
                Expense Amount
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="100"
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
              />
              <button
                onClick={addExpense}
                className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]"
              >
                Add Expense
              </button>
            </div>
          )}

          {/* ✏️ Edit Expense */}
          {showEditExpense && editingExpense && (
            <div className="absolute z-[999] flex flex-col top-[20px] left-0 h-[300px] w-[300px] bg-[#fff] shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                onClick={() => {
                  setEditingExpense(null);
                  setShowEditExpense(false);
                }}
              />
              <label className="mt-[10px] font-semibold text-[14px]">
                Expense Name
              </label>
              <input
                type="text"
                value={editingExpense.label}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    label: e.target.value,
                  })
                }
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
              />
              <label className="mt-[10px] font-semibold text-[14px]">
                Expense Date
              </label>
              <input
                type="date"
                value={editingExpense.date}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    date: e.target.value,
                  })
                }
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
              />
              <label className="mt-[10px] font-semibold text-[14px]">
                Expense Amount
              </label>
              <input
                type="number"
                value={editingExpense.value}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    value: e.target.value,
                  })
                }
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
              />
              <button
                onClick={handleUpdateExpense}
                className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]"
              >
                Update Expense
              </button>
            </div>
          )}
        </div>

        {/* 🧾 Render filtered expenses */}
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <div
              key={expense._id}
              className="relative flex justify-between items-center w-[80vw] h-[50px] bg-[#f3edeb] my-[20px] py-[10px]"
            >
              <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
                {expense.label}
              </h2>
              <span className="m-[20px] text-[#555] text-[14px]">
                {expense.date}
              </span>
              <span className="m-[20px] text-[14px] font-medium">
                ₹ {expense.value}
              </span>
              <div className="m-[20px] grid">
                <FaTrash
                  className="text-[red] mb-[5px] cursor-pointer"
                  onClick={() => handleDelete(expense._id)}
                />
                <FaEdit
                  className="text-[red] mb-[5px] cursor-pointer"
                  onClick={() => handleEditClick(expense)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-5">No expenses found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
