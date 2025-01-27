import Banners from "./Component/Desktop/Navbar/Banners";
import NavbarDesktop from "./Component/Desktop/Navbar/NavbarDesktop";
import MenuDropdown from "./Component/Desktop/Navbar/MenuDropdown";
import NavbarMobile from "./Component/Mobile/Navbar-Mobile/NavbarMobile";


function App() {
  return <>
    <Banners />
    <NavbarDesktop/>
    <MenuDropdown/>
    <NavbarMobile/>

  </>;
}

export default App;
