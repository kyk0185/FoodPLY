import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Button, Text, Right, List, ListItem, Left, Header, Body, Title, Footer } from 'native-base';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class OrderListDetails extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    renderSection2 = () => {
        let temp = 0
        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            if (this.props.cartItems.carItems[i].isPay && this.props.cartItems.carItems[i].brand === this.props.route.params['name']) {
                temp += this.props.cartItems.carItems[i].cartPee
            }
        }
        return (
            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{temp}원</Text>
        )
    }
    renderSection3 = () => {
        let temp = 0
        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            if (this.props.cartItems.carItems[i].isPay && this.props.cartItems.carItems[i].brand === this.props.route.params['name']) {
                temp += this.props.cartItems.carItems[i].cartPee
            }
        }
        return (
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{temp}원</Text>
        )
    }

    render() {
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
                    <List>
                        <ListItem thumbnail noBorder>
                            <Body>
                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{this.props.route.params['name']}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{this.props.route.params['cartName']}</Text>
                                    <Text style={{ fontSize: 18, fontWeight: '600' }}>외</Text>
                                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{this.props.route.params['cartPeeCount']}개</Text>
                                </View>
                            </Body>
                        </ListItem>
                        <View style={{ flexDirection: 'row', flex: 2, padding: 10 }}>
                            <Button style={{ flex: 1, borderColor: '#A4A4A4', borderWidth: 1 }} block transparent>
                                <Text style={{ color: 'black', fontWeight: '300', fontSize: 17 }}>가게 전화</Text>
                            </Button>
                        </View>
                        <View style={styles.lineStyle} />
                        {this.props.cartItems.carItems.map((dish, index) => {
                            if (dish.isPay & dish.brand === this.props.route.params['name']) {
                                return (
                                    <ListItem style={{ marginTop: 20 }}>
                                        <Body>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 16, fontWeight: '600' }}>{dish.cartName}</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600' }}>{dish.cartPeeCount}개</Text>
                                            </View>
                                        </Body>
                                        <Right>
                                            <Text style={{ fontSize: 16, fontWeight: '600' }}>{dish.cartPee}원</Text>
                                        </Right>
                                    </ListItem>
                                )
                            }
                        })}
                        <ListItem style={{ marginTop: 15 }} noBorder>
                            <Body>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>총 주문금액</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>할인금액</Text>
                            </Body>
                            <Right>
                                {this.renderSection3()}
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>0원</Text>
                            </Right>
                        </ListItem>
                        <View style={styles.lineStyle2} />
                        <ListItem noBorder style={{ marginTop: 5 }}>
                            <Body>
                                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>총 결제금액</Text>
                                <Text style={{ fontSize: 19, fontWeight: 'bold', marginTop: 8 }}>결제방법</Text>
                            </Body>
                            <Right>
                                {this.renderSection2()}
                                <Text style={{ fontSize: 19, fontWeight: 'bold', marginTop: 8 }}>신용카드</Text>
                            </Right>
                        </ListItem>
                        <View style={styles.lineStyle} />
                        <ListItem style={{ marginTop: 5 }}>
                            <Body>
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>전화번호</Text>
                                <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 8, color: '#424242' }}>{this.props.cartItems.userInfo.userData['phone']}</Text>
                            </Body>
                        </ListItem>
                        <View style={{ backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center', height: 130 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 13, color: '#6E6E6E' }}>24시간 연중무휴 고객센터</Text>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 8 }}>1588-1599</Text>
                            </View>
                            <Text style={{ fontSize: 12, color: '#6E6E6E', marginTop: 5 }}>Copyright Food Flies in Song-pa, All Right Reserved.</Text>
                        </View>
                    </List>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}
export default connect(mapStateToProps)(OrderListDetails);

const styles = StyleSheet.create({
    lineStyle: {
        borderWidth: 7,
        borderColor: '#F2F2F2',
        width: width,
        marginTop: 15
    },
    lineStyle2: {
        borderWidth: 1,
        borderColor: '#A4A4A4',
        width: width,
        marginTop: 10
    }
});

