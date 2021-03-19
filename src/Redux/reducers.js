import { combineReducers } from 'redux'
import appReducer from './App/reducer'
import popupReducer from './Popups/reducer'
import tasksReducer from './Tasks/reducer'
import userReducer from './User/reducer'

export const rootReducer = combineReducers({
    app: appReducer,
    popups: popupReducer,
    tasks: tasksReducer,
    user: userReducer
})
