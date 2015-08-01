import React from 'react'
import Router, { Route, DefaultRoute, NotFoundRoute, Link, RouteHandler, HistoryLocation } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
import mui, { AppBar } from 'material-ui'

import Index from './index'
import Scoreboard from './scoreboard'
import News from './news'
import Logs from './logs'
import NotFound from './not-found'

import 'whatwg-fetch'

let ThemeManager = new mui.Styles.ThemeManager()


class App extends React.Component {
    static get childContextTypes() {
        return {
            muiTheme:React.PropTypes.object
        }
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    render() {
        return (
            <div>
                <AppBar title="VolgaCTF 2015 Finals"/>
                <nav>
                    <Link to="index">Index</Link>
                    <Link to="scoreboard">Scoreboard</Link>
                    <Link to="news">News</Link>
                    <Link to="logs">Logs</Link>
                </nav>
                <main>
                    <RouteHandler/>
                </main>
            </div>
        )
    }
}


function ready(callback) {
    if (document.readyState != 'loading') {
        callback()
    } else {
        document.addEventListener('DOMContentLoaded', callback)
    }
}


let routes = (
    <Route handler={App}>
        <DefaultRoute name="index" handler={Index}/>
        <NotFoundRoute handler={NotFound}/>

        <Route name="scoreboard" handler={Scoreboard}/>
        <Route name="news" handler={News}/>
        <Route name="logs" handler={Logs}/>
    </Route>
)

function render() {
    Router.run(routes, HistoryLocation, (Root) => {
        React.render(<Root/>, document.getElementById('app'))
    })
}

ready(() => {
    fetch('/api/identity')
    .then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        } else {
            let err = new Error(response.statusText)
            err.response = response
            throw err
        }
    })
    .then((data) => {
        console.log('Request succeeded', data)
    })
    .catch((err) => {
        console.log('Request failed', err)
    })

    injectTapEventPlugin()
    render()
})