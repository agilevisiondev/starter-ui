import * as React from "react";

import { NavMain } from "@/components/navigation/nav-main";
import { NavProjects } from "@/components/navigation/nav-projects";
import { NavUser } from "@/components/navigation/nav-user";
import { TeamSwitcher } from "@/components/navigation/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { menuItems } from "@/lib/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
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
      <SidebarRail />
    </Sidebar>
  );
}
