/** @jsx React.DOM */
'use strict';
var React = require('react');

module.exports = function(controller){
	return React.createClass({
		getInitialState: function() {
			return {ctr: 0};
		},
		nudge: function(){
			var ctx = this;
			controller.sendHi();
		},
		componentDidMount: function(){
			var ctx = this;
			controller.receiveHi = function(){
				console.log('receiveHi');
				nudgeElem();
				ctx.setState({ctr: ctx.state.ctr + 1});
			};
		},
	    render: function(){
	        return (
	        		<div>
		        		<h1>Hello</h1>
		        		<div className='sayhi' onClick={this.nudge}>Say Hi</div>
		        		<div className='hictr'>{this.state.ctr}</div>
	        		</div>
	        	)
	    }
	});
}

function nudgeElem(){	
	document.getElementsByClassName('sayhi')[0].className = 'sayhi';
	document.getElementsByClassName('sayhi')[0].className = 'sayhi nudge';
	setTimeout(function(){						
		document.getElementsByClassName('sayhi')[0].className = 'sayhi';
	}, 500);
}