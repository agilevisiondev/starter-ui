import * as React from "react"
import { NavMain } from "@/components/navigation/nav-main"
import { NavProjects } from "@/components/navigation/nav-projects"
import { NavUser } from "@/components/navigation/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { menuItems } from "@/lib/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={menuItems.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems.navMain} />
        <NavProjects projects={menuItems.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={menuItems.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
