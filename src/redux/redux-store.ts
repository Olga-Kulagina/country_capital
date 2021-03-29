import {combineReducers, createStore} from 'redux';
import {mapReducer} from './mapReducer';
import {gameReducer} from './gameReducer';

const rootReducer = combineReducers({
    map: mapReducer,
    game: gameReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
