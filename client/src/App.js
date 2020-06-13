import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RouteHomePage from './routes/home/index'

export default () => {
  return(
    <Router>
      <Fragment>
        <RouteHomePage/>
      </Fragment>
    </Router>
  )
}
