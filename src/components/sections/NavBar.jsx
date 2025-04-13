function NavBar() {
  return (
    <nav className="bg-zinc-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white hover:text-slate-400 text-2xl font-bold">
          Chat App
        </a>
        <a href="/todo" className="text-white hover:text-slate-400 text-2xl font-bold">
          To Do App
        </a>
        <a href="/signup" className="text-white hover:text-slate-400 text-2xl font-bold">
          Sign Up
        </a>
        <a href="/signin" className="text-white hover:text-slate-400 text-2xl font-bold">
          Sign In
        </a>
      </div>
    </nav>
  );
}

export default NavBar;