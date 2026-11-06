import {lazy} from "react";

export const Login = lazy(() => import("../pages/Login"));
export const MainLayout = lazy(() => import("../components/Layout/MainLayout"));
export const KnowledgeBaseList = lazy(() => import("../pages/KnowledgeBase/List"));
export const KnowledgeBaseDetail = lazy(() => import("../pages/KnowledgeBase/Detail"));
export const Chat = lazy(() => import("../pages/Chat"));
export const NotFound = lazy(() => import("../pages/NotFound"));
export const KnowledgeBaseBoundary = lazy(() => import("./KnowledgeBaseBoundary"));