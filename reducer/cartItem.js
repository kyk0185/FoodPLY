import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';

const carItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, { cartPee: action.cartPee, cartPeeCount: action.cartPeeCount, cartName: action.cartName, cartId: action.cartId }]

        case 'REMOVE_FROM_CART':
            return state.filter(items => items.cartId !== action.cartId)
    }
    return state
}

const geoItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GEO_DATA':
            return { ...state, geoData: action.geoData }
    }
    return state
}

const userInfo = (state = [], action) => {
    if (action.type == 'ADD_USER_INFO') {
        return { ...state, userData: action.userData }
    }
    return state
}
const rootReducer = (state, action) => {
    if (action.type == 'SIGNOUT_REQUEST') {
        AsyncStorage.removeItem('persist:root')

        state = undefined
    }
    return allReducers(state, action)
}

const allReducers = combineReducers({
    carItems,
    geoItems,
    userInfo
})

export default rootReducer