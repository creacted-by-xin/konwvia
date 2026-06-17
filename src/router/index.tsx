import Login from "../pages/Login";
import MainLayout from "../components/Layout/MainLayout";
import KnowledgeBaseList from "../pages/KnowledgeBase/List";
import KnowledgeBaseDetail from "../pages/KnowledgeBase/Detail";
import Chat from "../pages/Chat";
import AuthGuard from "./AuthGuard";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <AuthGuard />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <KnowledgeBaseList />,
                    },
                    {
                        path: "KnowledgeBaseList",
                        element: <KnowledgeBaseList />,
                    },
                    {
                        path: "KnowledgeBaseDetail",
                        element: <KnowledgeBaseDetail />,
                    }
                    ,
                    {
                        path: "Chat",
                        element: <Chat />,
                    }
                ]
            }
        ]
    }
]);

export default routes;