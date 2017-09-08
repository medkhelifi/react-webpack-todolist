'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const randomstring = require('randomstring');
const $ = require ('jquery');



//this variable will contain all todoList
//var listItems = [];
import listItems from '../db/db.json';

/**
 * Access to DB and get all TodoList
 * @param listItems
 * @param done
 * @returns {*}
 */
const getItemsQuery= function(listItems, done){
    let _temp = [];
    if(done === undefined) return listItems; //if true or false are not specified as a parameter we return the whole list
    listItems.forEach(function(entry){
       if(entry.done === done){
           _temp.push(entry);
       }
    });
    return _temp;
};
/**
 * Add new function added to Array to remove an element from an Array JSON
 * @param name
 * @param value
 */
Array.prototype.removeValue = function(name, value) {
    var array = $.map(this, function(v, i) {
        return v[name] === value ? null : v;
    });
    this.length = 0; //clear original array
    this.push.apply(this, array); //push all elements except the one we want to delete
};
//create react Undone list component
var unDone = new React.createClass({
    getInitialState: function() {
        return {
            undoneItems: {}
        }
    },
    handleKeyPress: function(target){
        if(target.charCode==13) {
            var input = this.refs.todoInput;
            var todoInput = input.value;
            if(todoInput !== ""){
                listItems.push({
                    "id": randomstring.generate(10),
                    "description": todoInput,
                    "done": false
                });
                this.fetchData();
            }
            this.refs.todoInput.value= "";
        }
    },
    doneItem: function(id, event){
        listItems.forEach(function(entry){
            if(entry.id == id){
                entry.done = true;
            }
        });
        this.fetchData();
    },
    deleteItem: function(id, event){
        listItems.removeValue('id', id);
        this.fetchData();
    },
    fetchData: function(){
        this.state.undoneItems = getItemsQuery(listItems, false);
        this.setState({
            undoneItems:  this.state.undoneItems
        });
    },
    // Called before the render method is executed
    componentWillMount: function() {
        this.fetchData();
    },
    render: function() {
        var lis = [];
        this.state.undoneItems.forEach(function(entry){
            lis.push(
                <li key={entry.id}>
                    {entry.description}
                    <button onClick={this.deleteItem.bind(this, entry.id)} className='remove-item btn btn-default btn-xs pull-right'><span className="glyphicon glyphicon-remove"></span></button>
                    <button onClick={this.doneItem.bind(this, entry.id)} className="ok-item btn btn-success btn-xs pull-right"><span className="glyphicon glyphicon-ok"></span></button>
                </li>
            );
        }.bind(this));
        return(
            <div>
                <input type="text" className="form-control add-todo" ref="todoInput" placeholder="Add todo" onKeyPress={this.handleKeyPress}/>
                <hr/>
                <ul  className="list-unstyled items">
                    {lis}
                </ul>
                <div className="todo-footer">
                    <strong><span className="count-todos">{this.state.undoneItems.length}</span></strong> Items Left
                </div>

            </div>

        )
    }
});
//create react Undone list component
var done = new React.createClass({
    getInitialState: function() {
        return {
            doneItems: {}
        }
    },
    fetchData: function(){
        this.state.doneItems = getItemsQuery(listItems, true);
        this.setState({
            doneItems:  this.state.doneItems
        });
    },
    deleteItem: function(id, event){
        listItems.removeValue('id', id);
        this.fetchData();
    },
    // Called before the render method is executed
    componentWillMount: function() {
        this.fetchData();
    },
    render: function() {
        var lis = [];
        this.state.doneItems.forEach(function(entry){
            lis.push(
                <li key={entry.id}>
                    {entry.description}
                    <button onClick={this.deleteItem.bind(this, entry.id)} className='remove-item btn btn-default btn-xs pull-right'><span className="glyphicon glyphicon-remove"></span></button>
                </li>
            );
        }.bind(this));
        return(
            <div>
                {lis}
            </div>

        )
    }
});

//create a DOM elements and Assign the React component to a DOM element
var undoneElement = React.createElement(unDone, {});
var doneElement = React.createElement(done, {});

//the the DOM element to our div element
ReactDOM.render(undoneElement, document.querySelector('#todoItems'));
ReactDOM.render(doneElement, document.querySelector('#doneItems'));
