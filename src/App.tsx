import { RouterProvider } from "react-router-dom";
import routes from "./router";

function App() {
  return (
    <div>
      < RouterProvider router={routes}/>
    </div>
  )
}

export default App