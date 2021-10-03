import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { City, Home } from "./containers";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/city/:id" component={City} />
      </Switch>
    </Router>
  );
};

export default App;
