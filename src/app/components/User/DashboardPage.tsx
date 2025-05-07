// import { useState } from "react";
// // import { Todo } from "@/types/todo"; // Ensure this is the correct import path
// import UserSidebar from "./Sidebar";
// import ListPage from "../Comman/ListPage";
// import ViewDetails from "../Comman/ViewDetails";
// import { Todo } from "@/lib/types";

// const UserDashboardPage = ({ sidebar, viewTask, setViewTask, view }: any) => {
//   const [currentSelected, setCurrentSelected] = useState<Todo | null>(null); // updated state type

//   return (
//     <>
//       {/* Desktop Layout */}
//       <div className="sm:grid grid-cols-10 gap-2 hidden relative ">
//         {/* Sidebar */}
//         {sidebar && (
//           <div className="bg-white col-span-2 z-10">
//             <UserSidebar />
//           </div>
//         )}

//         {/* ListPage */}
//         <div
//           className={`relative ${
//             !sidebar && !viewTask
//               ? "col-span-10"
//               : !sidebar && viewTask
//               ? "col-span-7"
//               : sidebar && viewTask
//               ? "col-span-5"
//               : "col-span-8"
//           }`}
//         >
//           <ListPage
//             viewTask={viewTask}
//             setViewTask={setViewTask}
//             setCurrentSelected={setCurrentSelected}
//             sidebar={sidebar}
//             view={view}
//           />
//         </div>

//         {/* ViewDetails */}
//         {viewTask &&
//           currentSelected && ( // Ensure currentSelected exists
//             <div className="col-span-3 z-10">
//               <ViewDetails
//                 setViewTask={setViewTask}
//                 setCurrentSelected={setCurrentSelected}
//                 currentSelected={currentSelected}
//               />
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default UserDashboardPage;

import { useState } from "react";
import UserSidebar from "./Sidebar";
import ListPage from "../Comman/ListPage";
import ViewDetails from "../Comman/ViewDetails";
import { Todo } from "@/lib/types";

const UserDashboardPage = ({ sidebar, viewTask, setViewTask, view }: any) => {
  const [currentSelected, setCurrentSelected] = useState<Todo | null>(null);

  const handleSelectTodo = (todo: Todo) => {
    setCurrentSelected(todo);
  };

  return (
    <div className="sm:grid grid-cols-10 gap-2 hidden relative">
      {sidebar && (
        <div className="bg-white col-span-2 z-10">
          <UserSidebar />
        </div>
      )}

      <div
        className={`relative ${
          !sidebar && !viewTask
            ? "col-span-10"
            : !sidebar && viewTask
            ? "col-span-7"
            : sidebar && viewTask
            ? "col-span-5"
            : "col-span-8"
        }`}
      >
        <ListPage
          viewTask={viewTask}
          setViewTask={setViewTask}
          setCurrentSelected={handleSelectTodo}
          sidebar={sidebar}
          view={view}
        />
      </div>

      {viewTask && currentSelected && (
        <div className="col-span-3 z-10">
          <ViewDetails
            setViewTask={setViewTask}
            setCurrentSelected={setCurrentSelected}
            currentSelected={currentSelected}
          />
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;
