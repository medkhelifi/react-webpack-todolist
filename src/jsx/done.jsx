'use strict';
import React from 'react';
/**
 * Add new function to Array Object to remove an element from an Array JSON
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

//create react ToDo list component
class Done extends  React.Component{
    constructor(props) {
        super(props);

        this.state = {
        };
        this.fetchData = this.fetchData.bind(this);
    };
    fetchData(){
        this.props.fetchData();
    }
    deleteItem(id, event){
        this.props.listItems.removeValue('id', id);
        this.fetchData();
    }
    // Called before the render method is executed
    componentWillMount() {
        this.fetchData();
    }
    render() {
        var lis = [];
        this.props.doneItems.forEach(function(entry){
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
}

export default Done;