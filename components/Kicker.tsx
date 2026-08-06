export function Kicker({
  children,
  tone = "bronze",
}: {
  children: React.ReactNode;
  tone?: "bronze" | "sand";
}) {
  return (
    <p
      className={
        "flex items-center gap-3 text-xs font-medium tracking-[0.22em] uppercase " +
        (tone === "bronze" ? "text-bronze-700" : "text-sand-100/60")
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
