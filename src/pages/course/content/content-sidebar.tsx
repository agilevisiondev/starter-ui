import * as React from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

interface subChapter {
  subChapterName: string;
}
interface CardData {
  id: number;
  chapterName: string;
  description: string;
  subChapter: subChapter[];
}

export function ContentSidebar({
  displayCardData,
  onContentChange,
  ...props
}: { displayCardData: CardData[]; onContentChange: (key: string) => void } & React.ComponentProps<typeof Sidebar>) {
  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: displayCardData.map((chapter) => ({
      title: chapter.chapterName,
      url: "#",
      items: chapter.subChapter.map((sub) => ({
        title: sub.subChapterName,
        url: "#",
      })),
    })),
  };
  return (
    <div className={props.className}>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible key={item.title} title={item.title} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <ol className="list-decimal pl-4">
                      {item.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link to={item.url} onClick={() => onContentChange(`${item.title}`)}>
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </ol>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </div>
  );
}
