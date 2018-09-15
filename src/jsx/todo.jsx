'use strict';
import React from 'react';
const randomstring = require('randomstring');
const $ = require ('jquery');
import DatePicker from 'react-jqueryui-datepicker';




//create react ToDo list component
class ToDo extends React.Component{
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.valueOfDueDateInput = "";
    };
    changeHandler( e){
        this.valueOfDueDateInput = e.format();
    }

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
    handleAddItem(target) {

        var input = this.refs.todoInput;
        var description = this.refs.descriptionInput;

        var title = input.value;
        var dueDate = this.valueOfDueDateInput;
        var description = description.value;

        if(title !== ""){
            this.props.listItems.push({
                "id": randomstring.generate(10),
                "title": title,
                "description": description,
                "dueDate": dueDate,
                "done": false
            });
            this.props.fetchData();
            this.refs.todoInput.value= "";
            this.refs.descriptionInput.value= "";
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
                    <span>{entry.dueDate}: </span><span style={{fontWeight: "bold"}}>{entry.title}</span>
                    <br/>
                    <span style={{fontStyle:"italic", fontSize: 10 + 'px'}}>{entry.description}</span>
                    <button onClick={this.deleteItem.bind(this, entry.id)} className='remove-item btn btn-default btn-xs pull-right'><span className="glyphicon glyphicon-remove"></span></button>
                    <button onClick={this.doneItem.bind(this, entry.id)} className="ok-item btn btn-success btn-xs pull-right"><span className="glyphicon glyphicon-ok"></span></button>
                </li>
            );
        }.bind(this));
        return(
            <div>
                <div className="col-md-6">
                    <input type="text" className="form-control add-todo" ref="todoInput" placeholder="Todo Title" onKeyPress={this.handleKeyPress.bind(this)}/>
                </div>
                <div className="col-md-6">
                    <DatePicker
                        className="form-control add-todo" ref="dueDateInput"  placeholder="Due Date" onChange={this.changeHandler.bind(this)}     />
                </div>

                <div className="col-md-12" style={{marginTop: 1.2 + 'em'}}>
                    <textarea className="form-control add-todo" ref="descriptionInput" placeholder="Todo Description"></textarea>
                </div>
                <div className="col-md-12" style={{marginTop: 1.2 + 'em'}}>
                    <button onClick={this.handleAddItem.bind(this)} className='remove-item btn btn-primary btn-xs pull-right'><span className="glyphicon glyphicon-ok"></span> Add Item</button>
                </div>
                <div className="clearfix"></div>
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