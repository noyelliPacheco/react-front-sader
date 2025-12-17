import { FileText, 
  Home, 
  Settings, 
  ChevronRight,
  Folder,
  ClipboardList, } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar"
import agriculturaLogoBlanco from "@/assets/img/layout/logo_agricultura_blanco-01.svg";
import agriculturaIcono from "@/assets/img/layout/escudo_25-01.svg";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavLink } from "./NavLink";
import { useState } from "react";

interface MenuItem {
  title: string;
  url?: string;
  icon: any;
  items?: MenuItem[];
}
const menuItems: MenuItem[] = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Padrón",
    icon: FileText,
    items: [
      {
        title: "Agregar|Actualizar ",
        url: "/",
        icon: ClipboardList,
      },
      {
        title: "Eliminar",
        icon: Folder,
        url: "/eliminar/empadronamiento", 
        
      },
    ],
  },
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
  },
];

function MenuItem({ item, level = 0 }: { item: MenuItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  if (item.items && item.items.length > 0) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} >
        <SidebarMenuItem >
          <CollapsibleTrigger asChild >
            <SidebarMenuButton className="w-full" >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.title}</span>
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} 
                  />
                </>
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="border-guinda-150">
              {item.items.map((subItem) => (
                <MenuItem key={subItem.title} item={subItem} level={level + 1} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink 
          to={item.url || "#"} 
          className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        >
          <item.icon className="h-4 w-4" />
          {!isCollapsed && <span>{item.title}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export function AppSidebar() {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon"  className="border-r border-guinda-900/60 bg-guinda-800 text-white">
      <SidebarHeader className="bg-guinda-160 text-white">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-13 w-3xs items-center justify-center rounded-md overflow-hidden">
            {state === "expanded" && ( <img src={agriculturaLogoBlanco} className="h-full w-full object-contain" alt="Logo Agricultura" /> )}
            {state !== "expanded" && ( <img src={agriculturaIcono} className="h-full w-full object-contain" alt="Ícono Agricultura" /> )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-guinda-160 ">
        <SidebarGroup  className="bg-guinda-160 ">
          <SidebarGroupLabel className="bg-guinda-160 text-white">Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu className="">
              {menuItems.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
