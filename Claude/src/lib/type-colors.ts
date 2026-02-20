export const TYPE_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string; glow: string }> = {
  Normal:   { bg: "bg-stone-500",    text: "text-stone-100",  border: "border-stone-400",  gradient: "from-stone-600 to-stone-800",    glow: "shadow-stone-500/30" },
  Fire:     { bg: "bg-orange-500",   text: "text-orange-100", border: "border-orange-400", gradient: "from-orange-600 to-red-800",     glow: "shadow-orange-500/40" },
  Water:    { bg: "bg-blue-500",     text: "text-blue-100",   border: "border-blue-400",   gradient: "from-blue-600 to-cyan-800",      glow: "shadow-blue-500/40" },
  Electric: { bg: "bg-yellow-400",   text: "text-yellow-900", border: "border-yellow-300", gradient: "from-yellow-500 to-amber-700",   glow: "shadow-yellow-400/40" },
  Grass:    { bg: "bg-green-500",    text: "text-green-100",  border: "border-green-400",  gradient: "from-green-600 to-emerald-800",  glow: "shadow-green-500/40" },
  Ice:      { bg: "bg-cyan-400",     text: "text-cyan-900",   border: "border-cyan-300",   gradient: "from-cyan-500 to-sky-700",       glow: "shadow-cyan-400/40" },
  Fighting: { bg: "bg-red-600",      text: "text-red-100",    border: "border-red-500",    gradient: "from-red-700 to-rose-900",       glow: "shadow-red-600/40" },
  Poison:   { bg: "bg-purple-500",   text: "text-purple-100", border: "border-purple-400", gradient: "from-purple-600 to-violet-800",  glow: "shadow-purple-500/40" },
  Ground:   { bg: "bg-amber-600",    text: "text-amber-100",  border: "border-amber-500",  gradient: "from-amber-700 to-yellow-900",   glow: "shadow-amber-600/40" },
  Flying:   { bg: "bg-indigo-400",   text: "text-indigo-100", border: "border-indigo-300", gradient: "from-indigo-500 to-purple-700",  glow: "shadow-indigo-400/40" },
  Psychic:  { bg: "bg-pink-500",     text: "text-pink-100",   border: "border-pink-400",   gradient: "from-pink-600 to-rose-800",      glow: "shadow-pink-500/40" },
  Bug:      { bg: "bg-lime-500",     text: "text-lime-100",   border: "border-lime-400",   gradient: "from-lime-600 to-green-800",     glow: "shadow-lime-500/40" },
  Rock:     { bg: "bg-stone-600",    text: "text-stone-100",  border: "border-stone-500",  gradient: "from-stone-700 to-neutral-900",  glow: "shadow-stone-600/30" },
  Ghost:    { bg: "bg-violet-600",   text: "text-violet-100", border: "border-violet-500", gradient: "from-violet-700 to-purple-900",  glow: "shadow-violet-600/40" },
  Dragon:   { bg: "bg-blue-700",     text: "text-blue-100",   border: "border-blue-600",   gradient: "from-blue-800 to-indigo-900",    glow: "shadow-blue-700/40" },
  Dark:     { bg: "bg-neutral-700",  text: "text-neutral-100",border: "border-neutral-600",gradient: "from-neutral-800 to-stone-900",  glow: "shadow-neutral-700/30" },
  Steel:    { bg: "bg-slate-500",    text: "text-slate-100",  border: "border-slate-400",  gradient: "from-slate-600 to-zinc-800",     glow: "shadow-slate-500/30" },
  Fairy:    { bg: "bg-rose-400",     text: "text-rose-100",   border: "border-rose-300",   gradient: "from-rose-500 to-pink-700",      glow: "shadow-rose-400/40" },
};

export function getTypeColor(type: string) {
  return TYPE_COLORS[type] ?? TYPE_COLORS.Normal;
}

export function getPrimaryTypeGradient(types: string[]): string {
  const primary = types[0];
  const secondary = types[1] ?? types[0];
  const c1 = TYPE_COLORS[primary] ?? TYPE_COLORS.Normal;
  const c2 = TYPE_COLORS[secondary] ?? TYPE_COLORS.Normal;
  return `${c1.gradient.split(" ")[0]} ${c2.gradient.split(" ")[1]}`;
}
