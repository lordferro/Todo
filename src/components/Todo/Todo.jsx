import React from 'react';
import IconButton from 'components/IconButton';
import {ReactComponent as DeleteIcon} from '../../icons/delete.svg'

const Todo = ({ text, completed, onToggleCompleted, onDeleteTodo }) => {
  return (
    <>
      {' '}
      <input
        type="checkbox"
        className="TodoList__checkbox"
        checked={completed}
        onChange={onToggleCompleted}
      />
      <p className="TodoList__text">{text}</p>
      <button type="button" className="TodoList__btn" onClick={onDeleteTodo}>
       <DeleteIcon width='30' fill='white'/>
      </button>
    </>
  );
};


export default Todo;