import React, {Component, createRef} from 'react'
// import MapTracksComponent from '../components/MapTracksComponent'
import { getAddressPoints } from '../api/getAddressPoints'

export default class MapTracks extends Component{
    mapRef = createRef()
    constructor(props){
        super(props)
            this.state={
                map: null
            }
        }
    async componentDidMount(){
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
                zoom: 15,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        const data = await getAddressPoints('Rua de Gedinne')
        console.log('----------')
        console.log(data)
        console.log('----------')

        // const data = new H.map.Marker({
        //     lat:50,
        //     lng:5
        // })

        // map.addObject(data)

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