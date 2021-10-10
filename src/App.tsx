import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Cities, City, Home, Restaurant, Restaurants } from './containers'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cities" component={Cities} />
        <Route exact path="/cities/:cityId" component={City} />
        <Route
          exact
          path="/cities/:cityId/restaurants"
          component={Restaurants}
        />
        <Route
          exact
          path="/cities/:cityId/restaurants/:restaurantId"
          component={Restaurant}
        />
      </Switch>
    </Router>
  )
}

export default App
