"use client";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}

export default function FavoriteButton({
  isFavorite,
  onToggle,
  size = "sm",
}: FavoriteButtonProps) {
  const sizeClass = size === "md" ? "w-7 h-7" : "w-5 h-5";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className="cursor-pointer hover:scale-110 transition-transform"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={sizeClass}
        viewBox="0 0 24 24"
        fill={isFavorite ? "#ef4444" : "none"}
        stroke={isFavorite ? "#ef4444" : "#9ca3af"}
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
