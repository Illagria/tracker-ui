import { combineReducers } from 'redux'
import appSettingsReducer from './AppSettings/reducer'

export const rootReducer = combineReducers({
    app: appSettingsReducer
})
