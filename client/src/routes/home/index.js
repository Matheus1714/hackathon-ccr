import React, {Component, Fragment} from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../../containers/HomePage'

export default class RouteHomePage extends Component{
    render(){
        return(
            <Fragment>
                <Route path="/home" component={HomePage}></Route>
            </Fragment>
        )
    }
}