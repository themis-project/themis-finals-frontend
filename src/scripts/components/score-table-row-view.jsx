import React from 'react'
import 'string.prototype.startswith'

import ScoreTablePositionCellView from './score-table-position-cell-view'
import ScoreTableServiceStateCellView from './score-table-service-state-cell-view'
import ScoreTableTotalScoreCellView from './score-table-total-score-cell-view'
import ScoreTableScoreCellView from './score-table-score-cell-view'


export default class ScoreTableRowView extends React.Component {
    render() {
        let cells = this.props.order.map((column, ndx) => {
            let value = this.props.data[column]

            if (column === 'position') {
                return <ScoreTablePositionCellView key={ndx} value={value}/>
            } else if (column.startsWith('#service_')) {
                return <ScoreTableServiceStateCellView key={ndx} value={value}/>
            } else if (column === 'score') {
                return <ScoreTableTotalScoreCellView key={ndx} value={value}/>
            } else if (column === 'attack') {
                return <ScoreTableScoreCellView key={ndx} absoluteValue={this.props.data.attackPoints} relativeValue={this.props.data.attackScore}/>
            } else if (column === 'defence') {
                return <ScoreTableScoreCellView key={ndx} absoluteValue={this.props.data.defencePoints} relativeValue={this.props.data.defenceScore}/>
            }

            return (
                <td key={ndx}>
                    {value}
                </td>
            )
        })

        return (
            <tr>
                {cells}
            </tr>
        )
    }
}