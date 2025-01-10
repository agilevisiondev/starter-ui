export default function DashboardPage({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-4 md:mt-4 ${className}`}>{children}</div>;
}
