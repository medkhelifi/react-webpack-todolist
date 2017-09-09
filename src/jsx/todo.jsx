'use strict';
import React from 'react';
const randomstring = require('randomstring');
const $ = require ('jquery');



//create react ToDo list component
class ToDo extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
        };
        this.fetchData = this.fetchData.bind(this);
    };

    handleKeyPress(target){
        if(target.charCode==13) {
            var input = this.refs.todoInput;
            var todoInput = input.value;
            if(todoInput !== ""){
                this.props.listItems.push({
                    "id": randomstring.generate(10),
                    "description": todoInput,
                    "done": false
                });
                this.props.fetchData();
            }
            this.refs.todoInput.value= "";
        }
    }
    doneItem(id, event){
        this.props.listItems.forEach(function(entry){
            if(entry.id == id){
                entry.done = true;
            }
        });
        this.props.fetchData();
    }
    deleteItem(id, event){
        this.props.listItems.removeValue('id', id);
        this.fetchData();
    }
    fetchData(){
        this.props.fetchData();
        console.log(this.props.undoneItems);
    }
    // Called before the render method is executed
    componentWillMount() {
        this.fetchData();
    }
    render() {
        var lis = [];
        this.props.undoneItems.forEach(function(entry){
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
                <input type="text" className="form-control add-todo" ref="todoInput" placeholder="Add todo" onKeyPress={this.handleKeyPress.bind(this)}/>
                <hr/>
                <ul  className="list-unstyled items">
                    {lis}
                </ul>
                <div className="todo-footer">
                    <strong><span className="count-todos">{this.props.undoneItems.length}</span></strong> Items Left
                </div>

            </div>

        )
    }
};
export default  ToDo;