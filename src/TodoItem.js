import React from 'react';

export default class TodoItem extends React.Component {
  render() {

    let { todo } = this.props;

    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-1">
            {/*checked={this.props.todo.complated}*/}
            <input type="checkbox" checked={todo.complated} onChange={() => this.props.toggle(todo.id)}/>
          </div>
          <div className="col-md-10" style={{textDecoration: todo.complated?'line-through':''}}>
            {todo.title}
          </div>
          <div className="col-md-1">
            <button className="btn btn-danger btn-xs" onClick={() => this.props.remove(todo.id)}>X</button>
          </div>
        </div>
      </li>
    )
  }
}