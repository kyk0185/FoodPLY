import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Footer, Button, Text, Right, List, ListItem, Left, FooterTab } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';

class ShoppingCart extends Component {
    constructor(props) {
        super(props)
        console.log(props)

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
    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <Left>
                                <Image source={{ uri: this.props.route.params.uri }} style={{ width: 110, height: 110 }} />
                                <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: 20 }}>{this.props.route.params.cartTitle}</Text>
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
                        <Button dark>
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