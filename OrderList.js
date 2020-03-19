import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Button, Text, Right, List, ListItem, Left, Header, Body, Title, Icon } from 'native-base';
import Emoji from 'react-native-emoji';
import { connect } from 'react-redux';

class OrderList extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    renderSection3 = () => {
        let temp = 0
        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            if (this.props.cartItems.carItems[i].isPay) {
                temp += this.props.cartItems.carItems[i].cartPee
            }
        }
        if (temp === 0) {
            return (
                <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon style={{ fontSize: 100, marginBottom: 20, color: 'red' }} type="AntDesign" name={'exclamationcircle'} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginTop: 30 }}>주문내역이 없습니다.</Text>
                </View>
            )
        }
    }
    render() {
        const reduced = this.props.cartItems.carItems.reduce(function (acc, obj) {
            if (!acc[obj.brand]) {
                acc[obj.brand] = { ...obj, count: 1 };

                return acc
            }
            acc[obj.brand].cartPee += obj.cartPee
            acc[obj.brand].cartPeeCount += obj.cartPeeCount
            acc[obj.brand].count += 1

            return acc
        }, {})

        const result = Object.keys(reduced).map(function (k) {
            const items = reduced[k]
            return {
                brand: items.brand,
                cartPee: items.cartPee,
                cartPeeCount: items.cartPeeCount,
                count: items.count - 1,
                cartName: items.cartName,
                collection: items.collection,
                isPay: items.isPay
            }
        })
        return (
            <Container>
                <Header androidStatusBarColor='transparent' style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#D8D8D8' }}>
                    <Left style={{ flex: 2.7 }} />
                    <Body style={{ flex: 2 }}>
                        <Title style={{ color: '#424242', fontWeight: 'bold' }}>주문내역</Title>
                    </Body>
                    <Right style={{ flex: 2 }} />
                </Header>

                <Content>
                    {result.map((dish, index) => {
                        if (dish.isPay) {
                            return (
                                <List>
                                    <ListItem thumbnail noBorder>
                                        <Left>
                                            <Emoji name={dish.collection} style={{ fontSize: 30 }} />
                                        </Left>
                                        <Body>
                                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{dish.brand}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 18, fontWeight: '600' }}>{dish.cartName}</Text>
                                                <Text style={{ fontSize: 18, fontWeight: '600' }}>외</Text>
                                                <Text style={{ fontSize: 18, fontWeight: '600' }}>{dish.count}개</Text>
                                                <Text style={{ fontSize: 18, fontWeight: '600' }}>{dish.cartPee}원</Text>
                                            </View>
                                        </Body>
                                    </ListItem>
                                    <View style={{ flexDirection: 'row', flex: 2, padding: 10 }}>
                                        <Button style={{ flex: 1, borderColor: '#A4A4A4', borderWidth: 1 }} block transparent onPress={() => this.props.navigation.navigate('FoodListDetails', { name: dish.brand, pee: '8,000원', collection: dish.collection })}>
                                            <Text style={{ color: 'black', fontWeight: '300', fontSize: 17 }}>가게 상세</Text>
                                        </Button>
                                        <Button style={{ flex: 1, borderColor: '#A4A4A4', borderWidth: 1 }} block transparent onPress={() => this.props.navigation.navigate('OrderListDetails', { name: dish.brand, cartName: dish.cartName, count: dish.count })}>
                                            <Text style={{ color: 'black', fontWeight: '300', fontSize: 17 }}>주문 내역</Text>
                                        </Button>
                                    </View>
                                </List>
                            )
                        }
                    })}
                    {this.renderSection3()}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

export default connect(mapStateToProps)(OrderList);