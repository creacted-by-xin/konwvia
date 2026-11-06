import { Suspense } from "react";
import AuthGuard from "./AuthGuard";
import { createBrowserRouter } from "react-router-dom";
import { Login, MainLayout, KnowledgeBaseList, KnowledgeBaseDetail, Chat, NotFound, KnowledgeBaseBoundary } from "./LazyPages";



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
                        path: "knowledge-bases",
                        element: withLoading(<KnowledgeBaseList />),
                    },
                    {
                        path: "knowledge-bases/:knowledgeBaseId",
                        element: withLoading(<KnowledgeBaseBoundary />),
                        children: [
                            {
                               index: true,
                                element: withLoading(<KnowledgeBaseDetail />),
                            },
                            {
                                path: "chat",
                                element: withLoading(<Chat />),
                            },

                        ]
                    },
                    {
                        path: "*",
                        element: withLoading(<NotFound />),
                    },
                ]
            }
        ]
    }
]);

export default routes;


