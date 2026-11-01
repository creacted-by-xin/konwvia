import { Suspense} from "react";
import AuthGuard from "./AuthGuard";
import { createBrowserRouter } from "react-router-dom";
import { Login, MainLayout, KnowledgeBaseList, KnowledgeBaseDetail, Chat } from "./LazyPages";



function withLoading(page: React.ReactNode) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {page}
        </Suspense>
    )
}


const routes = createBrowserRouter([
    {
        path: "/login",
        element: withLoading(<Login />)
    },
    {
        path: "/",
        element: <AuthGuard />,
        children: [
            {
                element: withLoading(<MainLayout />),
                children: [
                    {
                        index: true,
                        element: withLoading(<KnowledgeBaseList />),
                    },
                    {
                        path: "KnowledgeBaseList",
                        element: withLoading(<KnowledgeBaseList />),
                    },
                    {
                        path: "KnowledgeBaseDetail",
                        element: withLoading(<KnowledgeBaseDetail />),
                    },
                    {
                        path: "Chat",
                        element: withLoading(<Chat />),
                    }
                ]
            }
        ]
    }
]);

export default routes;