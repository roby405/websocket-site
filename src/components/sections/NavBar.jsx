import ForumIcon from "../../assets/forum.svg?react";
import ToDoIcon from "../../assets/to-do.svg?react";
import LoginIcon from "../../assets/login.svg?react";

function NavBar() {
  return (
    <nav className="bg-gray-500 p-2 sticky m-1 mr-0 rounded-lg left-0 z-50">
      <div className="container my-auto flex flex-col gap-4">
        <a href="/" className="text-white hover:text-slate-400 text-2xl font-bold">
          <ForumIcon className="w-11 h-11 mr-2" />
        </a>
        <a href="/todo" className="text-white hover:text-slate-400 text-2xl font-bold">
          <ToDoIcon className="w-11 h-11 mr-2" />
        </a>
        {/* <a href="/signup" className="text-white hover:text-slate-400 text-2xl font-bold">
          Su
        </a> */}
        <a href="/signin" className="text-white hover:text-slate-400 text-2xl font-bold">
          <LoginIcon className="w-11 h-11 mr-2" />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;