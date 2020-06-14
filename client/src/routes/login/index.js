import React, {Component, Fragment} from 'react'
import { Route } from 'react-router-dom'
import Login from '../../containers/Login'

export default class RouteLogin extends Component{
    render(){
        return(
            <Fragment>
                <Route path="/login" component={Login}></Route>
            </Fragment>
        )
    }
}