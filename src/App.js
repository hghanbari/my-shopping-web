import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">My Shopping Web</Link>
              <Link to="/admin">Admin</Link>
            </header>
            <main>
              <Routes>
                <Route path="/admin" element={<AdminScreen />} />
                <Route path="" element={<HomeScreen />} />
              </Routes>
            </main>
            <footer>All right is reserved.</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
