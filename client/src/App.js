import React, { Fragment } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import RouteHomePage from './routes/home/index'
import RouteMapTracks from './routes/maps/index';
import RouteLogin from './routes/login/index'

export default () => {
  return(
      <Router>
        <Fragment>
          <RouteHomePage/>
          <RouteMapTracks/>
          <RouteLogin/>
        </Fragment>
      </Router>
  )
}
