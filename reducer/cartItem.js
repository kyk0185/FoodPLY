import { combineReducers } from 'redux'
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

const allReducers = combineReducers({
    carItems,
    geoItems
})

export default allReducers