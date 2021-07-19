let todos = {
	complete: [],
	incomplete: []
};

document.addEventListener('DOMContentLoaded', function() {

	fetchTodos();

	document.getElementById('incomplete').addEventListener('click', listItemClick);
	document.getElementById('complete').addEventListener('click', listItemClick);
});

function fetchTodos() {
	let xhr = new XMLHttpRequest();
	xhr.onload = function() {
		todos = JSON.parse(this.responseText);

		loadTodos();
	};
	xhr.open('GET', 'http://localhost:8888');
	xhr.send();
}

function loadTodos() {
	let incompleteHTML = '';
	for ( let i = 0; i < todos.incomplete.length; i++ ) {
		incompleteHTML = incompleteHTML + `<li class="todoItem" data-complete="1" id="${todos.incomplete[i].id}">${todos.incomplete[i].name}</li>`;
	}
	document.getElementById('incomplete').innerHTML = incompleteHTML;

	let completeHTML = '';
	for ( let i = 0; i < todos.complete.length; i++ ) {
		completeHTML = completeHTML + `<li class="todoItem" data-complete="0" id="${todos.complete[i].id}"><img src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png" style="height:14px;"/>${todos.complete[i].name}</li>`;
	}
	document.getElementById('complete').innerHTML = completeHTML;
}

function listItemClick(event) {
	if ( event.target.nodeName == 'LI' ) {
		let todoId = event.target.id;
		let complete = event.target.dataset.complete;
		console.log(todoId + '--> ' + complete);

		let xhr = new XMLHttpRequest();
		xhr.onload = function() { 
			fetchTodos();
		};
		xhr.open('PUT', 'http://localhost:8888/todo/' + todoId + '/' + complete);
		xhr.send();
	} else if ( event.target.nodeName == 'IMG' ) {
		let todoId = event.target.parentNode.id;

		let xhr = new XMLHttpRequest();
		xhr.onload = function() { 
			fetchTodos();
		};
		xhr.open('DELETE', 'http://localhost:8888/todo/' + todoId);
		xhr.send();
	}
	
}