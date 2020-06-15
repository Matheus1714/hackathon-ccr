import React, {Component, Fragment} from 'react'
import { Route } from 'react-router-dom'
import MapSearchPage from '../../containers/MapSearchPage'

export default class RouteMapTracks extends Component{
    render(){
        return(
            <Fragment>
                <Route path="/" component={MapSearchPage} />
            </Fragment>
        )
    }
}
