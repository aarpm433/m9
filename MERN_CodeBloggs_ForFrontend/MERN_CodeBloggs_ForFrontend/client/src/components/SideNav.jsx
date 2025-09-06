export default function Sidebar() {
  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col p-4">
      <ul className="flex-1 space-y-4">
        <li>
          <a href="/" className="block p-2 rounded hover:bg-gray-100">
            Home
          </a>
        </li>
        <li>
          <a href="/posts" className="block p-2 rounded hover:bg-gray-100">
            Bloggs
          </a>
        </li>
        <li>
          <a href="/Network" className="block p-2 rounded hover:bg-gray-100">
            Network
          </a>
        </li>
        <li>
          <a href="/Admin" className="block p-2 rounded hover:bg-gray-100">
            Admin
          </a>
        </li>
      </ul>
    </nav>
  );
}
