import React, { Component } from 'react'
import MapNearbyPostsData from './MapNearbyPostsData'

export default class MapNearbyPosts extends Component{
    constructor(props){
        super(props)
        this.state={
            pos: {
                lat: null,
                lng: null
            },
        }
    }
    componentWillMount(){
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ pos: {
                lat: position.coords.latitude, 
                lng: position.coords.longitude
            }});
            }, err => console.log(err)
        );
    }
    render(){
        if(this.state.pos.lat === null || this.state.pos.lng === null) return(
            <div>
                <h1>Not position</h1>
            </div>
        )
        else{
            return <MapNearbyPostsData position={this.state.pos} />
        }
        
    }
}