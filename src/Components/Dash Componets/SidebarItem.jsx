export const SidebarItem = ({ icon, label, onClick }) => (
  <button
    className="flex items-center space-x-0.5 md:space-x-3 text-white hover:text-indigo-400 w-full"
    onClick={onClick}
  >
    {icon}
    <span className="text-[8px] md:text-base">{label}</span>
  </button>
);