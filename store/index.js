import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native';

import rootReducer from '../reducer/cartItem'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore() {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}
