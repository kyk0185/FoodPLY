import React from 'react';
import { View, Dimensions, Modal } from 'react-native';
import { Container, Content, Button, Text, Form, Label, Item, Input, Picker, Icon } from 'native-base';
import { connect } from 'react-redux';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("testds.db");
const { width, height } = Dimensions.get('window');

class LoginAnJoin extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            isLogin: false,
            joinForm: false,
            id: "",
            email: "",
            password: "",
            passwordConfirm: "",
            nickName: "",
            phone: "",
            loginForm: false,
            loginDisabled: false,
            joinDisabled: false,
            birth1: "",
            birth2: undefined,
            birth3: "",
            gender: undefined,
            modalVisible: false
        }
    }

    onValueChange2(value: string) {
        this.setState({ birth2: value })
    }
    onValueChange3(value: string) {
        this.setState({ gender: value })
    }
    joinToggle = () => {
        this.setState({ joinForm: !this.state.joinForm, modalVisible: !this.state.modalVisible })
    }

    idForm = (text) => {
        this.setState({ id: text })
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

    phoneForm = (text) => {
        this.setState({ phone: text })
    }
    birth1Form = (text) => {
        this.setState({ birth1: text })
    }
    birth3Form = (text) => {
        this.setState({ birth3: text })
    }
    logout = () => {
        this.props.clearUserInfo()
        alert('로그아웃 되셨습니다.!')
        this.setState({ isLogin: !this.state.isLogin })
        this.props.navigation.navigate('Home')
    }

    checkId = () => {
        const repExp = /^[a-zA-Z]{1}[a-zA-Z0-9_]{4,11}$/;

        const text = repExp.test(this.state.id)
        if (text == true) {
            try {
                let temp = [];
                temp.push(this.state.id);

                db.transaction(tx => {
                    tx.executeSql('select * from users where id = ?', temp, (_, { rows }) => {
                        if (rows.length > 0) {
                            alert('중복된 아이디 입니다.')
                            this.setState({ id: "" })
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
                            alert('중복된 이메일 입니다.')
                            this.setState({ email: "" })
                        } else {
                            alert('사용 가능한 이메일 입니다.')
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
    loginSubmit = () => {
        if (this.state.id !== "" & this.state.password !== "") {
            try {
                let temp = [];
                temp.push(this.state.id)

                db.transaction(tx => {
                    tx.executeSql('SELECT * FROM users WHERE id =?', temp, (_, { rows }) => {
                        if (rows.length > 0) {
                            alert('로그인이 되셨습니다.')
                            let data = {
                                nickName: rows.item(0).nickName,
                                email: rows.item(0).email,
                                password: rows.item(0).password,
                                id: rows.item(0).id,
                                gender: rows.item(0).gender,
                                phone: rows.item(0).phone,
                                birthday: rows.item(0).birthday,
                                isLogin: true
                            };
                            console.log(data)

                            this.props.addUserInfo(data)
                            this.setState({ isLogin: data.isLogin, nickName: data.nickName })
                            this.props.navigation.navigate('Home')
                        } else {
                            alert('아이디와 패스워드를 확인 해주세요.')
                        }
                    })
                })
            } catch (error) {
                console.log("loginSubmit error: ", error.message);
                throw error;
            }
        } else {
            alert('아이디와 패스워드를 입력해주세요.')
        }
    }

    joinSubmit = () => {
        if (this.state.email !== "" & this.state.nickName !== "" & this.state.password != "" & this.state.id != "" & this.state.gender != "" & this.state.phone != ""
            & this.state.birth1 !== "" & this.state.birth2 !== "" & this.state.birth3 !== "") {
            try {
                let temp = [];
                temp.push(this.state.email);
                temp.push(this.state.nickName);
                temp.push(this.state.password);
                temp.push(this.state.id);
                temp.push(this.state.gender);
                temp.push(this.state.phone);
                temp.push(this.state.birth1 + this.state.birth2 + this.state.birth3);

                db.transaction(tx => {
                    tx.executeSql(`INSERT INTO users (email,nickName,password,id,gender,phone,birthday) VALUES (?,?,?,?,?,?,?);`, temp, (tx, results) => {
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
                tx.executeSql('create table if not exists users(id TEXT, email TEXT, nickName TEXT, password TEXT,phone TEXT,birthday TEXT,gender TEXT)', [], (tx, results) => {
                    console.log('create')
                })
            })
        } catch (error) {
            alert(error)
        }
        this.props.navigation.addListener('focus', () => {
            if (this.props.userInfo.userInfo != '') {
                this.setState({ isLogin: this.props.userInfo.userInfo.userData['isLogin'], nickName: this.props.userInfo.userInfo.userData['nickName'] })
            }
        });
        if (this.props.userInfo.userInfo != '') {
            this.setState({ isLogin: this.props.userInfo.userInfo.userData['isLogin'], nickName: this.props.userInfo.userInfo.userData['nickName'] })
        }

    }

    render() {
        return (
            <Container style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <Content>
                    <View style={{ width: width, height: '15%', backgroundColor: '#81BEF7', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 35 }}>FOOD♬LY</Text>
                        <Text>푸드플라이로 로그인</Text>
                    </View>
                    {this.state.isLogin ?
                        <View style={{ width: width, height: height, alignItems: 'center', backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20 }}>{this.state.nickName} 고객님 환영합니다.!</Text>
                            <Button onPress={this.logout} block>
                                <Text>로그아웃</Text>
                            </Button>
                        </View>
                        :
                        <View style={{ width: width, height: height, alignItems: 'center', backgroundColor: 'white' }}>
                            <Form style={{ marginTop: 10 }}>
                                <Item stackedLabel>
                                    <Label>아이디</Label>
                                    <Input onChangeText={this.idForm} value={this.state.id} />
                                </Item>
                                <Item stackedLabel>
                                    <Label>비밀번호</Label>
                                    <Input onChangeText={this.passwordForm} value={this.state.password} secureTextEntry={true} />
                                </Item>
                                <Button onPress={this.loginSubmit} block>
                                    <Text>로그인</Text>
                                </Button>
                                <Button onPress={this.joinToggle} disabled={this.state.joinDisabled} block info>
                                    <Text>회원가입</Text>
                                </Button>
                            </Form>
                            {this.state.joinForm &&
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => {
                                        alert('Modal has been closed.')
                                    }}>
                                    <Form style={{ marginTop: 10 }}>
                                        <Item stackedLabel>
                                            <Label>아이디</Label>
                                            <Input onChangeText={this.idForm} onSubmitEditing={this.checkId} value={this.state.id} />
                                        </Item>
                                        <Item stackedLabel>
                                            <Label>비밀번호</Label>
                                            <Input onChangeText={this.passwordForm} onSubmitEditing={this.checkPassword} value={this.state.password} secureTextEntry={true} />
                                        </Item>
                                        <Item stackedLabel>
                                            <Label>비밀번호 재확인</Label>
                                            <Input onChangeText={this.passwordConfirmForm} onSubmitEditing={this.checkPasswordConfirm} value={this.state.passwordConfirm} secureTextEntry={true} />
                                        </Item>
                                        <Item stackedLabel>
                                            <Label>이름</Label>
                                            <Input onChangeText={this.nickNameForm} onSubmitEditing={this.checkNickName} value={this.state.nickName} />
                                        </Item>
                                        <Item stackedLabel>
                                            <Label>이메일</Label>
                                            <Input onChangeText={this.emailForm} onSubmitEditing={this.checkEmail} value={this.state.email} />
                                        </Item>
                                        <Item stackedLabel>
                                            <Label>생년월일</Label>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Input placeholder="년(4자)" placeholderTextColor="#d3d3d3" onChangeText={this.birth1Form} value={this.state.birth1} />
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    style={{ width: undefined }}
                                                    placeholder="월"
                                                    placeholderTextColor="#d3d3d3"
                                                    selectedValue={this.state.birth2}
                                                    onValueChange={this.onValueChange2.bind(this)}>

                                                    <Picker.Item label="1월" value="01" />
                                                    <Picker.Item label="2월" value="02" />
                                                    <Picker.Item label="3월" value="03" />
                                                    <Picker.Item label="4월" value="04" />
                                                    <Picker.Item label="5월" value="05" />
                                                    <Picker.Item label="6월" value="06" />
                                                    <Picker.Item label="7월" value="07" />
                                                    <Picker.Item label="8월" value="08" />
                                                    <Picker.Item label="9월" value="09" />
                                                    <Picker.Item label="10월" value="10" />
                                                    <Picker.Item label="11월" value="11" />
                                                    <Picker.Item label="12월" value="12" />
                                                </Picker>
                                                <Input placeholder="일" placeholderTextColor="#d3d3d3" onChangeText={this.birth3Form} value={this.state.birth3} />
                                            </View>
                                        </Item>
                                        <Item stackedLabel>
                                            <Label>성별</Label>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    style={{ width: undefined }}
                                                    placeholder="성별"
                                                    placeholderTextColor="#d3d3d3"
                                                    selectedValue={this.state.gender}
                                                    onValueChange={this.onValueChange3.bind(this)}>

                                                    <Picker.Item label="남자" value="key0" />
                                                    <Picker.Item label="여자" value="key1" />
                                                </Picker>
                                            </View>
                                        </Item>
                                        <Item stackedLabel last>
                                            <Label>휴대전화</Label>
                                            <Input placeholder="(-)빼고 입력해주세요." placeholderTextColor="#d3d3d3" onChangeText={this.phoneForm} onSubmitEditing={this.checkPhone} value={this.state.phone} />
                                        </Item>
                                        <Button onPress={this.joinSubmit} block>
                                            <Text>가입하기</Text>
                                        </Button>
                                    </Form>
                                </Modal>
                            }
                        </View>
                    }
                </Content>
            </Container >
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
        addUserInfo: (userData) => dispatch({ type: 'ADD_USER_INFO', userData: userData }),
        clearUserInfo: () => dispatch({ type: 'SIGNOUT_REQUEST' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAnJoin)

