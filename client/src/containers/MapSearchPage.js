import React, {Component, createRef} from 'react'
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RatingPage from './RatingPage'
import TabsComponent from '../components/TabsComponent'

import {getNearbyPost} from '../api/getNearbyPosts'
import {isLoggedIn} from '../api/isLoggedIn'

import ComboxBox from '../components/ComboBox'
import LoginComponent from '../components/LoginComponent';

const styles = require('../styles');

class MapNearbyPostsData extends Component{
    mapRef = createRef()

    constructor(props){
        super(props)
        this.state = {
            map: null,
            data_autocomplete: null,
            value: '',
            balloon: {
                event: null,
                data: null
            },
            pos: {
                lat: null,
                lng: null
            },
            isForm: false,
            dataFrom: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue})
        this.props.history.push(newValue);
    };

    async checkLogin (){
        let logged = await isLoggedIn();
        return logged;
    }

    async mapRender(lat, lng){
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

        let group = new H.map.Group()

        map.addObject(group);

        const data = await getNearbyPost({
            "lat": lat,
            "lng": lng
        })

        group.addEventListener('tap', function (evt) {
            let bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
                content: evt.target.getData()
            });
            ui.addBubble(bubble);
        }, false);
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
                    <a href="/rating"><button>Avaliar</button></a>
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
    async componentDidMount(){
        let logged = await this.checkLogin();
        this.setState({
            page : logged ? 'map' : 'login'
        });
        if(this.state.page === 'map'){
            navigator.geolocation.getCurrentPosition(position => {
                this.mapRender(position.coords.latitude, position.coords.longitude)
                this.setState({ pos: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }});
                }, err => console.log(err)
            );
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.page === 'map' && prevState.page === 'login'){
            navigator.geolocation.getCurrentPosition(position => {
                this.mapRender(position.coords.latitude, position.coords.longitude)
                this.setState({ pos: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }});
                }, err => console.log(err)
            );
        }
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

        if (!this.state.page){
            return (null)
        }
        else if (this.state.page === 'map'){
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
        else if (this.state.page === 'login'){
            return (
                <LoginComponent handler={() => this.setState({page : 'map'})}/>
            )
        }
    }
}

MapNearbyPostsData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapNearbyPostsData);
