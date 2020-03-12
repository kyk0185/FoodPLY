import React, { Component } from 'react'
import { Container, Content, Footer, Button, Text, Right, List, ListItem, Left, FooterTab, Body, CheckBox } from 'native-base';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class GoToOrder extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            checked: false,
            checked2: false,
            amount: 0,
        }
    }
    _onPressButton = () => {
        this.setState({ checked: !this.state.checked })
    }
    _onPressButton2 = () => {
        this.setState({ checked2: !this.state.checked2 })
    }

    componentDidMount = () => {
        this.props.navigation.addListener('focus', () => {
            let temp = 0
            for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
                temp += this.props.cartItems.carItems[i].cartPee
            }
            this.setState({ amount: temp })
        });
        let temp = 0
        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            temp += this.props.cartItems.carItems[i].cartPee
        }
        this.setState({ amount: temp })
    }
    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem noIndent style={{ backgroundColor: "#cde1f9" }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 20 }}>주문 목록</Text>
                        </ListItem>
                    </List>
                    {this.props.cartItems.carItems.map((dish, index) => {
                        return (
                            <List>
                                <ListItem itemDivider>
                                    <Left>
                                        <Text style={{ fontWeight: 'bold' }}>{dish.cartName}</Text>
                                    </Left>
                                    <Right style={{ marginRight: 13 }}><Text>{dish.cartPeeCount}</Text></Right>
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
                    <List>
                        <ListItem noIndent style={{ backgroundColor: "#cde1f9" }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 20 }}>결제 방법</Text>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity onPress={this._onPressButton}>
                                <CheckBox checked={this.state.checked} color='black' />
                            </TouchableOpacity>
                            <Body>
                                <Text style={{ fontWeight: '600', fontSize: 18 }}>신용카드</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity onPress={this._onPressButton2}>
                                <CheckBox checked={this.state.checked2} color='black' />
                            </TouchableOpacity>
                            <Body>
                                <Text style={{ fontWeight: '600', fontSize: 18 }}>계좌이체</Text>
                            </Body>
                        </ListItem>
                        <ListItem noIndent style={{ backgroundColor: "#cde1f9" }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 20 }}>배송지 정보</Text>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={{ fontWeight: '600', fontSize: 15 }}>{this.props.cartItems.geoItems['geoData']}</Text>
                            </Left>
                            <Right>
                                <Button rounded><Text style={{ fontSize: 13, fontWeight: 'bold' }}>정보수정</Text></Button>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
                <Footer style={{ backgroundColor: "#424242" }}>
                    <Left>
                        <Text style={{ color: 'white', marginLeft: 20, fontWeight: 'bold' }}>총 결제금액</Text>
                    </Left>
                    <Right>
                        <Text style={{ color: 'white', marginRight: 10, fontWeight: 'bold' }}>{this.state.amount}원</Text>
                    </Right>
                </Footer>
                <Footer>
                    <FooterTab>
                        <Button active onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>취소하기</Text>
                        </Button>
                        <Button dark onPress={() => this.props.navigation.push('Payment', { buyer_name: this.props.cartItems.userInfo.userData['nickName'], buyer_email: this.props.cartItems.userInfo.userData['email'], amount: this.state.amount, buyer_tel: this.props.cartItems.userInfo.userData['phone'], buyer_addr: this.props.cartItems.geoItems['geoData'] })}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>결제하기</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

export default connect(mapStateToProps)(GoToOrder)