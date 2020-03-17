import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';

const carItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, { cartPee: action.cartPee, cartPeeCount: action.cartPeeCount, cartName: action.cartName, cartId: action.cartId, isPay: action.isPay }]

        case 'REMOVE_FROM_CART':
            return state.filter(items => items.cartId !== action.cartId)

        case 'MODIFY_FROM_CART':
            return state.map((dish, index) => {
                if (dish.isPay === false) {
                    if (dish.cartId === action.cartId) {
                        return Object.assign({}, dish, {
                            isPay: !dish.isPay
                        })
                    }
                }
                return dish
            })
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
    switch (action.type) {
        case 'ADD_USER_INFO':
            return { ...state, userData: action.userData }
        case 'MODI_USER_INFO':
            console.log('reducer', state)
            return { ...state, userData: { ...state.userData, nickName: action.userData['nickName'], phone: action.userData['phone'], email: action.userData['email'] } }
    }
    return state
}

const isLikedToggle = (state = [], action) => {
    if (action.type == 'IS_LIKED_TOGGLE') {
        return { ...state, toggleData: action.toggleData }
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
    userInfo,
    isLikedToggle
})

export default rootReducer