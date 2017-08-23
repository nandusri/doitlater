var data = (localStorage.getItem('todoList')) ? (JSON.parse(localStorage.getItem('todoList'))):{
	todo : [],
	completed : []
}

renderTasks();

document.getElementById('add').addEventListener('click',function(){
	var task = document.getElementById('task').value;
	if(task){
		addItem(task);
	} 
});

document.getElementById('task').addEventListener('keydown',function(e){
	var task = this.value;
	if(e.code === 'Enter' && task){
		addItem(task);
	}
})
function addItem(task){
		addTodoTask(task);
		document.getElementById('task').value='';

		data.todo.push(task);
		updateDataObject();
}

function renderTasks(){
	if (!data.todo.length && !data.completed.length) return;

	for(var i = 0 ; i < data.todo.length ; i++){
		var value = data.todo[i];
		addTodoTask(value);
	}
	for(var j = 0 ; j < data.completed.length ; j++){
		var value = data.completed[j];
		addTodoTask(value,true)
	}
}

function updateDataObject(){
	localStorage.setItem('todoList', JSON.stringify(data))
}
function removeTask(){
	var task_parent = this.parentNode.parentNode;
	var item = task_parent.parentNode;
	var list = item.parentNode;
	var list_id = list.id;
	var value = task_parent.childNodes[0].innerText;

	if (list_id === 'todo'){
		data.todo.splice(data.todo.indexOf(value),1);
	}else{
		data.completed.splice(data.completed.indexOf(value),1);
	}

	updateDataObject();

	list.removeChild(item);
}
function completeTask(){
	var task_parent = this.parentNode.parentNode;
	var item = task_parent.parentNode;
	var list = item.parentNode;
	var list_id = list.id;
	var value = task_parent.childNodes[0].innerText;

	if (list_id === 'todo'){
		data.todo.splice(data.todo.indexOf(value),1);
		data.completed.push(value);
	}else{
		data.completed.splice(data.completed.indexOf(value),1);
		data.todo.push(value);
	}

	updateDataObject();

	var target_list = (list_id === 'todo') ? document.getElementById('completed') : document.getElementById('todo')
	
	list.removeChild(item);
	target_list.insertBefore(item,target_list.childNodes[0]);
	}

function addTodoTask(text,completed){
	var list =(completed) ? document.getElementById('completed') : document.getElementById('todo');

	var item = document.createElement('li');

	var row = document.createElement('div');
	row.classList.add('row');

	var task = document.createElement('div');
	task.classList.add('col-md-8');
	task.classList.add('col-sm-8');
	task.classList.add('col-xs-8');
	task.classList.add('task');
	task.innerText = text;

	var buttons = document.createElement('div');
	buttons.classList.add('col-md-4');
	buttons.classList.add('col-sm-4');
	buttons.classList.add('col-xs-4');
	
	var trash = document.createElement('a');
	trash.classList.add('trash');
	trash.innerHTML='<i class="fa fa-trash-o" aria-hidden="true"></i>';

	trash.addEventListener('click',removeTask);

	var check = document.createElement('a');
	check.classList.add('check');
	check.innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>'

	check.addEventListener('click',completeTask);

	buttons.appendChild(check);
	buttons.appendChild(trash);
	row.appendChild(task);
	row.appendChild(buttons);
	item.appendChild(row);

	list.insertBefore(item, list.childNodes[0]);

}