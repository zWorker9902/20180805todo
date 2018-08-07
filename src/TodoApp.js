import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import TodoItem from './TodoItem';
import * as filterTypes from './filter-types';

export default class TodoApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      filterType: filterTypes.ALL
    }
  }


  changeFilterType = (filterType) => {
    this.setState({filterType})
  }



  render() {
    let todos = this.props.model.todos;
    let activeTodoCounts = todos.reduce((count, todo)=>
      count+(todo.complated?0:1), 0);

    let complatedTodoCounts = todos.reduce((count, todo)=>
      count+(todo.complated?1:0), 0);

    let showTodos = todos.filter((todo)=>{
        switch(this.state.filterType) {
          case filterTypes.ACTIVE: {
            return !todo.complated;
          }

          case filterTypes.COMPLATED: {
            return todo.complated;
          }

          default:
            return true;
        }
      }
    )

    let main = (
      <ul className="list-group">
        {
          todos.length > 0 &&
          <li className="list-group-item">
            <input type="checkbox" checked={activeTodoCounts === 0} onChange={this.props.model.toggleAll} />
            <span>{activeTodoCounts === 0 ? "全部取消":"全部选中"}</span>
          </li>
        }
        {
          showTodos.map((todo, index)=>
            <TodoItem todo={todo}
                      toggle={this.props.model.toggle}
                      remove={this.props.model.remove}
                      key={index}></TodoItem>
          )
        }
      </ul>
    );

    return (
      <div className="container" style={{marginTop: 20}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <TodoHeader addTodo={this.props.model.addTodo}/>
              </div>
              <div className="panel-body">
                {main}
              </div>
              <div className="panel-footer">
                <TodoFooter activeTodoCounts={activeTodoCounts}
                            changeFilterType = {this.changeFilterType}
                            filterType = {this.state.filterType}
                            clearComplated = {this.props.model.clearComplated}
                            complatedTodoCounts={complatedTodoCounts}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}