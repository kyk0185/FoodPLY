import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container, Content, Footer, Button, Text, Right, List, ListItem, Left, FooterTab, Body, CheckBox, Header, Title, Form, Item, Label, Input } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("testds.db");
const { width } = Dimensions.get('window');

class GoToOrder extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            nickName: this.props.cartItems.userInfo.userData['nickName'],
            phone: this.props.cartItems.userInfo.userData['phone'],
            address: this.props.cartItems.geoItems['geoData'],
            checked: false,
            checked2: false,
            amount: 0,
        }
    }
    nickNameForm = (text) => {
        this.setState({ nickName: text })
    }
    phoneForm = (text) => {
        this.setState({ phone: text })
    }
    addressForm = (text) => {
        this.setState({ address: text })
    }
    _onPressButton = () => {
        this.setState({ checked: !this.state.checked })
    }
    _onPressButton2 = () => {
        this.setState({ checked2: !this.state.checked2 })
    }
    modiUserAnPay = () => {
        try {
            let temp = [];
            temp.push(this.state.nickName)
            temp.push(this.state.phone)
            temp.push(this.props.cartItems.userInfo.userData['id'])
            console.log('temp', temp)

            db.transaction(tx => {
                tx.executeSql(`UPDATE users SET nickName=?, phone=? where id=?`, temp, (tx, results) => {
                    console.log('Results', results.rowsAffected)
                    if (results.rowsAffected > 0) {
                        console.log('저장되었습니다.')

                        let data = {
                            nickName: this.state.nickName,
                            email: this.props.cartItems.userInfo.userData['email'],
                            password: this.props.cartItems.userInfo.userData['password'],
                            id: this.props.cartItems.userInfo.userData['id'],
                            gender: this.props.cartItems.userInfo.userData['gender'],
                            phone: this.state.phone,
                            birthday: this.props.cartItems.userInfo.userData['birthday'],
                            isLogin: true
                        };
                        console.log(data)

                        this.props.addUserInfo(data)
                        this.props.addGeoData(this.state.address)

                        this.props.navigation.push('Payment', { buyer_name: data.nickName, buyer_email: data.email, amount: this.state.amount, buyer_tel: data.phone, buyer_addr: this.state.address })
                    }
                })
            })
        } catch (error) {

        }
    }
    componentDidMount = () => {
        this.props.navigation.addListener('focus', () => {
            let temp = 0
            for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
                if (!this.props.cartItems.carItems[i].isPay) {
                    temp += this.props.cartItems.carItems[i].cartPee
                }
            }
            this.setState({ amount: temp })
            if (this.props.cartItems.userInfo.userData != undefined) {
                this.setState({ nickName: this.props.cartItems.userInfo.userData['nickName'], phone: this.props.cartItems.userInfo.userData['phone'], address: this.props.cartItems.geoItems['geoData'] })
            }
        });
        let temp = 0
        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            if (!this.props.cartItems.carItems[i].isPay) {
                temp += this.props.cartItems.carItems[i].cartPee
            }
        }
        this.setState({ amount: temp })
        if (this.props.cartItems.userInfo.userData != undefined) {
            this.setState({ nickName: this.props.cartItems.userInfo.userData['nickName'], phone: this.props.cartItems.userInfo.userData['phone'], address: this.props.cartItems.geoItems['geoData'] })
        }
    }
    render() {
        return (
            <Container>
                <Header androidStatusBarColor='transparent' style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#D8D8D8' }}>
                    <Left style={{ flex: 2.7 }} />
                    <Body style={{ flex: 2 }}>
                        <Title style={{ color: '#424242', fontWeight: 'bold' }}>주문하기</Title>
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
                        }
                    })}
                    <List>
                        <ListItem itemDivider style={{ backgroundColor: '#E6E6E6', borderBottomColor: 'black', borderBottomWidth: 0.7 }}>
                            <Text style={{ fontWeight: 'bold' }}>결제 방법</Text>
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
                        <ListItem itemDivider style={{ backgroundColor: '#E6E6E6', borderBottomColor: 'black', borderBottomWidth: 0.7 }}>
                            <Text style={{ fontWeight: 'bold' }}>배송지 정보</Text>
                        </ListItem>
                    </List>
                    <Form>
                        <Item stackedLabel style={{ width: width }}>
                            <Label>수령인</Label>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Input onChangeText={this.nickNameForm} value={this.state.nickName} />
                                <Entypo name="edit" size={20} color="#BDBDBD" />
                                <Text>      </Text>
                            </View>
                        </Item>
                        <Item stackedLabel >
                            <Label>연락처</Label>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Input onChangeText={this.phoneForm} value={this.state.phone} />
                                <Entypo name="edit" size={20} color="#BDBDBD" />
                                <Text>   </Text>
                            </View>
                        </Item>
                        <Item stackedLabel last>
                            <Label>주소</Label>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Input onChangeText={this.addressForm} value={this.state.address} style={{ fontSize: 15 }} multiline={true} blurOnSubmit={true} />
                                <Entypo name="edit" size={20} color="#BDBDBD" />
                                <Text>   </Text>
                            </View>
                        </Item>
                    </Form>
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
                        <Button dark onPress={this.modiUserAnPay}>
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
const mapDispatchToProps = (dispatch) => {
    return {
        addUserInfo: (userData) => dispatch({ type: 'ADD_USER_INFO', userData: userData }),
        addGeoData: (geoData) => dispatch({ type: 'ADD_GEO_DATA', geoData: geoData })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GoToOrder)