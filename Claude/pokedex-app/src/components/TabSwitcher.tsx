"use client";

interface TabSwitcherProps {
  activeTab: "all" | "favorites";
  onSwitch: (tab: "all" | "favorites") => void;
}

export default function TabSwitcher({ activeTab, onSwitch }: TabSwitcherProps) {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => onSwitch("all")}
        className={`px-6 py-2 font-medium text-sm cursor-pointer transition-colors ${
          activeTab === "all"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        All
      </button>
      <button
        onClick={() => onSwitch("favorites")}
        className={`px-6 py-2 font-medium text-sm cursor-pointer transition-colors ${
          activeTab === "favorites"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Favorites
      </button>
    </div>
  );
}
