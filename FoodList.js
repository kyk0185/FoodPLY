import React from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Grid } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import data from './FoodData';

function FoodList(props) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ padding: 10 }}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('FoodListDetails', { name: props.name, pee: props.pee })}>
                    <Image source={props.imag} style={{ width: 170, height: 170 }} />
                    <Text style={{ fontSize: 20, color: 'black', marginBottom: 10 }}>{props.name}</Text>
                    <Text>{props.type}</Text>
                    <Text>{props.pee}</Text>
                    <Text>{props.location}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default function Food(props) {
    return (
        <Grid style={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            {data.map((dish, index) => {
                if (dish.collection == props.collection) {
                    return (
                        <FoodList key={dish.key} imag={dish} name={dish.name} type={dish.type} pee={dish.pee} location={dish.location} />
                    );
                } else if (props.collection == '전체') {
                    return (
                        <FoodList key={dish.key} imag={dish} name={dish.name} type={dish.type} pee={dish.pee} location={dish.location} />
                    );
                }
            })}
        </Grid>
    );
}

