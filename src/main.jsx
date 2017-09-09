'use strict';
import 'jquery';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';

import ToDo from './jsx/todo.jsx';
import Done from './jsx/done.jsx';

import listItems from './db/db.json';
/**
 * Access to DB and get all TodoList
 * @param listItems
 * @param done
 * @returns {*}
 */

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listItems: listItems,
            undoneItems: [],
            doneItems: []
        };
        this.getItemsQuery = this.getItemsQuery.bind(this);
        this.fetchData = this.fetchData.bind(this);

    }
    fetchData(){
        console.log("IM CALLED");
        this.state.undoneItems = this.getItemsQuery(false);
        this.state.doneItems = this.getItemsQuery(true);
        this.setState({
            undoneItems:  this.state.undoneItems,
            doneItems:  this.state.doneItems
        });
    }
    getItemsQuery(done){
        let _temp = [];
        if(done === undefined) return this.state.listItems; //if true or false are not specified as a parameter we return the whole list
        this.state.listItems.forEach(function(entry){
            if(entry.done === done){
                _temp.push(entry);
            }
        });
        return _temp;
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6">
                    <div className="todolist">
                        <h1>Todos</h1>
                        <div id="todoItems">
                            <ToDo
                                getItemsQuery = {this.getItemsQuery}
                                listItems = {this.state.listItems}
                                undoneItems = {this.state.undoneItems}
                                fetchData = {this.fetchData}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="todolist">
                         <h1>Already Done</h1>
                         <ul id="doneItems" className="list-unstyled items items-done">
                             <Done
                                 getItemsQuery = {this.getItemsQuery}
                                 listItems = {this.state.listItems}
                                 doneItems = {this.state.doneItems}
                                 fetchData = {this.fetchData}/>
                        </ul>
                    </div>
                </div>
            </div>);
     }
 }
ReactDOM.render(<Main />, document.getElementById('container'));