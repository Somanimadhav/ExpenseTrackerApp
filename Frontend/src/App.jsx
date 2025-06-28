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
  const [editPopupCoords, setEditPopupCoords] = useState(null);

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

  const handleEditClick = (expense, event) => {
    setEditingExpense(expense);
    setShowEditExpense(true);
    setEditPopupCoords({
      x: event.clientX,
      y: event.clientY,
    });
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

        {/* ✅ Fixed controls layout */}
        <div className="flex flex-wrap justify-center items-center gap-4 w-full max-w-[800px] mt-5 relative">
          {/* Add Expense Button and Popover */}
          <div className="relative inline-block">
            <button
              className="bg-[#af8978] px-4 py-2 text-white rounded whitespace-nowrap"
              onClick={handleAddExpense}
            >
              Add Expense
            </button>

            {showAddExpense && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-999">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  onClick={handleAddExpense}
                >
                  <FaWindowClose className="text-xl" />
                </button>
                <h2 className="text-lg font-bold text-[#af8978] mb-4 text-center">
                  Add Expense
                </h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expense Name
                    </label>
                    <input
                      type="text"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="e.g. Groceries"
                      className="w-98% border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#af8978]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expense Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-99% border border-gray-100 rounded px-3 py-2 outline-none focus:border-[#af8978]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expense Amount
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="100"
                      className="w-99% border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#af8978]"
                    />
                  </div>
                  <button
                    onClick={addExpense}
                    className="w-full bg-[#af8978] text-white font-medium py-2 rounded hover:bg-[#8c6757] transition"
                  >
                    Add Expense
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="bg-[#af8978] px-4 py-2 text-white rounded whitespace-nowrap"
            onClick={handleExpenseReport}
          >
            Expense Report
          </button>

          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 flex-1 min-w-[150px] max-w-[300px] border-2 border-[#444] border-solid rounded"
          />
        </div>

        {showExpenseReport && (
          <div className="fixed z-[999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white shadow-xl p-6 rounded-lg border border-gray-200">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={handleExpenseReport}
            >
              <FaWindowClose className="text-xl" />
            </button>
            <h2 className="text-lg font-bold text-[#af8978] mb-4 text-center">
              Expense Report
            </h2>
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
                  cx: 100,
                  cy: 100,
                },
              ]}
              height={200}
              width={250}
            />
          </div>
        )}

        {/* ✏️ Edit Expense Popover */}
        {showEditExpense && editingExpense && editPopupCoords && (
          <div
            className="absolute bg-white border border-gray-200 rounded shadow-lg p-4 z-50"
            style={{
              top: editPopupCoords.y + 10,
              // left: editPopupCoords.x + 10,
              width: "250px",
            }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => {
                setEditingExpense(null);
                setShowEditExpense(false);
              }}
            >
              <FaWindowClose className="text-xl" />
            </button>

            <h2 className="text-lg font-bold text-[#af8978] mb-4">
              Edit Expense
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#af8978]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#af8978]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#af8978]"
                />
              </div>
              <button
                onClick={handleUpdateExpense}
                className="w-full bg-[#af8978] text-white font-medium py-2 rounded hover:bg-[#8c6757] transition"
              >
                Update Expense
              </button>
            </div>
          </div>
        )}

        {/* 🧾 Render filtered expenses */}
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <div
              key={expense._id}
              className="relative flex justify-between items-center w-[80vw] h-[50px] bg-[#f3edeb] my-[20px] py-[10px] px-[20px] rounded"
            >
              <h2 className="text-[#555] text-[18px] font-medium">
                {expense.label}
              </h2>
              <span className="text-[#555] text-[14px]">{expense.date}</span>
              <span className="text-[14px] font-medium">₹ {expense.value}</span>
              <div className="flex gap-3">
                <FaTrash
                  className="text-[red] cursor-pointer"
                  onClick={() => handleDelete(expense._id)}
                />
                <FaEdit
                  className="text-[red] cursor-pointer"
                  onClick={(e) => handleEditClick(expense, e)}
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
