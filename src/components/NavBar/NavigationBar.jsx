import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import "./NavigationBar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../redux/reducers/authReducer";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../helpers/axios";

function NavigationBar() {
  const user = useSelector((state) => state.data.userInfo);
  const isLoggedIn = localStorage.getItem("token") ? true : false;
  const dispatch = useDispatch();

  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  // const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const logout = useCallback(async () => {
    try {
      await axiosInstance.get("/auth/signOut");
      dispatch(logoutAction());
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="navBar1">
      <Navbar
        color="dark"
        dark
        className="fixed-top d-flex justify-content-between"
        expand="md"
      >
        <NavItem>
          <Link to="/" className="text-white">
            Home
          </Link>
        </NavItem>

        <NavbarToggler style={{ width: "auto" }} />
        <Collapse
          className=""
          isOpen={isOpen}
          navbar
          style={{
            color: "white",
            width: "auto",
          }}
        >
          <Nav className="ml-auto" navbar>
            <NavItem>
              <p className={"m-2 text-white "}>
                {Object.keys(user).length > 0 && `Welcome ${user.name}`}
              </p>
            </NavItem>
            <NavItem
              style={{ cursor: "pointer" }}
              onClick={isLoggedIn ? logout : () => history.push("/login")}
            >
              <p className={"m-2 text-white "}>
                {isLoggedIn ? "Logout" : "Login"}
              </p>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
