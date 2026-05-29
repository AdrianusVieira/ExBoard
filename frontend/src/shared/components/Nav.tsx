import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/entries", label: "Entries" },
  { to: "/categories", label: "Categories" },
  { to: "/recurrents", label: "Recurrents" },
];

const Nav = () => (
  <nav className="bg-white border-b border-black/10 px-6 py-3 flex items-center justify-between">
    <span className="text-sm font-semibold text-[#1a1a2e]">Ex Board</span>
    <div className="flex gap-1">
      {NAV_LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `text-sm px-3 py-1.5 rounded-md transition-colors ${
              isActive
                ? "bg-[#f5f5f7] text-[#1a1a2e] font-medium"
                : "text-[#6b6b80] hover:text-[#1a1a2e]"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default Nav;
