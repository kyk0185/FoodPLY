import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Footer, Button, Text, Right, List, ListItem, Left, FooterTab, Header, Body, Title, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';

class ShoppingCart extends Component {
    constructor(props) {
        console.log(props)
        super(props)
    }
    goToOrder = () => {
        let temp = 0
        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            if (!this.props.cartItems.carItems[i].isPay) {
                temp += this.props.cartItems.carItems[i].cartPee
            }
        }
        if (this.props.cartItems.geoItems == '') {
            alert('배송지 설정 해주세요.')
            this.props.navigation.navigate('Home')
        } else if (this.props.cartItems.userInfo.userData == undefined) {
            alert('로그인 해주세요.')
            this.props.navigation.navigate('Details')
        } else if (temp === 0) {
            alert('장바구니에 먼저 담아주세요.')
            this.props.navigation.goBack()
        } else {
            this.props.navigation.navigate('GoToOrder')
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
            <Text style={{ fontWeight: 'bold', color: 'white', marginRight: 20 }}>{temp} 원</Text>
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
                <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon style={{ fontSize: 100, marginBottom: 20, color: 'red' }} type="AntDesign" name={'exclamationcircle'} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginTop: 30 }}>장바구니가 비어있습니다.</Text>
                </View>
            )
        }
    }
    render() {
        return (
            <Container>
                <Header androidStatusBarColor='transparent' style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#D8D8D8' }}>
                    <Left style={{ flex: 2.7 }} />
                    <Body style={{ flex: 2 }}>
                        <Title style={{ color: '#424242', fontWeight: 'bold' }}>장바구니</Title>
                    </Body>
                    <Right style={{ flex: 2 }} />
                </Header>

                <Content>
                    {this.props.cartItems.carItems.map((dish, index) => {
                        if (!dish.isPay) {
                            return (
                                <List>
                                    <ListItem itemDivider style={{ backgroundColor: '#E6E6E6', borderBottomColor: 'black', borderBottomWidth: 0.7 }}>
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
                        }
                    })}
                    {this.renderSection3()}
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