import ForumIcon from "../../assets/forum.svg?react";
import ToDoIcon from "../../assets/to-do.svg?react";
import LoginIcon from "../../assets/login.svg?react";
import AccountIcon from "../../assets/account.svg?react";

function NavBar() {
  return (
    <nav className="bg-gray-500 p-2 sticky m-1 mr-0 rounded-lg left-0 z-50 min-w-12">
      <div className="container my-auto flex flex-col h-full">
        <div className="flex flex-col gap-2">
          <a href="/">
            <ForumIcon className="w-full h-full mr-2" />
          </a>
          <a href="/todo">
            <ToDoIcon className="w-full h-full mr-2" />
          </a>
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col-reverse items-center gap-2">
          <a href="/profile">
            <AccountIcon className="w-full h-full mr-2" />
          </a>
          <a href="/signin">
            <LoginIcon className="w-full h-full mr-2" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
