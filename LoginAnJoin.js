import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("testds.db");
const { width, height } = Dimensions.get('window');

export default class LoginAnJoin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            joinForm: false,
            email: "",
            password: "",
            passwordConfirm: "",
            nickName: "",
            loginForm: false,
            loginDisabled: false,
            joinDisabled: false
        }
    }

    loginToggle = () => {
        this.setState({ loginForm: !this.state.loginForm, joinDisabled: !this.state.joinDisabled })
    }

    joinToggle = () => {
        this.setState({ joinForm: !this.state.joinForm, loginDisabled: !this.state.loginDisabled })
    }

    emailForm = (text) => {
        this.setState({ email: text })
    }

    nickNameForm = (text) => {
        this.setState({ nickName: text })
    }

    passwordForm = (text) => {
        this.setState({ password: text })
    }

    passwordConfirmForm = (text) => {
        this.setState({ passwordConfirm: text })
    }

    logout = () => {
        AsyncStorage.removeItem('isLogin')
        alert('로그아웃 되셨습니다.!')
        this.setState({ isLogin: !this.state.isLogin })
        this.props.navigation.navigate('Home')
    }

    checkEmail = () => {
        const repExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        const text = repExp.test(this.state.email);
        if (text == true) {
            try {
                let temp = [];
                temp.push(this.state.email);

                db.transaction(tx => {
                    tx.executeSql('select * from users where email = ?', temp, (_, { rows }) => {
                        if (rows.length > 0) {
                            alert('중복된 아이디 입니다.')
                            this.setState({ email: "" })
                        } else {
                            alert('사용 가능한 아이디 입니다.')
                        }
                    })
                })
            } catch (error) {
                console.log("Received error: ", error.message);
                throw error;
            }
        } else {
            alert('올바른 형식에 맞추어 주십시오.')
        }
    }

    checkNickName = () => {
        const repExp = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s|[a-zA-Z]{2,15}$/;
        const text = repExp.test(this.state.nickName)
        if (text == true) {
            try {
                let temp = [];
                temp.push(this.state.nickName);
                console.log(temp)

                db.transaction(tx => {
                    tx.executeSql('select * from users where nickName = ?', temp, (_, { rows }) => {
                        if (rows.length > 0) {
                            alert('중복된 닉네임 입니다.')
                            this.setState({ nickName: "" })
                        } else {
                            alert('사용 가능한 닉네임 입니다.')
                        }
                    })
                })
            } catch (error) {
                console.log("Received error: ", error.message);
                throw error;
            }
        } else {
            alert('올바른 형식에 맞추어 주십시오.')
        }
    }
    checkPassword = () => {
        const repExp = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
        const text = repExp.test(this.state.password)

        if (text == false & this.state.password != "") {
            alert('영문, 숫자를 혼합하여 6~20자 이내로 작성하여 주십시오.')
        }
    }
    checkPasswordConfirm = () => {
        if (this.state.password != this.state.passwordConfirm & this.state.password != "" & this.state.passwordConfirm != "") {
            alert('비밀번호가 일치하지 않습니다.')
        }
    }

    async setUserINfo(data) {
        try {
            await AsyncStorage.setItem('isLogin', JSON.stringify(data))
        } catch (error) {
            console.log("setUserInfo error: ", error.message);
            throw error;
        }
    }

    async getUserInfo() {
        try {
            await AsyncStorage.getItem('isLogin', (err, result) => {
                const data = JSON.parse(result)
                console.log(data)
                if (data !== null) {
                    this.setState({ isLogin: data.isLogin })
                    this.setState({ nickName: data.nickName })
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

    loginSubmit = () => {
        if (this.state.email !== "" & this.state.password !== "") {
            try {
                let temp = [];
                temp.push(this.state.email)

                db.transaction(tx => {
                    tx.executeSql('SELECT * FROM users WHERE email =?', temp, (_, { rows }) => {
                        if (rows.length > 0) {
                            alert('로그인이 되셨습니다.')
                            let temp = {
                                nickName: rows.item(0).nickName,
                                isLogin: true
                            };
                            this.setUserINfo(temp);
                            this.props.navigation.navigate('Home')
                            // this.props.navigation.navigate('Home', { isLogin: true })
                        } else {
                            alert('아이디와 패스워드를 확인 해주세요.')
                        }
                    })
                })
            } catch (error) {
                console.log("loginSubmit error: ", error.message);
                throw error;
            }
        }
    }

    joinSubmit = () => {
        if (this.state.email !== "" & this.state.nickName !== "" & this.state.password != "") {
            try {
                let temp = [];
                temp.push(this.state.email);
                temp.push(this.state.nickName);
                temp.push(this.state.password);

                db.transaction(tx => {
                    tx.executeSql(`INSERT INTO users (email,nickName,password) VALUES (?,?,?);`, temp, (tx, results) => {
                        if (results.rowsAffected > 0) {
                            alert('회원이 등록 되셨습니다.')
                            this.setState({ email: "", nickName: "", password: "", passwordConfirm: "", joinForm: !this.state.joinForm, loginDisabled: !this.state.loginDisabled })
                        } else {
                            alert('회원 등록이 실패하셨습니다.')
                        }
                    })
                })
            } catch (error) {
                console.log("joinSubmit error: ", error.message);
                throw error;
            }
        } else {
            alert('회원가입 양식을 빠짐없이 기입해주십시오.')
        }
    }

    componentDidMount = () => {
        try {
            db.transaction(tx => {
                // tx.executeSql('drop table users', [], (tx, results) => {
                //     console.log('drop')
                // })
                tx.executeSql('create table if not exists users(email TEXT, nickName TEXT, password TEXT)', [], (tx, results) => {
                    // console.log('create')
                })
            })
        } catch (error) {
            alert(error)
        }
        this.onLoad();
    }
    render() {
        return (
            <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <View>
                    <View style={{ width: width, height: '15%', backgroundColor: '#81BEF7', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 35 }}>FOOD♬LY</Text>
                        <Text>푸드플라이로 로그인</Text>
                    </View>
                    {this.state.isLogin ?
                        <View style={{ width: width, height: height, alignItems: 'center', backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 20, marginTop: 20 }}>{this.state.nickName} 고객님 환영합니다.!</Text>
                            <TouchableOpacity style={{ width: 200, height: 40, marginTop: 20, borderColor: '#d6d7da', borderRadius: 15, borderWidth: 2, justifyContent: 'center' }} onPress={this.logout}>
                                <Text style={{ textAlign: 'center' }}>로그아웃</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ width: width, height: height, alignItems: 'center', backgroundColor: 'white' }}>
                            <TouchableOpacity style={{ width: 200, height: 40, marginTop: 10, borderColor: '#d6d7da', borderRadius: 15, borderWidth: 2, justifyContent: 'center' }} onPress={this.loginToggle} disabled={this.state.loginDisabled}>
                                <Text style={{ textAlign: 'center' }}>로그인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 200, height: 40, marginTop: 5, borderColor: '#d6d7da', borderRadius: 15, borderWidth: 2, justifyContent: 'center' }} onPress={this.joinToggle} disabled={this.state.joinDisabled}>
                                <Text style={{ textAlign: 'center' }}>회원가입</Text>
                            </TouchableOpacity>
                            {this.state.joinForm &&
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>아이디</Text>
                                        <TextInput style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={this.emailForm} onSubmitEditing={this.checkEmail} value={this.state.email} placeholder="Email"></TextInput>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>닉네임</Text>
                                        <TextInput style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5 }} onChangeText={this.nickNameForm} onSubmitEditing={this.checkNickName} value={this.state.nickName} placeholder="NickName"></TextInput>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>비밀번호</Text>
                                        <TextInput style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5 }} onChangeText={this.passwordForm} onSubmitEditing={this.checkPassword} value={this.state.password} placeholder="Password" secureTextEntry={true}></TextInput>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>비밀번호 재확인</Text>
                                        <TextInput style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5 }} onChangeText={this.passwordConfirmForm} onSubmitEditing={this.checkPasswordConfirm} value={this.state.passwordConfirm} placeholder="passwordConfirm" secureTextEntry={true}></TextInput>
                                    </View>
                                    <TouchableOpacity onPress={this.joinSubmit} style={{ alignSelf: 'center', marginTop: 50, width: 90, height: 25, marginTop: 5, borderColor: '#d6d7da', borderRadius: 15, borderWidth: 2 }}>
                                        <Text style={{ textAlign: 'center' }}>가입하기</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {this.state.loginForm &&
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>아이디</Text>
                                        <TextInput style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={this.emailForm} value={this.state.email} placeholder="Email"></TextInput>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>비밀번호</Text>
                                        <TextInput style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5 }} onChangeText={this.passwordForm} value={this.state.password} placeholder="Password" secureTextEntry={true}></TextInput>
                                    </View>
                                    <TouchableOpacity onPress={this.loginSubmit} style={{ alignSelf: 'center', marginTop: 50, width: 90, height: 25, marginTop: 5, borderColor: '#d6d7da', borderRadius: 15, borderWidth: 2 }}>
                                        <Text style={{ textAlign: 'center' }}>로그인</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    }
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black'
    },
});