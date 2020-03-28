import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { Container, Content, Button, Text, Body, Right, Thumbnail, List, ListItem, Left, CardItem, Card, DeckSwiper, Footer, FooterTab, Icon } from 'native-base';
import * as Font from 'expo-font';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import ModalFoodDetails from './ModalFoodDetails';
import { connect } from 'react-redux';
import data from './FoodData';

const { width, height } = Dimensions.get('window');
class FoodListDetails extends Component {
    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            rating: null,
            isReady: false,
            isLiked: false,
            activeIndex: 0,
            modalVisible: false,
            modalId: 0,
            modalName: "",
            modalUri: "",
            modalRef: "",
            modalPee: 0,
            cartPee: 0,
            modalBrand: "",
            modalCollection: ""
        }
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true })

        this.setState({ isLiked: this.props.cartItems.isLikedToggle.toggleData['isLiked'] })
        this.props.navigation.addListener('focus', () => {
            this.setState({ isLiked: this.props.cartItems.isLikedToggle.toggleData['isLiked'] })
        });
    }
    segmentClicked = (index) => {
        this.setState({ activeIndex: index })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: !this.state.modalVisible, modalId: visible.id, modalName: visible.name, modalRef: visible.ref, modalPee: visible.pee, modalUri: visible.uri['uri'], modalBrand: visible.brand, modalCollection: visible.collection })
    }
    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <ScrollView>
                    <List>
                        {data.map((dish, index) => {
                            {
                                if (dish.name === this.props.route.params['name']) {
                                    return (
                                        dish.foodData.map((dishes, index) => {
                                            return (
                                                <ListItem thumbnail>
                                                    <Body>
                                                        <TouchableHighlight onPress={() => this.setModalVisible({ id: index, name: dishes.name, ref: dishes.ref, pee: dishes.pee, uri: dishes, brand: this.props.route.params['name'], collection: this.props.route.params['collection'] })}>
                                                            <Text>{dishes.name}</Text>
                                                        </TouchableHighlight>
                                                        <Text style={{ marginTop: 10 }}>{dishes.ref}</Text>
                                                        <Text>{dishes.pee}원</Text>
                                                    </Body>
                                                    <Right>
                                                        <Thumbnail square large source={dishes}></Thumbnail>
                                                    </Right>
                                                </ListItem>
                                            )
                                        })


                                    )
                                }
                            }
                        })}
                        <ListItem thumbnail>
                            <Body>
                                <View style={{ marginTop: 22 }}>
                                    <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.modalVisible}
                                        onRequestClose={() => {
                                            alert('Modal has been closed.')
                                        }}>
                                        <View style={{ width: width, height: '5%', top: 0, alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <TouchableHighlight onPress={() => { this.setState({ modalVisible: !this.state.modalVisible }) }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>닫기</Text>
                                            </TouchableHighlight>
                                        </View>
                                        <View style={{ width: width, height: height }}>
                                            <ModalFoodDetails id={this.state.modalId} name={this.state.modalName} remarks={this.state.modalRef} pee={this.state.modalPee} uri={this.state.modalUri} brand={this.state.modalBrand} collection={this.state.modalCollection} />
                                        </View>
                                    </Modal>
                                </View>
                            </Body>
                        </ListItem>
                    </List>
                </ScrollView>
            )
        } else if (this.state.activeIndex == 1) {
            return (
                <ScrollView>
                    <Card>
                        <CardItem header bordered>
                            <Text>BBQ</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    귀한 맛집일수록 꼭꼭 숨어있다?일신동 골목길에 위치해 있지만 이미 알만한 사람들은 다~~아는 유명한 일신동 맛집 BBQS치킨!!
                                    그치킨이 푸드플라이에 상륙하다! 매일매일 주문과 동시에 그자리에서 튀겨내는 신선한 닭의 맛! 이제 BBQS치킨의 중독성 강한맛을
                                    저희 푸드플라이와 함께 즐겨요~
                                    </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <List>
                        <ListItem itemDivider>
                            <Text>영업시간</Text>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>영업시간</Text>
                            </Left>
                            <Body>
                                <Text>평일 16:00~00:00</Text>
                                <Text>주말 16:00~00:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>위치&연락처</Text>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>인천광역시 부평구 일신동 653-20 3층</Text>
                            </Left>
                        </ListItem>
                    </List>
                </ScrollView>
            )
        } else if (this.state.activeIndex == 2) {
            return (
                <ScrollView>
                    <List>
                        <ListItem>
                            <Body>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold' }}>tri*****</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 30, marginRight: 30 }}>2019-11-22</Text>
                                    <StarRating disabled={false} maxStars={5} rating={5} fullStarColor={'blue'} starSize={11}></StarRating>
                                </View>
                                <Text style={{ fontSize: 13, marginTop: 10 }}>최고!</Text>
                                <Text style={{ fontSize: 13, marginTop: 10, color: 'red' }}>후라이드치킨,코카콜라(1/25L)</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold' }}>san**</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 30, marginRight: 30 }}>2019-11-10</Text>
                                    <StarRating disabled={false} maxStars={5} rating={4.5} fullStarColor={'blue'} starSize={11}></StarRating>
                                </View>
                                <Text style={{ fontSize: 13, marginTop: 10 }}>겉바 속촉촉 맛있어요~!</Text>
                                <Text style={{ fontSize: 13, marginTop: 10, color: 'red' }}>양념치킨</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold' }}>_n*****</Text>
                                    <Text style={{ fontSize: 13, marginLeft: 30, marginRight: 30 }}>2019-10-10</Text>
                                    <StarRating disabled={false} maxStars={5} rating={3} fullStarColor={'blue'} starSize={11}></StarRating>
                                </View>
                                <Text style={{ fontSize: 13, marginTop: 10, color: 'red' }}>간장치킨,코카콜라(1/25L)</Text>
                            </Body>
                        </ListItem>
                    </List >
                </ScrollView>
            )
        }
    }
    renderSection2 = () => {
        let temp = 0

        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            if (!this.props.cartItems.carItems[i].isPay) {
                temp += this.props.cartItems.carItems[i].cartPee
            }
        }
        return (
            <Text style={{ fontWeight: 'bold', fontSize: 13 }}>{temp} 원</Text>
        )
    }
    renderSection3 = () => {
        let temp = 0

        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            if (!this.props.cartItems.carItems[i].isPay) {
                temp += this.props.cartItems.carItems[i].cartPee
            }
        }
        if (temp === 0) {
            return (
                <Button dark onPress={() => this.props.navigation.navigate('GoToOrder')} disabled>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>주문하기</Text>
                </Button>
            )
        } else {
            return (
                <Button dark onPress={this.goToOrder} >
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>주문하기</Text>
                </Button>
            )
        }
    }
    goToOrder = () => {
        if (this.props.cartItems.geoItems == "") {
            alert('배송지 설정 해주세요.')
            this.props.navigation.navigate('Home')
        } else if (this.props.cartItems.userInfo.userData == undefined) {
            alert('로그인 해주세요.')
            this.props.navigation.navigate('Details')
        } else {
            this.props.navigation.navigate('GoToOrder')
        }
    }
    goCartList = () => {
        this.props.navigation.push('ShoppingCart')
    }
    handleLike = async () => {
        await this.setState({ isLiked: !this.state.isLiked })
        this.props.isLikedToggle({ isLiked: this.state.isLiked })
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ width: width, height: height }}>
                        {data.map((dish) => {
                            {
                                if (dish.name === this.props.route.params['name']) {
                                    return (
                                        <View style={{ width: width, height: '40%' }}>
                                            <DeckSwiper
                                                dataSource={dish.foodData}
                                                renderItem={item =>
                                                    <Card >
                                                        <CardItem cardBody>
                                                            <Image source={item} style={{ height: 300, flex: 1 }} />
                                                        </CardItem>
                                                    </Card>
                                                } />
                                        </View>
                                    )
                                }
                            }
                        })}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 30 }}>
                            <Text>      </Text>
                            <Text style={{ fontSize: 25, marginHorizontal: 70 }}>{this.props.route.params['name']}</Text>
                            <Button transparent onPress={this.handleLike}>
                                {this.state.isLiked ?
                                    <Ionicons name="ios-heart" size={25} color="blue" />
                                    :
                                    <Ionicons name="ios-heart-empty" size={25} color="blue" />
                                }
                            </Button>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <StarRating disabled={false} maxStars={5} rating={4.5} fullStarColor={'red'} starSize={15} ></StarRating>
                            <Text style={{ marginTop: 10 }}>{this.props.route.params['pee']}</Text>
                        </View>

                        <View style={styles.lineStyle} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderWidth: 0.5, borderColor: 'gray' }}>
                            <Button transparent
                                onPress={() => this.segmentClicked(0)}
                                active={this.state.activeIndex == 0}>
                                <Text>메뉴</Text>
                            </Button>
                            <Button transparent
                                onPress={() => this.segmentClicked(1)}
                                active={this.state.activeIndex == 1}>
                                <Text>정보</Text>
                            </Button>
                            <Button transparent
                                onPress={() => this.segmentClicked(2)}
                                active={this.state.activeIndex == 2}>
                                <Text>리뷰</Text>
                            </Button>
                        </View>
                        {this.renderSection()}

                    </View>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.goCartList()} vertical active>
                            <Icon style={{ fontSize: 25, color: 'white' }} type="AntDesign" name='shoppingcart' />
                            {this.renderSection2()}
                        </Button>

                        {this.renderSection3()}
                    </FooterTab>
                </Footer>
            </Container >

        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isLikedToggle: (toggleData) => dispatch({ type: 'IS_LIKED_TOGGLE', toggleData: toggleData })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListDetails);
const styles = StyleSheet.create({
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        width: width,
        marginTop: 10
    }
});