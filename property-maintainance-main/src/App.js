import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/Dashboard";
import ServiceManagementPage from "./pages/ServiceManagement";
import CustomerSupportPage from "./pages/CustomerSupport";
import PaymentsPage from "./pages/Payments";
import AdvertismentsPage from "./pages/Advertisments";
import DashboardLayout from "./components/Layout/DashboardLayout";
// import SocketHome from "./components/Socket/Home";
// import SocketChatPage from "./components/Socket/ChatPage";
// import socketIO from "socket.io-client"
// import Messenger from "./components/Messages/Messenger";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./store/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

function App() {
  // const socket = useRef();
  const { user } = useContext(AuthContext);
  // const [isConnected, setIsConnected] = useState(false);
  // useEffect(() => {
  //   socket.current = io("ws://localhost:8900");
  //   setIsConnected(true);
  //   console.log(socket.current);
  // }, [])

  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <DashboardLayout>
            <DashboardPage/>
          </DashboardLayout>
        </Route>
        <Route path='/management'>
          <Layout title="Service Management">
            <ServiceManagementPage/>
          </Layout>
        </Route>
        <Route path='/support'>
          <Layout title="Customer Support">
          <CustomerSupportPage/>
            {/* {isConnected && <CustomerSupportPage socket={socket}/>} */}
          </Layout>
        </Route>
        <Route path='/payments'>
          <Layout title="Payments and Transactions">
            <PaymentsPage/>
          </Layout>
        </Route>
        <Route path='/advertisments'>
          <Layout title="Advertisments">
            <AdvertismentsPage/>
          </Layout>
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/messenger">

          {/* {!user ? <Redirect to="/" /> : isConnected && <Messenger socket={socket}/>} */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
