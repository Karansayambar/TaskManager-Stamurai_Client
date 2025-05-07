import {
  filterTodayData,
  filterImportantData,
  filterCompletedData,
  filterDueDateData,
} from "@/lib/slices/taskSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchAllTasks, readAssignTasks } from "@/lib/thunk/taskThunk";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChartComponent from "../Comman/Chart";

const UserSidebar = () => {
  const [isActive, setIsActive] = useState<string>("MYTASK");
  const dispatch = useDispatch<AppDispatch>();

  // Fetch tasks on mount
  useEffect(() => {
    dispatch(fetchAllTasks());
    // dispatch(readAssignTasks());
  }, [dispatch]);

  // Handle sidebar item selection
  const handleChange = (filterType: string) => {
    setIsActive(filterType);
    switch (filterType) {
      case "MYTASK":
        dispatch(readAssignTasks());
        break;
      case "TODAY":
        dispatch(filterTodayData());
        break;
      case "IMPORTANT":
        dispatch(filterImportantData());
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
    <div className="py-10 flex flex-col space-y-4 bg-white  ">
      <div
        className="p-8 flex flex-col gap-4"
        style={{ backgroundColor: "#EEF6EF" }}
      >
        <div className="flex-col flex bg-white rounded-sm">
          <ul className="px-3 py-6 flex-col flex space-y-2 font-semibold text-black/70">
            {["MYTASK", "TODAY", "IMPORTANT", "COMPLETED", "DUEDATE"].map(
              (item) => (
                <li
                  key={item}
                  className={`flex justify-start cursor-pointer space-x-4 py-2 px-1 rounded-sm ${
                    isActive === item ? "bg-[#35793729]" : ""
                  }`}
                  onClick={() => handleChange(item)}
                >
                  <span>
                    {item
                      .replace("MYTASK", "My Task")
                      .replace("IMPORTANT", "Important")
                      .replace("COMPLETED", "Completed")
                      .replace("TODAY", "Today")
                      .replace("DUEDATE", "Due Date")}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <ChartComponent />
    </div>
  );
};

export default UserSidebar;
