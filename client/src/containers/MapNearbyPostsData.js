import React, { Component, createRef } from 'react'
import {getNearbyPost} from '../api/getNearbyPosts'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    paper: {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    submit: {
      margin: 3,
    },
});

class MapNearbyPostsData extends Component{
    mapRef = createRef()
    constructor(props){
        super(props)
        this.state={
            data: null,
            map: null
        }
    }
    async componentDidMount(){
        const data = await getNearbyPost(this.props.position)

        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "FL2PLn-xzRt2qw8dmRMRtVHupxL1zw3zBK29yafb7NA"
        });

        const defaultLayers = platform.createDefaultLayers();

        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: this.props.position,
                zoom: 15,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // This variable is unused and is present for explanatory purposes
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components to allow the user to interact with them
        // This variable is unused
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        let n = data.length
        for(let i = 0 ; i < n ; i++ ){
            let point = new H.map.Marker({
                lat:data[i].position.lat,
                lng:data[i].position.lng
            })
            map.addObject(point);
        }

        this.setState({ map });

    }
    componentWillUnmount() {
        this.state.map.dispose();
    }
    render(){
        const { classes } = this.props;
        return( 
            <Container component="main" maxWidth="xs">
                <CssBaseline  />
                    <div className={classes.paper} >
                        <div ref={this.mapRef} style={{ width: "400px", height: "730px" }} />
                    </div>
            </Container>
        )
            
    }
}

MapNearbyPostsData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapNearbyPostsData);