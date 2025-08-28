import { Outlet } from "react-router"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"


function App() {


  return (
    <>
      <Navbar />
      <div className="max-w-11/12 lg:max-w-10/12 mx-auto min-h-[calc(100vh-160px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App
