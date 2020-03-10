import React, { Component } from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { add, changeDescription, search, clear, handlerKey } from './todoActions'

import AutoComplete from './autoComplete'

class TodoForm extends Component {
    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search();
    }

    keyHandler(e){
        const { add, clear, search, description } = this.props
        if(e.key === 'Enter') {
            e.shiftKey ? search() : add(description);
        }else if(e.key === 'Escape') {
            clear();
        }
    }

    render() {
        const { add, clear, search, description } = this.props
        return (
            <div role='form' className='todoForm'>
                <Grid cols='12 9 10'> {/* <div className= col-xs-12 col-sm-9 col-md-10> </div> */}
                    <AutoComplete onChange={this.props.changeDescription} onKeyUp={this.props.handlerKey} value={this.props.description}></AutoComplete>
                    {/* <input id='description' className='form-control' onChange={this.props.changeDescription} onKeyUp={this.keyHandler}
                    placeholder='Adicione uma tarefa' value={this.props.description}></input> */}
                </Grid>

                <Grid cols='12 3 2'> {/* <div className= col-xs-12 col-sm-3 col-md-2> </div> */}
                    <IconButton style='primary' icon='plus' onClick={() => add(description)}></IconButton>
                    <IconButton style='info' icon='search' onClick={search}></IconButton>
                    <IconButton style='default' icon='close' onClick={this.props.clear}></IconButton>
                </Grid>                
            </div>
        )
        
    }
}

const mapStateToProps = state => ({description: state.todo.description})

const mapDispatchToProps = dispatch => bindActionCreators({ add, changeDescription, search, clear, handlerKey }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)