export function Kicker({
  children,
  tone = "bronze",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "bronze" | "sand";
  className?: string;
}) {
  return (
    <p
      className={
        "flex items-center gap-3 text-xs font-medium tracking-[0.22em] uppercase " +
        (tone === "bronze" ? "text-bronze-700" : "text-sand-100/60") +
        " " +
        className
      }
    >
      <span
        className={
          "h-px w-8 " + (tone === "bronze" ? "bg-bronze-600" : "bg-sand-100/40")
        }
      />
      {children}
    </p>
  );
}
