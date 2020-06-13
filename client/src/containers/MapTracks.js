import React, {Component, createRef} from 'react'
// import MapTracksComponent from '../components/MapTracksComponent'

export default class MapTracks extends Component{
    mapRef = createRef()
    constructor(props){
        super(props)
            this.state={
                map: null
            }
        }
    componentDidMount(){
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "FL2PLn-xzRt2qw8dmRMRtVHupxL1zw3zBK29yafb7NA"
        });

        const defaultLayers = platform.createDefaultLayers();

        // Create an instance of the map
        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                // This map is centered over Europe
                center: { lat: 50, lng: 5 },
                zoom: 4,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        this.setState({ map });
    }
    componentWillUnmount() {
        // Cleanup after the map to avoid memory leaks when this component exits the page
        this.state.map.dispose();
    }
    render(){
        // return <MapTracksComponent/>
        return <div ref={this.mapRef} style={{ height: "500px" }} />
    }
}