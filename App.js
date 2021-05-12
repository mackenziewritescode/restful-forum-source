import React, { useState, createContext } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.scss";

import store from "./store";
import { Posts } from "./components/Posts/Posts";
import { Replies } from "./components/Posts/Post/Replies/Replies";

export const PostContext = createContext();

const App = ({ match }) => {
  const [currentPostId, setCurrentPostId] = useState("");

  return (
    <Router>
      <Provider store={store}>
        <PostContext.Provider value={{ currentPostId, setCurrentPostId }}>
          <Switch>
            <Route exact path={match.url} component={Posts} />
            <Route
              exact
              path={match.url + "/posts/:postId"}
              component={Replies}
            />
          </Switch>
        </PostContext.Provider>
      </Provider>
    </Router>
  );
};

export default App;
