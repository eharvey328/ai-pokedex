interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

export default function StatBar({ label, value, max, color }: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 w-24 text-right">
        {label}: {value}
      </span>
    </div>
  );
}
