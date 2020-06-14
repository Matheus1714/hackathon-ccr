import React, {Component, createRef} from 'react'
// import MapTracksComponent from '../components/MapTracksComponent'
import { getAddressPoints } from '../api/getAddressPoints'


class MapTracks extends Component{
    mapRef = createRef()
    constructor(props){
        super(props)
            this.state={
                map: null,
                data: null
            }
        }
    async componentDidMount(){
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "FL2PLn-xzRt2qw8dmRMRtVHupxL1zw3zBK29yafb7NA"
        });

        const defaultLayers = platform.createDefaultLayers();

        const data = await getAddressPoints("Rua dos Pintassilgos", 5000)
        this.setState({data})

        let lat = 0
        let lng = 0
        let n = data.length
        for(let i = 0 ; i < n ; i++ ){
            lat+= data[i].position.lat
            lng+= data[i].position.lng
        }
        lat/=n
        lng/=n

        // Create an instance of the map
        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                // This map is centered over Europe
                center: { lat, lng},
                zoom: 15,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        for(let i = 0 ; i < n ; i++ ){
            let point = new H.map.Marker({
                lat:data[i].position.lat,
                lng:data[i].position.lng
            })
            map.addObject(point)
        }

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

export default MapTracks