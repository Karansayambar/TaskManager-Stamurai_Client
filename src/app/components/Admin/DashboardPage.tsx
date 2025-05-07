import { useState } from "react";

import ListPage from "../Comman/ListPage";
import ViewDetails from "../Comman/ViewDetails";
import AdminSidebar from "./Sidebar";
import { Todo } from "@/lib/types";

const AdminDashboardPage = ({ sidebar, viewTask, setViewTask, view }: any) => {
  // const theme = useSelector((state) => state.theme);
  const [currentSelected, setCurrentSelected] = useState<Todo | null>(null);

  return (
    <>
      {/* For Desktop */}
      <div className={`sm:grid grid-cols-10 gap-2 hidden relative`}>
        {/* Sidebar */}
        {sidebar && (
          <div
            className={`bg-white ${
              !sidebar && !viewTask
                ? "col-span-0"
                : !sidebar && viewTask
                ? "col-span-0"
                : sidebar && viewTask
                ? "col-span-2"
                : "col-span-2"
            } z-10`}
          >
            {/* <img
              className="absolute flex z-20 left-20 top-8 rounded-full w-[118px] h-[118px]"
              src="./profile.jfif"
              alt="profileImg"
            /> */}
            <AdminSidebar />
          </div>
        )}
        {/* ListPage */}
        <div
          className={` ${
            !sidebar && !viewTask
              ? "col-span-10"
              : !sidebar && viewTask
              ? "col-span-7"
              : sidebar && viewTask
              ? "col-span-5"
              : "col-span-8"
          } relative`}
        >
          <ListPage
            viewTask={viewTask}
            setViewTask={setViewTask}
            setCurrentSelected={setCurrentSelected}
            sidebar={sidebar}
            view={view}
          />
        </div>
        {/* ViewDetails */}
        {viewTask && (
          <div
            className={` ${
              !sidebar && !viewTask
                ? "col-span-0"
                : !sidebar && viewTask
                ? "col-span-3"
                : sidebar && viewTask
                ? "col-span-3"
                : "col-span-0"
            } z-10`}
          >
            <ViewDetails
              setViewTask={setViewTask}
              setCurrentSelected={setCurrentSelected}
              currentSelected={currentSelected}
            />
          </div>
        )}
      </div>

      {/* For Mobile and Tab */}
      <div className={`grid grid-cols-10 gap-2 sm:hidden container`}>
        {/* Sidebar */}
        {sidebar && (
          <div
            className={`z-10 h-screen overflow-y-auto ${
              !sidebar && !viewTask
                ? "col-span-0"
                : !sidebar && viewTask
                ? "col-span-0"
                : sidebar && viewTask
                ? "col-span-5"
                : "col-span-10"
            }`}
          >
            <img
              className="absolute flex z-20 left-20 top-8 rounded-full w-[118px] h-[118px]"
              src="./profile.jfif"
              alt="profileImg"
            />
            <AdminSidebar />
          </div>
        )}
        {/* ListPage */}
        {!viewTask && (
          <div className={`col-span-10`}>
            <ListPage
              viewTask={viewTask}
              setViewTask={setViewTask}
              setCurrentSelected={setCurrentSelected}
              sidebar={sidebar}
              view={view}
            />
          </div>
        )}
        {/* ViewDetails */}
        {viewTask && (
          <div className={`col-span-10`}>
            <ViewDetails
              setViewTask={setViewTask}
              setCurrentSelected={setCurrentSelected}
              currentSelected={currentSelected}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboardPage;
