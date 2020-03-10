import React, { Component } from 'react'

import IconButton from '../template/iconButton'

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { markAsDone } from './todoActions'
import { markAsPending } from './todoActions'
import { remove } from './todoActions'

class TodoList extends Component {

    constructor(props){
        super(props)
    }

    compare(a, b) {
        const itemA = a.createdAt 
        const itemB = b.createdAt
        let comparison = 0;
        if (itemA > itemB) {
            comparison = -1;
        } else if (itemA < itemB) {
            comparison = 1;
        }
        return comparison;
    }

    renderRows() {

        const list = this.props.list || []

        list.reverse();

        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' hide={!todo.done}
                        onClick={() => props.markAsDone(todo)}></IconButton>
                    <IconButton style='warning' icon='undo' hide={!todo.done}
                        onClick={() => props.markAsPending(todo)}></IconButton>
                    <IconButton style='danger' icon='trash-o' 
                        onClick={() => this.props.remove(todo)}></IconButton>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th className='tableActions'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    
}



const mapStateToProps = state => ({list: state.todo.list})

const mapDispatchToProps = dispatch => bindActionCreators({ markAsDone, markAsPending, remove }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)