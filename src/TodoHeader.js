import React from 'react';

const ENTRY_KEY = 13;

export default class TodoHeader extends React.Component {

  hanldeKeyDown = (e) => {
    if(e.keyCode === ENTRY_KEY) {
      let title = e.target.value;
      this.props.addTodo({title});
      e.preventDefault();
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <input autoFocus={true} type="text" onKeyDown={this.hanldeKeyDown} className="form-control"/>
        </div>
      </form>
    )
  }
}