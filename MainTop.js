import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Content, Footer, Button, Left, List, ListItem, Body, Tab, Tabs } from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import Emoji from 'react-native-emoji';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Food from './FoodList';
const { width, height } = Dimensions.get('window');
const GEOCODE_APPID = 'AIzaSyAopuo3k6pzMfUM6MdRuoKqCjfKPeLJ1IY';

class MainTop extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            loginMenu: false,
            loading: false,
            wether: null,
            nickName: "",
            modalVisible: false,
            region: {
                latitude: 37.482974, longitude: 126.7441841, latitudeDelta: 0.0043, longitudeDelta: 0.0034
            },
            locationInput: "",
            isSubmit: false,
            locationInfo: null,
            locationData: ""
        }
    }
    LoginAnJoinToggle = () => {
        this.setState({ loginMenu: !this.state.loginMenu })
    }

    setModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible })
    }

    locationInputed = (text) => {
        this.setState({ locationInput: text })
    }
    handleSubmit = async () => {
        if (this.state.locationInput !== "") {
            try {
                let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?language=ko&address=${this.state.locationInput}&key=${GEOCODE_APPID}`)
                let responseJson = await response.json();
                console.log(responseJson)
                this.setState({ isSubmit: !this.state.isSubmit, locationInfo: responseJson.results })
            } catch (error) {
                console.log(error)
            }
        }
    }
    locationSave(data) {
        this.setState({ region: { latitude: data.geoData.lat, longitude: data.geoData.lng, latitudeDelta: 0.0043, longitudeDelta: 0.0034 }, isSubmit: !this.state.isSubmit, locationInput: "", locationData: data.locationData })
    }
    render() {
        return (
            <Container style={styles.container} >
                <Content>
                    <View flexDirection={'row'}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Image style={styles.menuIcon} source={require('./assets/menu_icon.png')}></Image>
                        </TouchableOpacity>
                        <Text style={styles.title}>FO<Emoji name="cookie" style={{ fontSize: 25 }} />DPLY</Text>
                        <View style={{ bottom: 0, justifyContent: 'flex-end', left: 80 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('SearchModal')}>
                                <FontAwesome size={25} name={'search'} color='#2ECCFA' />
                            </Button>
                        </View>
                    </View>
                    <View style={styles.lineStyle} />
                    <Tabs>
                        <Tab heading="전체">
                            <ScrollView>
                                <Food collection="전체" />
                            </ScrollView>
                        </Tab>
                        <Tab heading="한식">
                            <ScrollView>
                                <Food collection="한식" />
                            </ScrollView>
                        </Tab>
                        <Tab heading="중식">
                            <ScrollView>
                                <Food collection="중식" />
                            </ScrollView>
                        </Tab>
                        <Tab heading="카페">
                            <ScrollView>
                                <Food collection="카페" />
                            </ScrollView>
                        </Tab>
                        <Tab heading="치킨">
                            <ScrollView>
                                <Food collection="치킨" />
                            </ScrollView>
                        </Tab>
                    </Tabs>
                </Content>
                <Footer style={{ backgroundColor: 'white' }}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="location-on" size={30} color="#2ECCFA" />
                        <TouchableOpacity onPress={() => this.setModalVisible()}><Text style={{ fontWeight: 'bold', color: 'black' }}>배송지</Text></TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>|</Text>
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>{this.props.geoData.geoItems['geoData']}</Text>
                    </Left>
                </Footer>
                <View style={{ marginTop: 22 }}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.')
                        }}>
                        <View style={{ position: 'absolute', width: width, height: height }}>
                            <MapView style={{ width: width, height: height }}
                                region={this.state.region}
                                zoomEnabled={true}
                                scrollEnabled={true}>
                                <MapView.Marker coordinate={this.state.region}></MapView.Marker>
                            </MapView>

                            <View style={{ position: 'absolute', width: width, height: '15%', top: 0 }}>
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
                                    <Text></Text>
                                    <Text style={{ fontSize: 15 }}>배송지 설정</Text>
                                    <TouchableHighlight onPress={() => this.setModalVisible()}><Text style={{ fontSize: 15 }}>취소</Text></TouchableHighlight>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <TextInput
                                        placeholder="지번,도로명,건물명 검색"
                                        style={{ borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', height: 50 }}
                                        onChangeText={this.locationInputed} onSubmitEditing={this.handleSubmit} value={this.state.locationInput}
                                    />
                                </View>
                            </View>
                            {this.state.isSubmit &&
                                <View style={{ position: 'absolute', width: width, height: height, backgroundColor: 'white', padding: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>검색결과</Text>
                                    {this.state.locationInfo.map((dish, index) => {
                                        return (
                                            <List>
                                                <ListItem icon>
                                                    <Left>
                                                        <MaterialIcons name="location-on" size={20} color="#2ECCFA" />
                                                    </Left>
                                                    <Body>
                                                        <TouchableOpacity onPress={() => this.locationSave({ id: index, geoData: dish.geometry.location, locationData: dish.formatted_address })}>
                                                            <Text>{dish.formatted_address}</Text>
                                                        </TouchableOpacity>
                                                    </Body>
                                                </ListItem>
                                            </List>
                                        )
                                    }
                                    )}
                                </View>
                            }
                            <View style={{ position: 'absolute', width: width, height: '15%', bottom: 0 }}>
                                <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                                    <MaterialIcons name="location-on" size={30} color="#2ECCFA" />
                                    <Text >{this.state.locationData}</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Button info full
                                        onPress={() => this.props.addGeoData(this.state.locationData)}>
                                        <Text style={{ alignItems: 'center', color: 'white', fontSize: 15 }}>위 배송지로 설정</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Container >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        geoData: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addGeoData: (geoData) => dispatch({ type: 'ADD_GEO_DATA', geoData: geoData })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTop)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    menuIcon: {
        marginTop: 25,
        marginLeft: 10,
        padding: 20,
        width: 5,
        height: 5

    },
    title: {
        padding: 25,
        fontSize: 30,
        marginLeft: 60,
        color: 'black'
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black'
    }
});