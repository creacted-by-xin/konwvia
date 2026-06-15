import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import KnowledgeBaseList from "./pages/KnowledgeBaseList";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/KnowledgeBaseList" element={<KnowledgeBaseList />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App