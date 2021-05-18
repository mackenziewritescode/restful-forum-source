import React, { useState, createContext, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles.scss";
import store from "./store";
import { Posts } from "./components/Posts/Posts";
import { Replies } from "./components/Posts/Post/Replies/Replies";
import ScrollToTop from "./ScrollToTop";

export const PostContext = createContext();

const App = ({ match }) => {
  const [currentPostId, setCurrentPostId] = useState("");

  useEffect(() => {
    document.title = "Restful Forum";
  });

  // if match doesn't exist (because it's running offline), change the path
  const url = !match ? "/restful-forum" : match.url;

  return (
    <Router>
      <Provider store={store}>
        <PostContext.Provider value={{ currentPostId, setCurrentPostId }}>
          <ScrollToTop />
          <Switch>
            <Route exact path={url} component={Posts} />
            <Route exact path={url + "/posts/:postId"} component={Replies} />
          </Switch>
        </PostContext.Provider>
      </Provider>
    </Router>
  );
};

export default App;
