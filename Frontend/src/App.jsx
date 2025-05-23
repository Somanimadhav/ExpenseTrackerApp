import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import "./index.css";
import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showExpenseReport, setShowExpenseReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };

  const handleExpenseReport = () => {
    setShowExpenseReport(!showExpenseReport);
  };

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
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
              className="p-[10px] w-[150px] border-2 border-[#444] border-solid"
            />
            {showExpenseReport && (
              <div className="absolute z-[999] flex flex-col top-[20px] left-0 h-[400px] w-[400px] bg-[#fff] shadow-xl">
                <FaWindowClose
                  className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                  onClick={handleExpenseReport}
                />

                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "series A" },
                        { id: 1, value: 15, label: "series B" },
                        { id: 2, value: 20, label: "series C" },
                      ],
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
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[14px]">
                Expense Date
              </label>
              <input
                type="date"
                placeholder="20-May-2025"
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[14px]">
                Expense Amount
              </label>
              <input
                type="Number"
                placeholder="100"
                className="outline-none border-[#555] p-[10px] border-2 border-solid"
              />
              <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]">
                Add Expense
              </button>
            </div>
          )}
        </div>

        <div className=" flex flex-col">
          <div className="relative flex justify-between items-center w-[80vw] h-[50px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
              Snacks
            </h2>
            <span className="m-[20px] text-[#555] text-[14px]">20/05/2024</span>
            <span className="m-[20px] text-[14px] font-medium">$ 20</span>
            <div className="m-[20px] grid">
              <FaTrash className="text-[red] mb-[5px] cursor-pointer" />
              <FaEdit
                className="text-[red] mb-[5px] cursor-pointer"
                onClick={handleShowEdit}
              />
              {showEdit && (
                <div className="absolute z-[999] flex flex-col top-[20px] left-0 right-[0px] h-[300px] w-[300px] bg-[#fff] shadow-xl">
                  <FaWindowClose
                    className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                    onClick={handleShowEdit}
                  />
                  <label
                    htmlFor=""
                    className="mt-[10px] font-semibold text-[14px]"
                  >
                    Expense Name
                  </label>
                  <input
                    type="text"
                    placeholder="Snacks"
                    className="outline-none border-[#555] p-[10px] border-2 border-solid"
                  />
                  <label
                    htmlFor=""
                    className="mt-[10px] font-semibold text-[14px]"
                  >
                    Expense Date
                  </label>
                  <input
                    type="date"
                    placeholder="20-May-2025"
                    className="outline-none border-[#555] p-[10px] border-2 border-solid"
                  />
                  <label
                    htmlFor=""
                    className="mt-[10px] font-semibold text-[14px]"
                  >
                    Expense Amount
                  </label>
                  <input
                    type="Number"
                    placeholder="100"
                    className="outline-none border-[#555] p-[10px] border-2 border-solid"
                  />
                  <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]">
                    Update Expense
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <div className="relative flex justify-between items-center w-[80vw] h-[50px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
              Electricity Bill
            </h2>
            <span className="m-[20px] text-[#555] text-[14px]">01/01/2025</span>
            <span className="m-[20px] text-[14px] font-medium">$ 120</span>
            <div className="m-[20px] grid">
              <FaTrash className="text-[red] mb-[5px] cursor-pointer" />
              <FaEdit className="text-[red] mb-[5px] cursor-pointer" />
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <div className="relative flex justify-between items-center w-[80vw] h-[50px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
              Hangout w homies
            </h2>
            <span className="m-[20px] text-[#555] text-[14px]">20/02/2025</span>
            <span className="m-[20px] text-[14px] font-medium">$ 200</span>
            <div className="m-[20px] grid">
              <FaTrash className="text-[red] mb-[5px] cursor-pointer" />
              <FaEdit className="text-[red] mb-[5px] cursor-pointer" />
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <div className="relative flex justify-between items-center w-[80vw] h-[50px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
              Tution fees
            </h2>
            <span className="m-[20px] text-[#555] text-[14px]">22/03/2025</span>
            <span className="m-[20px] text-[14px] font-medium">$ 9500</span>
            <div className="m-[20px] grid">
              <FaTrash className="text-[red] mb-[5px] cursor-pointer" />
              <FaEdit className="text-[red] mb-[5px] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
