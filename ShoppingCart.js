import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Content, Footer, Button, Text, Right, List, ListItem, Left, FooterTab } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';

class ShoppingCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
    }
    renderSection2 = () => {
        let temp = 0
        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            temp += this.props.cartItems.carItems[i].cartPee
        }
        return (
            <Text style={{ fontWeight: 'bold', color: 'white', marginRight: 20 }}>{temp}원</Text>
        )
    }
    goToOrder = () => {
        if (this.props.cartItems.geoItems['geoData'] == undefined) {
            alert('배송지 설정 해주세요.')
            this.props.navigation.navigate('Home')
        } else if (this.state.isLogin = false) {
            alert('로그인 해주세요.')
            this.props.navigation.navigate('LoginAnJoin')
        } else {
            this.props.navigation.navigate('GoToOrder')
        }

    }
    async getUserInfo() {
        try {
            await AsyncStorage.getItem('isLogin', (err, result) => {
                const data = JSON.parse(result)
                console.log(data)
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

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem noIndent style={{ backgroundColor: "#cde1f9" }}>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 20 }}>장바구니</Text>
                            </Left>
                        </ListItem>
                    </List>
                    {this.props.cartItems.carItems.map((dish, index) => {
                        return (
                            <List>
                                <ListItem itemDivider>
                                    <Left>
                                        <Text style={{ fontWeight: 'bold' }}>{dish.cartName}</Text>
                                    </Left>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>{dish.cartPeeCount}</Text>
                                        <Button transparent onPress={() => this.props.removeItem(dish.cartId)} style={{ marginLeft: 20 }}>
                                            <AntDesign name="closesquareo" size={20} color="gray" />
                                        </Button>
                                    </View>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text>가격</Text>
                                    </Left>
                                    <Right><Text>{dish.cartPee}원</Text></Right>
                                </ListItem>
                            </List>
                        )
                    })}
                </Content>
                <Footer style={{ backgroundColor: "#424242" }}>
                    <Left>
                        <Text style={{ color: 'white', marginLeft: 20, fontWeight: 'bold' }}>총 주문금액</Text>
                    </Left>
                    <Right>
                        {this.renderSection2()}
                    </Right>
                </Footer>
                <Footer>
                    <FooterTab>
                        <Button active onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>주문추가하기</Text>
                        </Button>
                        <Button dark onPress={this.goToOrder}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>주문하기</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}
const mapDispatchProps = (dispatch) => {
    return {
        removeItem: (cartId) => dispatch({ type: 'REMOVE_FROM_CART', cartId: cartId })
    }
}

export default connect(mapStateToProps, mapDispatchProps)(ShoppingCart)