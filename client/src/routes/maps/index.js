import React, {Component, Fragment} from 'react'
import { Route } from 'react-router-dom'
import MapTracks from '../../containers/MapTracks'
import Success from '../../containers/Success'

export default class RouteMapTracks extends Component{
    render(){
        return(
            <Fragment>
                <Route path="/maptracks" component={MapTracks}></Route>
                <Route path="/success" component={Success} />
            </Fragment>
        )
    }
}