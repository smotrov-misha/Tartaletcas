import Background from "../../components/Background/Background";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import OurNames from "../../components/OurNames/OurNames";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Background />
      <NavigationBar />
      <Outlet />
      <OurNames />
    </>
  );
}

export default Root;
