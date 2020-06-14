import React, {Component, Fragment} from 'react'
import { Route } from 'react-router-dom'
import MapTracks from '../../containers/MapTracks'
import Success from '../../containers/Success'
import RatingPage from '../../containers/RatingPage'
import MapNearbyPosts from '../../containers/MapNearbyPosts'

export default class RouteMapTracks extends Component{
    render(){
        return(
            <Fragment>
                <Route path="/maptracks" component={MapTracks}></Route>
                <Route path="/success" component={Success} />
                <Route path="/rating" component={RatingPage} />
                <Route path="/mapnearbyposts" component={MapNearbyPosts} />
            </Fragment>
        )
    }
}