import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SensorList from "./pages/SensorList/SensorList";
import SensorInfo from "./pages/SensorList/SensorInfo";

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={SensorList} />
      <Route exact path="/sensors/:sensor_id" component={SensorInfo}/>
    </Router>
  );
};

export default App;
