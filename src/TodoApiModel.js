
export default class TodoModel {
  constructor(){

    // 项localStorage写入的时候需要key
    this.STORE_KEY = 'todos';
    this.todos = JSON.parse(localStorage.getItem(this.STORE_KEY)) || [];

    // 注册监听器，模型数据发生变化后，调用监听函数
    this.listeners = [];
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
    localStorage.setItem(this.STORE_KEY, JSON.stringify(todos));
    this.emit();
  }

  addTodo = (todo) => {
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