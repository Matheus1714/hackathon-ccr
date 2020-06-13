import React, {Component, Fragment} from 'react'
import { Route } from 'react-router-dom'
import MapTracks from '../../containers/MapTracks'

export default class RouteMapTracks extends Component{
    render(){
        return(
            <Fragment>
                <Route path="/maptracks" component={MapTracks}></Route>
            </Fragment>
        )
    }
}