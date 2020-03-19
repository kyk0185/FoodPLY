import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Button, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class ModalFoodDetails extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            peeCount: 1,
            pee: this.props.pee,
            modalVisible: true
        }
    }

    componentDidUpdate = (_, prevState) => {
        if (prevState['peeCount'] != this.state.peeCount) {
            this.setState({ pee: this.props.pee * this.state.peeCount })
        }
    }

    minusPee = () => {
        if (this.state.peeCount > 1) {
            this.setState((prevState) => ({
                peeCount: prevState['peeCount'] - 1
            }))
        }
    }

    plusPee = () => {
        this.setState((prevState) => ({
            peeCount: prevState['peeCount'] + 1
        }))
    }
    render() {
        return (
            <View style={{ width: width, height: height }}>
                <View style={{ width: width, height: '20%', backgroundColor: 'gray' }}>
                </View>
                <View style={{ width: width, height: '80%' }}>
                    <View style={{ width: width, height: '55%' }}>
                        <Image source={{ uri: this.props.uri }} style={{ width: null, height: height, flex: 1 }} />
                    </View>
                    <View style={{ width: width, height: '10%', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>{this.props.name}</Text>
                    </View>
                    <View style={{ width: width, height: '10%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 2, marginLeft: 20 }}>
                                <Text>수량</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                                <Button transparent onPress={this.minusPee}>
                                    <AntDesign name="minussquare" size={20} color="gray" />
                                </Button>
                                <Text>{this.state.peeCount}</Text>
                                <Button transparent onPress={this.plusPee}>
                                    <AntDesign name="plussquare" size={20} color="gray" />
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: width, height: '7%', backgroundColor: 'gray', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 20, color: 'white' }}>메뉴금액</Text>
                        <Text style={{ marginRight: 20, color: 'white' }}>{this.state.pee}원</Text>
                    </View>
                    <View style={{ width: width, height: '10%' }}>
                        <Button block iconLeft onPress={() => this.props.addItemToCart(this.state.pee, this.state.peeCount, this.props.name, this.props.id, false, this.props.brand, this.props.collection)}>
                            <AntDesign name="shoppingcart" size={25} color="white" />
                            <Text>장바구니담기</Text>
                        </Button>
                    </View>
                </View>
            </View >
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (cartPee, cartPeeCount, cartName, cartId, isPay, brand, collection) =>
            dispatch({ type: 'ADD_TO_CART', cartPee: cartPee, cartPeeCount: cartPeeCount, cartName: cartName, cartId: cartId, isPay: isPay, brand: brand, collection: collection })
    }
}

export default connect(undefined, mapDispatchToProps)(ModalFoodDetails)

