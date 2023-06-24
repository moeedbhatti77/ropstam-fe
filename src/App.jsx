import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Body from "./Pages/HomePage/Body";
import Login from "./components/Auth/login";
import SignUp from "./components/Auth/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PostPage from "./Pages/PostPage/PostPage";
import NavigationBar from "./components/NavBar/NavigationBar";
import axiosInstance from "./helpers/axios";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "./redux/reducers/authReducer";

function App() {
  const dispatch = useDispatch();
  const tokenStorage = localStorage.getItem("token") || null;
  const user = useSelector((state) => state.data.userInfo);
  useEffect(() => {
    if (Object.keys(user).length < 1 && tokenStorage) {
      (async () => {
        const { data } = await axiosInstance.get("/auth/myProfile");
        dispatch(setProfile({ user: data, token: tokenStorage }));
      })();
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Body} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          {/* <Route exact path="/Post/:postId" component={PostPage} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
