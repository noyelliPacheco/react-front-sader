import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "sonner";
//import { checkAuthAction } from "./modulos/auth/actions/check-auth.action";
import { type PropsWithChildren } from 'react';
import { CustomFullScreenLoading } from "./modulos/auth/components/custom/CustomFullScreenLoading";
import { useAuth } from "./modulos/auth/admin/auth.admin";


const queryClient = new QueryClient();
//
const CheckAuthProvider = ({children}: PropsWithChildren) =>{
    const { checkAuthStatus } = useAuth();
    const {  isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,//Esta acción es importante 
        refetchInterval: 1000* 60 * 0.5,//Validamos cada media hora el token 
        refetchOnWindowFocus:true//Nos ayudan cuando el usuario vuelve a la pestaña
    });

    if(isLoading) return <CustomFullScreenLoading />;
    return children;
};

export const AgriculturaApp = () => {
    //Verificar el estado de autenticación al iniciar la aplicación    
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <CheckAuthProvider >
                <RouterProvider router={appRouter}/>               
            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );  
}

