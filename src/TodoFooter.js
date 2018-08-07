import React from 'react';
import * as filterTypes from './filter-types';

export default class TodoFooter extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          {
            this.props.activeTodoCounts > 0 ?
              <div>
                你有<span className="badge">{this.props.activeTodoCounts}</span>事代办
              </div> : null
          }
        </div>
        <div className="col-md-6 text-center">
          <button className={`btn ${this.props.filterType === filterTypes.ALL?'btn-success':'btn-default'} btn-sm`}
                  onClick={()=>this.props.changeFilterType(filterTypes.ALL)} >全部</button>
          <button style={{margin: "0 10px"}} className={`btn ${this.props.filterType === filterTypes.ACTIVE?'btn-success':'btn-default'} btn-sm`}
                  onClick={()=>this.props.changeFilterType(filterTypes.ACTIVE)}>未完成</button>
          <button className={`btn ${this.props.filterType === filterTypes.COMPLATED?'btn-success':'btn-default'} btn-sm`}
                  onClick={()=>this.props.changeFilterType(filterTypes.COMPLATED)}>已完成</button>
        </div>
        <div className="col-md-3">
          {
            this.props.complatedTodoCounts > 0 ? <button className="btn btn-danger btn-sm" onClick={this.props.clearComplated}>删除已完成</button> : null
          }

        </div>
      </div>
    )
  }
}