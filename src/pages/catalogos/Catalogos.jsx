import { Route, Routes } from "react-router-dom"
import routes from "@/routes";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
const Catalogos = () => {
  return (
    <>
    
    <Routes>
        {/* {routes.map(
          ({ layout, pages }) =>
            layout === "catalogos" &&
          pages.map(({ path, element }) => (
            <Route exact path={path} element={element} />
          ))
        )} */}
      </Routes>
      <div className="text-blue-gray-600">
          <Footer />
        </div>

          </>

  )
}

export default Catalogos
