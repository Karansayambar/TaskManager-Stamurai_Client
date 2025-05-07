import {
  filterCompletedData,
  filterDueDateData,
  filterTodayData,
} from "@/lib/slices/taskSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchAllTasks } from "@/lib/thunk/taskThunk";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChartComponent from "../Comman/Chart";

const AdminSidebar = () => {
  const [isActive, setIsActive] = useState<string>("ALL");
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filteredTasks, loading, error } = useSelector(
    (state: RootState) => state.task
  );
  const role = localStorage.getItem("role");

  // Fetch tasks on component mount only once
  useEffect(() => {
    console.log("i am running");
    if (role === "admin") {
      dispatch(fetchAllTasks());
    }
  }, []);

  // Sidebar options config
  const sidebarOptions = [
    { label: "All Tasks", key: "ALL" },
    { label: "Today", key: "TODAY" },
    { label: "Completed", key: "COMPLETED" },
    { label: "Due Date", key: "DUEDATE" },
  ];

  // Handle filter change
  const handleChange = (filterType: string) => {
    setIsActive(filterType);
    switch (filterType) {
      case "ALL":
        if (role === "admin") {
          console.log("i an here 2");
          dispatch(fetchAllTasks());
        }
        break;
      case "TODAY":
        dispatch(filterTodayData());
        break;
      case "COMPLETED":
        dispatch(filterCompletedData());
        break;
      case "DUEDATE":
        dispatch(filterDueDateData());
        break;
      default:
        break;
    }
  };

  return (
    <div className="py-10 flex flex-col space-y-4 w-[380px] bg-white">
      <div
        className="p-8 flex flex-col gap-4"
        style={{ backgroundColor: "#EEF6EF" }}
      >
        <div className="flex-col flex bg-white rounded-sm">
          <ul className="px-3 py-6 flex-col flex space-y-2 font-semibold text-black/70">
            {sidebarOptions.map((item) => (
              <li
                key={item.key}
                className={`flex justify-start cursor-pointer space-x-4 py-2 px-1 rounded-sm ${
                  isActive === item.key ? "bg-[#35793729]" : ""
                }`}
                onClick={() => handleChange(item.key)}
              >
                <div>{/* Icon can go here */}</div>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ChartComponent />
    </div>
  );
};

export default AdminSidebar;
