import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Banner } from './Components/Banner'
import { Home, Login, PageNotFound } from './Components/Pages'
import { PopupManager } from './Components/PopupManager'
import { requestFetchAppInit } from './Redux/App/actions'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        async function initializeApp() {
            dispatch(requestFetchAppInit())
        }
        initializeApp()
    }, [dispatch])

    return (
        <Banner>
            <PopupManager />
            <Switch>
                <Route exact path = '/'>
                    <Redirect to = '/login'/>
                </Route>
                <Route exact path = '/login' component = {Login} />
                <Route exact path = '/home' component = {Home} />
                <Route component = {PageNotFound} />
            </Switch>
        </Banner>
    )
}

export default App
