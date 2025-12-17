import {  SidebarProvider, /*SidebarTrigger*/ } from "@/components/ui/sidebar"
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AppSidebar } from "./components/custom/AppSidebar"
import { /*BrowserRouter,*/ Outlet } from "react-router"
import { Header } from "./components/custom/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

 
const queryClient = new QueryClient();
 const InternoLayout = () => {
  return (
     <QueryClientProvider client={queryClient}>
      <Sonner richColors closeButton  theme="light"  />
      <SidebarProvider defaultOpen={true}>
        {/* Sidebar fijo a la izquierda */}
        <AppSidebar />

        <div className="flex flex-1 flex-col">
          {/* Header alineado a la derecha del sidebar */}
          <Header />
          {/* Contenido principal */}
          <main className="flex-1">
              <Outlet />
          </main>
        </div>
      </SidebarProvider>
  // </QueryClientProvider>
  )
}

export default InternoLayout;
