import Tasks from "./components/Tasks";
import DAOs from "./components/DAOs";
import Stake from "./components/Stake";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

import React, {useEffect, useState} from "react";
import { Routes, Link as ReactLink, Route } from "react-router-dom";
import {
  Grid,
  Card,
  Input,
  Button,
  Text,
  Spacer,
  Link,
} from "@nextui-org/react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./state/counterSlice";
import { useMoralis } from "react-moralis";

import {
  ListBulletIcon,
  DashboardIcon,
  LayersIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {Moralis} from "moralis";

function App() {
  // this is done only for testing purposes for State Management
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const method = async () => {
    await dispatch(increment());
    console.log("This is the count value from State Management: ", count);
  };

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating
  } = useMoralis();

  //login function Moralis
  const login = async () => {
    // console.log("it works");
    // if (!isAuthenticated) {
    //   await authenticate({ signingMessage: "Log in using Moralis" }).catch(
    //     function (error) {
    //       console.log(error);
    //     }
    //   );
    // }
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
      })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  };

  const logout = async () => {
    await Moralis.User.logOut();

    console.log("logged out");
  }

  return (
    <Grid.Container className="container">
      {/*This button is added only for test purposes and will be removed*/}
      {/*<Button onClick={method}>Increase value</Button>*/}
      {/* Topbar */}
      <Grid xs={12}>
        <Grid.Container
          className="topnav"
          justify="space-between"
          alignItems="center"
        >
          <Grid>
            <a href="#Dashboard">Bounti</a>
          </Grid>
          <Grid>
            <Grid.Container gap={2}>
              <Grid>
                <Input placeholder="Search" />
              </Grid>
              <Grid>
                {isAuthenticated ?
                    <Button auto color="error" onClick={logout}>
                      Logout
                    </Button>
                    :
                    <Button auto disabled={isAuthenticated} onClick={login}>
                      Account
                    </Button>
                }
              </Grid>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Grid>

      {/* Sidebar */}
      <Grid xs={1} className="sidenav">
        <ul>
          <Link>
            <Text wrap color css={{ color: "white" }}>
              <li>
                <ReactLink to="/">
                  <DashboardIcon />
                  Dashboard
                </ReactLink>
              </li>
            </Text>
            <Spacer y={2} />
          </Link>

          <Text color css={{ color: "white" }}>
            <li>
              <ReactLink to="/DAOs">
                <LayersIcon />
                DAOs
              </ReactLink>
            </li>
          </Text>
          <Spacer y={2} />

          <Text color css={{ color: "white" }}>
            <li>
              <ReactLink to="Tasks">
                <ListBulletIcon />
                Tasks
              </ReactLink>
            </li>
          </Text>
          <Spacer y={2} />

          <Text color css={{ color: "white" }}>
            <li>
              <ReactLink to="Profile">
                <PersonIcon />
                Profile
                <Spacer y={2} />
              </ReactLink>
            </li>
          </Text>
        </ul>
      </Grid>

      {/* Content */}
      <Grid xs={11}>
        <Card>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/daos" element={<DAOs />} />
          </Routes>
        </Card>
      </Grid>
    </Grid.Container>
  );
}

export default App;
