import React from 'react'
import { Styles } from 'material-ui'

import dataManager from '../data-manager'
import eventManager from '../event-manager'

import ContestRoundStore from '../stores/contest-round-store'
import ContestRoundActions from '../actions/contest-round-actions'


export default class ContestRoundView extends React.Component {
    constructor(props) {
        super(props)
        this.state = ContestRoundStore.getState()

        this.onChange = this.onChange.bind(this)

        ContestRoundActions.realtimeContestRound()
    }

    componentDidMount() {
        ContestRoundStore.listen(this.onChange)
        ContestRoundActions.fetchContestRound()
    }

    componentWillUnmount() {
        ContestRoundStore.unlisten(this.onChange)
    }

    onChange(state) {
        this.setState(state)
    }

    render() {
        if (this.state.contestRound == null || this.state.contestRound.value == null) {
            return <span></span>
        }

        let style = {
            padding: '4px 8px',
            marginRight: '10px',
            color: Styles.Colors.blueGrey600,
            backgroundColor: Styles.Colors.blueGrey50
        }

        return <span style={style}>{`Round ${this.state.contestRound.value}`}</span>
    }
}