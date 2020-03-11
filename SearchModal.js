import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import data from './FoodData';

const KEYS_TO_FILTERS = ['name', 'collection'];

class SearchModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
    }
    searchUpdated(text) {
        this.setState({ searchTerm: text })
    }
    render() {
        const filteredResults = data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (
            <View style={styles.container}>
                <SearchInput
                    onChangeText={(text) => { this.searchUpdated(text) }}
                    style={styles.searchInput}
                    placeholder='상호명,레스토랑명 검색'
                />
                <ScrollView>
                    {filteredResults.map(results => {
                        return (
                            <View style={styles.eachItems}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FoodListDetails', { image: results, name: results.name, pee: results.pee })}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={results} style={{ width: 120, height: 120 }} />
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 20 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'black', marginBottom: 10 }}>{results.name}</Text>
                                            <Text style={styles.subText}>{results.type}</Text>
                                            <Text style={styles.subText}>{results.pee}</Text>
                                            <Text style={styles.subText}>{results.location}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1
    },
    subText: {
        color: 'rgba(0,0,0,0.5)'
    },
    eachItems: {
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 10
    }

})

export default SearchModal;