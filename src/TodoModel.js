import $ from 'jquery';

export default class TodoApiModel {
  constructor(){
    this.todos = [];

    // 注册监听器，模型数据发生变化后，调用监听函数
    this.listeners = [];

    this.init();
  }

  init() {
    $.ajax({
      url: 'http://localhost:3000/todos',
      type: 'POST',
      success(todos){
        // 服务器返回最新的数组
        this.notify(todos);
      }
  }

  // 订阅，直接监听
  subscribe (listener) {
    this.listeners.push(listener);
  }

  // 分发数据
  emit () {
    this.listeners.forEach(listeners => listeners());
  }

  notify = (todos) => {
    this.emit();
  }

  addTodo = (todo) => {
    $.ajax({
      url: 'http://localhost:3000/todo',
      type: 'POST',
      data: todo,
      success(todos){
        // 服务器返回最新的数组
        this.notify(todos);
      }
    })
    // todo = Object.assign(todo, {id: Date.now(), complated: false});
    // todo = Object.assign({}, {id: Date.now(), complated: false}, todo);
    todo = {id: Date.now(), complated: false, ...todo}; // es6语法

    let todos = this.todos;
    todos.push(todo);

    this.notify(todos);

  }

  toggle = (id) => {
    let todos = this.todos;

    todos = todos.map((todo) => {
      if(todo.id === id) {
        todo.complated = !todo.complated;
      }
      return todo;
    });

    this.notify(todos);
  }

  toggleAll = (e) => {
    this.todos = this.todos.map((todo) => {
      todo.complated = e.target.checked;
      return todo;
    });
    this.notify(this.todos);
  }

  remove = (id) => {
    let todos = this.todos;
    let index = todos.findIndex(todo=>todo.id === id);
    todos.splice(index, 1);
    this.notify(todos);
  }

  clearComplated = () => {
    this.todos = this.todos.filter(todo=>!todo.complated);
    this.notify(this.todos);
  }

}