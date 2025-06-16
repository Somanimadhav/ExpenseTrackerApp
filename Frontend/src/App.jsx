import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import "./index.css";
import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { publicRequest } from "./requestMethods";
function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showExpenseReport, setShowExpenseReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [updatedId, setUpdatedId] = useState("");
  const [editId, setEditId] = useState(null);
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };

  const handleExpenseReport = () => {
    setShowExpenseReport(!showExpenseReport);
  };

  const handleShowEdit = (item) => {
    if (editId === item._id) {
      setEditId(null); // close if same item clicked again
    } else {
      setEditId(item._id); // open the edit modal
      setUpdatedId(item._id);
      setUpdatedLabel(item.label);
      setUpdatedAmount(item.value);
      setUpdatedDate(item.date);
    }
  };

  const handleUpdateExpense = async () => {
    if (updatedId) {
      try {
        await publicRequest.put(`/expenses/${updatedId}`, {
          value: updatedAmount,
          label: updatedLabel,
          date: updatedDate,
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleExpense = async () => {
    try {
      await publicRequest.post("/expenses", {
        label,
        date,
        value: amount,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await publicRequest.get("/expenses");
        setExpenses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-[3%] w-[80%] mx-auto">
        <h1 className="text-2xl font-medium text-[#555] ">Expense Tracker</h1>

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
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              className="p-[10px] w-[150px] border-2 border-[#444] border-solid"
            />
            {showExpenseReport && (
              <div className="absolute z-[999] flex flex-col top-[20px] left-[0] h-[300px] w-[300px] bg-[#fff] shadow-xl items-center justify-center">
                <FaWindowClose
                  className="self-start mr-2 mt-2 text-2xl text-red-500 cursor-pointer"
                  onClick={handleExpenseReport}
                />
                <PieChart
                  width={200} // smaller chart
                  height={200}
                  series={[
                    {
                      data: expenses,
                      innerRadius: 20,
                      outerRadius: 70,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 270,
                      cx: 100, // center of 200
                      cy: 100,
                    },
                  ]}
                />
              </div>
            )}
          </div>
          {showAddExpense && (
            <div className="absolute z-[999] flex flex-col top-[20px] left-0 h-[300px] w-[300px] bg-[#fff] shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                onClick={handleAddExpense}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[14px]">
                Expense Name
              </label>
              <input
                type="text"
                placeholder="Snacks"
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
                onChange={(e) => setLabel(e.target.value)}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[14px]">
                Expense Date
              </label>
              <input
                type="date"
                placeholder="20-May-2025"
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[14px]">
                Expense Amount
              </label>
              <input
                type="Number"
                placeholder="100"
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]"
                onClick={handleExpense}
              >
                Add Expense
              </button>
            </div>
          )}
        </div>

        <div className=" flex flex-col">
          {expenses
            .filter((item) => item.label.toLowerCase().includes(searchQuery))
            .map((item, index) => (
              <div
                key={index}
                className="relative flex justify-between items-center w-[80vw] h-[50px] bg-[#f3edeb] my-[20px] py-[10px]"
              >
                <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
                  {item.label}
                </h2>
                <span className="m-[20px] text-[#555] text-[14px]">
                  {item.date}
                </span>
                <span className="m-[20px] text-[14px] font-medium">
                  $ {item.value}
                </span>
                <div className="relative m-[20px] grid">
                  <FaTrash
                    className="text-[red] mb-[5px] cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                  />
                  <FaEdit
                    className="text-[red] mb-[5px] cursor-pointer"
                    onClick={() => handleShowEdit(item)}
                  />
                  {editId === item._id && (
                    <div className="absolute z-[999] flex flex-col top-[20px] left-0 right-[0px] h-[300px] w-[300px] bg-[#fff] shadow-xl">
                      <FaWindowClose
                        className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                        onClick={() => handleShowEdit(item._id)}
                      />
                      <label className="mt-[10px] font-semibold text-[14px]">
                        Expense Name
                      </label>
                      <input
                        type="text"
                        placeholder="Snacks"
                        value={updatedLabel}
                        className="outline-none border-[#555] p-[10px] border-2 border-solid"
                        onChange={(e) => setUpdatedLabel(e.target.value)}
                      />
                      <label className="mt-[10px] font-semibold text-[14px]">
                        Expense Date
                      </label>
                      <input
                        type="date"
                        value={updatedDate}
                        placeholder="20-May-2025"
                        className="outline-none border-[#555] p-[10px] border-2 border-solid"
                        onChange={(e) => setUpdatedDate(e.target.value)}
                      />
                      <label className="mt-[10px] font-semibold text-[14px]">
                        Expense Amount
                      </label>
                      <input
                        type="Number"
                        value={updatedAmount}
                        placeholder="100"
                        className="outline-none border-[#555] p-[10px] border-2 border-solid"
                        onChange={(e) => setUpdatedAmount(e.target.value)}
                      />
                      <button
                        className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]"
                        onClick={handleUpdateExpense}
                      >
                        Update Expense
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
