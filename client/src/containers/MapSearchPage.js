import React, { Component, createRef } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ComboxBox from '../components/ComboBox'
import Tabs from '@material-ui/core/Tabs';
import {getNearbyPost} from '../api/getNearbyPosts'
import Tab from '@material-ui/core/Tab';

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
    barSearch: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerBox: {
        position: 'relative',
        top: -700,
        left: -15
    },
    tab: {
        minWidth: 100,
        width: 100,
    },
    positionTab: {
        position: 'relative',
        top: -200
    }
});

class MapNearbyPostsData extends Component{
    mapRef = createRef()
    constructor(props){
        super(props)
        this.state={
            map: null,
            data_autocomplete: null,
            value: '',
            nearby: true,
            balloon: {
                event: null,
                data: null
            },
            pos: {
                lat: null,
                lng: null
            },
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event, newValue) => {
        this.setState({value: newValue})
        this.props.history.push(newValue);
    };
    async mapHender(lat, lng){
        const data = await getNearbyPost({ 
            "lat": lat, 
            "lng": lng 
        })

        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "FL2PLn-xzRt2qw8dmRMRtVHupxL1zw3zBK29yafb7NA"
        });

        const defaultLayers = platform.createDefaultLayers();

        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { 
                    "lat": lat, 
                    "lng": lng
                },
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

        let group = new H.map.Group();

        map.addObject(group);

        group.addEventListener('tap', function (evt) {
            let bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
                content: evt.target.getData()
            });
            ui.addBubble(bubble);
        }, false);
        console.log(data)
        let n = data.length
        let points = []
        for(let i = 0 ; i < n ; i++ ){
            let point = new H.map.Marker({
                lat:data[i].position.lat,
                lng:data[i].position.lng
            })
            points.push(point)
            this.addMarkerToGroup(group, {
                lat:data[i].position.lat,
                lng:data[i].position.lng
            },
            `
                <center>
                    <p>${data[i].title}</p>
                    <span>Pátio ${data[i].ratings.courtyard.mean || 0}</span>
                    <span>Preço Combustível ${data[i].ratings.fuelprice.mean || 0 }</span>
                    <span>Atendimento ${data[i].ratings.attendance.mean || 0}</span>
                    <span>Qualidade Comida ${data[i].ratings.foodquality.mean || 0}</span>
                    <span>Preço Comida ${data[i].ratings.foodprice.mean || 0}</span>
                    <span>Segurança ${data[i].ratings.security.mean || 0}</span>
                    <span>Banho ${data[i].ratings.bath.mean || 0}</span>
                </center>
            `
            , H);
            
        }
        let container = new H.map.Group({
            objects: points
        });

        map.addObject(container)

        this.setState({ map });
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(position => {
            this.mapHender(position.coords.latitude, position.coords.longitude)
            this.setState({ pos: {
                lat: position.coords.latitude, 
                lng: position.coords.longitude
            }});
            }, err => console.log(err)
        );
    }
    componentWillUnmount() {
        this.state.map.dispose();
    }
    addMarkerToGroup(group, coordinate, html, H) {
        var marker = new H.map.Marker(coordinate);
        // add custom data to the marker
        marker.setData(html);
        group.addObject(marker);
    }
    render(){
        const { classes } = this.props;
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline  />
                    <div className={classes.paper} >
                        <div ref={this.mapRef} style={{ width: "400px", height: "730px" }} />
                    </div>
                    <div className={classes.barSearch}>
                        <div className={classes.centerBox}>
                            <ComboxBox map={this.state.map} />
                        </div>
                    </div>
                    <div className={classes.positionTab}>
                    {
                        (() => {
                            if(this.state.value !== null){
                                return (
                                    <Tabs
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        variant="fullWidth"
                                        indicatorColor="secondary"
                                        textColor="secondary"
                                    >
                                        <Tab classes={{root: classes.tab}} label="Home" value="/home" />
                                        <Tab classes={{root: classes.tab}} label="Perfil" value="profile" />
                                        <Tab classes={{root: classes.tab}} label="Ranking" value="ranking" />
                                    </Tabs>
                                )
                            }else{
                                return <h1>Null Value Tab</h1>
                            }
                        })()
                    }
                    </div>
                    
            </Container>
        )
            
    }
}

MapNearbyPostsData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapNearbyPostsData);