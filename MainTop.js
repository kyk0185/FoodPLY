import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground, AsyncStorage, Modal, TouchableHighlight } from 'react-native';
import { Container, Content, Footer, Button, Left, List, ListItem, Body } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import FoodList from './FoodList';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');
const GEOCODE_APPID = 'AIzaSyAopuo3k6pzMfUM6MdRuoKqCjfKPeLJ1IY';

class MainTop extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            sideMenu: props.sideMenu,
            loginMenu: false,
            loading: false,
            wether: null,
            isLogin: false,
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

    sideMenuToggle = () => {
        this.setState({ sideMenu: !this.state.sideMenu })
    }

    LoginAnJoinToggle = () => {
        this.setState({ loginMenu: !this.state.loginMenu })
    }

    async getUserInfo() {
        try {
            await AsyncStorage.getItem('isLogin', (err, result) => {
                const data = JSON.parse(result)
                if (data !== null) {
                    this.setState({ isLogin: data.isLogin })
                } else {
                    this.setState({ isLogin: false })
                }
            })
        } catch (error) {
            console.log("getUserInfo error: ", error.message);
            throw error;
        }
    }
    onLoad() {
        this.getUserInfo();
    }
    componentDidMount = () => {
        this.props.navigation.addListener('focus', () => {
            this.onLoad();
        });
        this.onLoad();
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
                        <TouchableOpacity onPress={this.sideMenuToggle}>
                            <Image style={styles.menuIcon} source={require('./assets/menu_icon.png')}></Image>
                        </TouchableOpacity>
                        <Text style={styles.title}>FOOD♬LY</Text>
                    </View>
                    <View style={styles.lineStyle} />
                    <View flexDirection={'row'} style={{ padding: 5 }}>
                        <Text style={{ marginLeft: 15 }}>전체</Text>
                        <Text style={{ marginLeft: 15 }} >★신규맛집</Text>
                        <Text style={{ marginLeft: 15 }} > 한식</Text>
                        <Text style={{ marginLeft: 15 }} > 일식</Text>
                        <Text style={{ marginLeft: 15 }} > 카페</Text>
                        <Text style={{ marginLeft: 15 }}> 양식</Text>
                        <Text style={{ marginLeft: 15 }}> 퓨전</Text>
                        <Text style={{ marginLeft: 15 }}> 검색</Text>
                    </View>
                    <ScrollView>
                        <FoodList />
                    </ScrollView>
                    {
                        this.state.sideMenu &&
                        <View style={{ position: 'absolute', width: '100%', height: '100%', flexDirection: 'row' }} >
                            <ImageBackground source={{
                                uri: 'https://post-phinf.pstatic.net/MjAxNzEyMjBfMTAy/MDAxNTEzNzUxODY3NDg3.yhuQ6AD6EM3Er4MvNmqbJ8GFGbJTO07kWpI7FpBjwwkg.4-YFyjnge1WkeQf_F6rKBw7wXoIiGQxamB0oxKjaDuMg.PNG/20171220_1537051.png?type=w1200'
                            }} style={{ width: 370, height: height, flex: 1 }}
                                resizeMode={'cover'}>
                                <View style={{ marginTop: 100, alignItems: 'center' }}>
                                    {this.state.isLogin ?
                                        <Button light onPress={() => this.props.navigation.navigate('Details')}><Text>마이페이지</Text></Button>
                                        :
                                        <Button light onPress={() => this.props.navigation.navigate('Details')}><Text>로그인/회원가입</Text></Button>
                                    }
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 20 }}>장바구니</Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 20 }}>최근 본 맛집</Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 20 }}>프로모션 코드</Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 20 }}>고객센터</Text>
                                    <Image source={{ uri: 'https://www.iminju.net/news/photo/201708/29896_31813_426.jpg' }} style={{ width: 369, height: 80, marginTop: 20 }} resizeMode={'stretch'} />
                                </View>
                            </ImageBackground>
                            <TouchableOpacity onPress={this.sideMenuToggle} style={{ height: height, width: '10%', backgroundColor: 'rgba(240, 240, 240, 0.5)' }} >
                            </TouchableOpacity>
                        </View>

                    }
                </Content>
                <Footer style={{ backgroundColor: 'white' }}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="location-on" size={30} color="#2ECCFA" />
                        <TouchableOpacity onPress={() => this.setModalVisible()}><Text style={{ fontWeight: 'bold' }}>배송지</Text></TouchableOpacity>
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
        marginLeft: 60
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black'
    }
});