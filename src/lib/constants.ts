import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Frame,
  Map,
  PieChart,
} from "lucide-react"

// This is sample data.
export const menuItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Courses",
      url: "/courses",
      icon: Frame,
    },
    {
      name: "Tests",
      url: "/test",
      icon: PieChart,
    },
    {
      name: "Reports",
      url: "#",
      icon: Map,
    },
  ],
}

export const courses = [
  {
    id: "id-1736536618677-xh6bz1h",
    title: "Nursery School Overview",
    description: "Hey there this is your first lecture",
    color: "bg-green-600",
    classes: [1, 2, 3, 4, 5],
  },
  {
    id: "id-1736536864387-pt4b0oe",
    title: "Middle School Orientation",
    description: "Hello All this is your first class",
    color: "bg-red-600",
    classes: [5, 6, 7, 8, 9],
  },
  {
    id: "id-1736536864387-pt6b0oe",
    title: "High School Orientation",
    description: "Hello Again this is your first high school class",
    color: "bg-red-600",
    classes: [8, 9, 10],
  },
  {
    id: "id-1736537025015-1t1gdpq",
    title: "Computer Education ",
    description: "Computer Classes",
    color: "bg-red-600",
    classes: [4, 9],
  },
]
