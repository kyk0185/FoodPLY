import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const foodData = [
    {
        key: 1,
        uri: 'https://pds.joins.com/news/component/htmlphoto_mmdata/201903/08/52cf07ea-c8da-4574-b0e9-21e0e3b31118.jpg',
        name: 'BBQS',
        type: '배달팁: 무료(16,000원 이상)',
        pee: '최소 주문금액: 8,000원',
        location: '0.1km'
    },
    {
        key: 2,
        uri: 'https://akamai.pizzahut.co.kr/images/products/pizza/P_RG_SS.jpg',
        name: '피자헛',
        type: '배달팁: 무료(16,000원 이상)',
        pee: '최소 주문금액: 8,000원',
        location: '0.5km'
    },
    {
        key: 3,
        uri: 'https://www.theborn.co.kr/wp-content/uploads/2017/06/%ED%99%8D%EC%BD%A9.jpg',
        name: '띵호와',
        type: '배달팁: 무료',
        pee: '최소 주문금액: 1,500원',
        location: '1.1km'
    },
    {
        key: 4,
        uri: 'https://www.hotelrestaurant.co.kr/data/photos/20180205/art_15175330519518_43b250.bmp',
        name: '여기는한식전문점',
        type: '배달팁: 무료(16,000원 이상)',
        pee: '최소 주문금액: 8,000원',
        location: '0.1km'
    },
    {
        key: 5,
        uri: 'https://t1.daumcdn.net/liveboard/dailylife/4efc5ab6d41c42fca9ce7ea96c990343.png',
        name: '공공',
        type: '배달팁: 무료(10,000원 이상)',
        pee: '최소 주문금액: 1,0000원',
        location: '5km'
    },
    {
        key: 6,
        uri: 'https://i.ytimg.com/vi/W1w5c4RrZ8g/hqdefault.jpg',
        name: '돈까수',
        type: '배달팁: 무료(20,000원 이상)',
        pee: '최소 주문금액: 11,000원',
        location: '2.1km'
    }

]
function FoodList(props) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ padding: 10 }}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('FoodListDetails', { id: props.imag['key'] })}>
                    <Image source={props.imag} style={{ width: 170, height: 170 }} />
                    <Text style={{ fontSize: 20 }}>{props.name}</Text>
                    <Text>{props.type}</Text>
                    <Text>{props.pee}</Text>
                    <Text>{props.location}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default function Food() {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {foodData.map((dish, index) => {
                return (
                    <FoodList key={dish.key} imag={dish} name={dish.name} type={dish.type} pee={dish.pee} location={dish.location} />
                );
            })}
        </View>

    );
}

