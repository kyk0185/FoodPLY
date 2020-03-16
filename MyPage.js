import React, { Component } from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';
import { Text, Form, Label, Item, Input, Switch, Badge, Left, Card, CardItem, Right, Button } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("testds.db");
const { width } = Dimensions.get('window');

class MyPage extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            nickName: this.props.userInfo.userInfo.userData['nickName'],
            phone: this.props.userInfo.userInfo.userData['phone'],
            email: this.props.userInfo.userInfo.userData['email'],
            switchButton1: false,
            switchButton2: false,
            switchButton3: false
        }

    }
    nickNameForm = (text) => {
        this.setState({ nickName: text })
    }
    phoneForm = (text) => {
        this.setState({ phone: text })
    }
    emailForm = (text) => {
        this.setState({ email: text })
    }
    modiUserInfo = () => {
        try {
            let temp = [];
            temp.push(this.state.nickName)
            temp.push(this.state.phone)
            temp.push(this.state.email)
            temp.push(this.props.userInfo.userInfo.userData['id'])
            console.log('temp', temp)

            db.transaction(tx => {
                tx.executeSql(`UPDATE users SET nickName=?, phone=?,email=? where id=?`, temp, (tx, results) => {
                    console.log('Results', results.rowsAffected)
                    if (results.rowsAffected > 0) {
                        alert('저장되었습니다.')

                        let data = {
                            nickName: this.state.nickName,
                            email: this.state.email,
                            password: this.props.userInfo.userInfo.userData['password'],
                            id: this.props.userInfo.userInfo.userData['id'],
                            gender: this.props.userInfo.userInfo.userData['gender'],
                            phone: this.state.phone,
                            birthday: this.props.userInfo.userInfo.userData['birthday'],
                            isLogin: true
                        };
                        console.log(data)

                        this.props.addUserInfo(data)
                    }
                })
            })
        } catch (error) {

        }
    }

    componentDidMount = () => {
        this.props.navigation.addListener('focus', () => {
            if (this.props.userInfo.userInfo.userData != undefined) {
                this.setState({ nickName: this.props.userInfo.userInfo.userData['nickName'], phone: this.props.userInfo.userInfo.userData['phone'], email: this.props.userInfo.userInfo.userData['email'] })
            }
        });
        if (this.props.userInfo.userInfo.userData != undefined) {
            this.setState({ nickName: this.props.userInfo.userInfo.userData['nickName'], phone: this.props.userInfo.userInfo.userData['phone'], email: this.props.userInfo.userInfo.userData['email'] })
        }
    }
    render() {
        return (
            <SafeAreaView>
                <Form style={{ marginTop: 10 }}>
                    <Item stackedLabel style={{ width: width }}>
                        <Label>이름</Label>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Input onChangeText={this.nickNameForm} value={this.state.nickName} />
                            <Entypo name="edit" size={20} color="#BDBDBD" />
                            <Text>   </Text>
                        </View>
                    </Item>
                    <Item stackedLabel >
                        <Label>연락처</Label>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Input onChangeText={this.phoneForm} value={this.state.phone} />
                            <Entypo name="edit" size={20} color="#BDBDBD" />
                            <Button info style={{ marginLeft: 10 }} onPress={() => this.props.navigation.push('Certification', { name: this.state.nickName, phone: this.state.phone })}><Text>인증하기</Text></Button>
                        </View>
                    </Item>
                    <Item stackedLabel >
                        <Label>이메일</Label>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Input onChangeText={this.emailForm} value={this.state.email} />
                            <Entypo name="edit" size={20} color="#BDBDBD" />
                            <Text>   </Text>
                        </View>
                    </Item>
                    <Item stackedLabel last style={{ borderColor: 'transparent' }}>
                        <Label>혜택알림 수신동의</Label>
                        <Card style={{ right: 120, marginTop: 10 }} transparent >
                            <CardItem >
                                <Left>
                                    <Text>SMS</Text>
                                </Left>
                                <Right>
                                    <Switch value={this.state.switchButton1} onValueChange={() => this.setState({ switchButton1: !this.state.switchButton1 })} />
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text>이메일</Text>
                                </Left>
                                <Right>
                                    <Switch value={this.state.switchButton2} onValueChange={() => this.setState({ switchButton2: !this.state.switchButton2 })} />
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Text style={{ marginRight: 30 }}>푸쉬알림</Text>
                                <Switch value={this.state.switchButton3} disabled={true} />
                            </CardItem>
                        </Card>
                        <View style={{ flexDirection: 'row', marginLeft: 30, justifyContent: 'center' }}>
                            <Badge>
                                <Text>!</Text>
                            </Badge>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>수신동의 하시면 이벤트와 맛집 정보, 비밀 할인쿠폰 등 특별한 혜택이 수시 제공됩니다.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', right: 40, marginTop: 10 }}>
                            <Badge>
                                <Text>!</Text>
                            </Badge>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>장치의 알림 설정이 꺼져 있습니다.{'\n'} 알림을 받을려면, 안드로이드 설정에서 알림을 켜주세요.{'\n'}설정 바로가기></Text>
                        </View>
                    </Item>
                </Form>
                <View style={{ flexDirection: 'row', top: 160 }}>
                    <Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{ fontWeight: 'bold' }}>취소</Text>
                    </Button>
                    <Button info style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.modiUserInfo}>
                        <Text style={{ fontWeight: 'bold' }}>저장</Text>
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addUserInfo: (userData) => dispatch({ type: 'ADD_USER_INFO', userData: userData })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage)