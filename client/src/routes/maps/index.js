import React, {Component, Fragment} from 'react'
import { Route } from 'react-router-dom'
import Success from '../../containers/Success'
import RatingPage from '../../containers/RatingPage'
import MapNearbyPosts from '../../containers/MapNearbyPosts'
import MapSearchPage from '../../containers/MapSearchPage'

export default class RouteMapTracks extends Component{
    render(){
        return(
            <Fragment>
                <Route path="/success" component={Success} />
                <Route path="/rating" component={RatingPage} />
                <Route path="/mapnearbyposts" component={MapNearbyPosts} />
                <Route path="/home" component={MapSearchPage} />
            </Fragment>
        )
    }
}