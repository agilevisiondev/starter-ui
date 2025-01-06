import { ModeToggle } from "@/components/mode-toggle";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
