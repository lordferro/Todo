import React, { Component } from 'react';
import shortid from 'shortid';
import ColorPicker from './components/ColorPicker';
// import Counter from './components/Counter';
import Container from './components/Container';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import Form from './components/Form';
import initialTodos from './todos.json';
import TodoFilter from 'components/TodoFilter';
import Modal from 'components/Modal';
import Clock from 'components/Clock';
import Tabs from 'components/Tabs';
import tabs from './tabs.json';
import { ReactComponent as AddIcon } from './icons/add.svg';
import IconButton from 'components/IconButton';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    const parsedTodos = JSON.parse(localStorage.getItem('todos'));
    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  // ВНИМАНИЕ это обычный метод класса, НЕ НАДО ЕГО ДЕЛАТЬ СТРЕЛОЧНОЙ ФУНКЦИЕЙ
  // ТУТ ОБЯЗАТЕЛЬНО ВСЁ ДЕЛАТЬ ЧЕРЕЗ ПРОВЕРКИ!!
  // Порядок аргументов обязателен!!!!!!!!!!!!!!!
  componentDidUpdate(prevProp, prevState) {
    // имеется ввиду что состояние собирается обновиться и nextTodos это новые
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }
  }

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({ todos: [todo, ...todos] }));

    this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  fromSubmitHandler = data => {
    console.log(data);
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? (total += 1) : total),
      0
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const comletedTodos = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        {/* aria-label записано в оригинальном виде, она будет записана в ...allyProps и затем распылена  */}
        <IconButton onClick={this.toggleModal} aria-label="Добавить Todo">
          <AddIcon width="40" />
        </IconButton>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}

        {/* shouldComponentUpdate(nextProps, nextState */}
        <Tabs items={tabs} />
        
        {/* <Clock/> */}
        {/* <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            Руддщ
            <button type="button" onClick={this.toggleModal}>
              Close Modal
            </button>
          </Modal>
        )} */}
        {/* <Form onSubmit={this.fromSubmitHandler} /> */}
        <div>
          <p> Total todos: {totalTodoCount}</p>
          <p> completed todos: {comletedTodos}</p>
        </div>
        <TodoEditor onSubmit={this.addTodo} />
        <TodoFilter type="text" value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
// {
//   /*
// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ]; */
// }
