import { useState } from "react";
import TopBar from "./TopBar";
import NavBar from "./NavBar";

const Header = () => {
  const [topBarVisible, setTopBarVisible] = useState(true);

  return (
    <header className="fixed top-0 left-0 w-full z-500">
      {/* TopBar */}
      <TopBar visible={topBarVisible} setVisible={setTopBarVisible} />

      {/* NavBar with transition */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          topBarVisible ? "" : "mt-0"
        }`}
      >
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
