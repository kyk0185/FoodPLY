import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem, Button, Text, Icon } from 'native-base';
import { connect } from 'react-redux';

class PaymentResults extends Component {
    constructor(props) {
        super(props)


    }
    componentDidMount = () => {
        const response = this.props.route.params
        const { imp_success, imp_uid, merchant_uid, error_msg } = response;

        const isSuccess = !(imp_success === 'false' || imp_success === false);

        for (let i = 0; i < this.props.cartItems.carItems.length; i++) {
            if (isSuccess) {
                if (!this.props.cartItems.carItems[i].isPay) {
                    console.log('Payment', this.props.cartItems.carItems[i].isPay)
                    this.props.modiItem(this.props.cartItems.carItems[i].cartId)
                }
            }
        }

    }
    render() {
        const response = this.props.route.params
        const { imp_success, imp_uid, merchant_uid, error_msg } = response;

        const isSuccess = !(imp_success === 'false' || imp_success === false);

        return (
            <View style={{ backgroundColor: '#f5f5f5', marginTop: 30 }}>
                <Icon style={{ fontSize: 100, textAlign: 'center', marginBottom: 20, color: '#52c41a' }} type="AntDesign" name={isSuccess ? 'checkcircle' : 'exclamationcircle'} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginLeft: 18, marginTop: 20 }}>{`결제에 ${isSuccess ? '성공' : '실패'}하였습니다.`}</Text>
                <List style={{ width: '90%', marginBottom: 50 }}>
                    <ListItem style={{ borderBottomWidth: 0, marginTop: -10, marginBottom: -10 }}>
                        <Text style={{ width: '40%', color: 'rgba(0, 0, 0, 0.6)' }}>아임포트 번호</Text>
                        <Text style={{ width: '60%' }}>{imp_uid}</Text>
                    </ListItem>
                    {isSuccess ? (
                        <ListItem style={{ borderBottomWidth: 0, marginTop: -10, marginBottom: -10 }}>
                            <Text style={{ width: '40%', color: 'rgba(0, 0, 0, 0.6)' }}>주문 번호</Text>
                            <Text style={{ width: '60%' }}>{merchant_uid}</Text>
                        </ListItem>
                    ) :
                        (
                            <ListItem style={{ borderBottomWidth: 0, marginTop: -10, marginBottom: -10 }}>
                                <Text style={{ width: '40%', color: 'rgba(0, 0, 0, 0.6)' }}>에러메시지</Text>
                                <Text style={{ width: '60%' }}>{error_msg}</Text>
                            </ListItem>
                        )}
                </List>
                <Button
                    bordered
                    transparent
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    onPress={() => this.props.navigation.popToTop()}>
                    <Icon name='arrow-back' style={{ color: 'black' }} />
                    <Text style={{ color: 'black' }}>돌아가기</Text>
                </Button>
            </View>
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
        modiItem: (cartId) => dispatch({ type: 'MODIFY_FROM_CART', cartId: cartId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentResults);