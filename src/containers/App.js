import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

const App = () => {
  const [searchfield, setSearchfield] = useState("");
  const [robots, setRobots] = useState([]);
  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);
  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  if (!robots.length) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="tc">
        <header>
          <h1 className="f1">RoboFriends</h1>
        </header>
        <main>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </main>
      </div>
    );
  }
};

export default App;
