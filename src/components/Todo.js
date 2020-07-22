import React, { useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';

import List from './List';
import { useFormInput } from '../hooks/forms';

const todo = (props) => {
  // const [inputIsValid, setInputIsValid] = useState(false);
  // const [todoName, setTodoName] = useState(''); // return array of ['currentState', 'function']
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  // const [todoList, setTodoList] = useState([]); // no more need if we use reducer
  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

  // const todoInputRef = useRef();
  const todoInput = useFormInput();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter((todo) => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []); // reducerFunction, starting state, initial action want to execute

  useEffect(() => {
    axios.get('https://react-my-burger-5465f.firebaseio.com/todos.json').then((res) => {
      console.log(res);
      const todoData = res.data;
      const todos = [];
      for (const key in todoData) {
        todos.push({ id: key, name: todoData[key].name });
      }
      dispatch({ type: 'SET', payload: todos });
    });
    return () => {
      console.log('Cleanup');
    };
  }, []);

  // const mouseMoveHandler = (event) => {
  //   console.log(event.clientX, event.clientY);
  // };

  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseMoveHandler);
  //   return () => document.removeEventListener('mousemove', mouseMoveHandler);
  // }, []);

  // useEffect(() => {
  //   if (submittedTodo) {
  //     dispatch({ type: 'ADD', payload: submittedTodo });
  //   }
  // }, [submittedTodo]);

  // const inputChangeHandler = (event) => {
  //   setTodoName(event.target.value);
  // };

  const todoAddHandler = () => {
    const todoName = todoInput.value;
    // const todoName = todoInputRef.current.value;
    axios
      .post('https://react-my-burger-5465f.firebaseio.com/todos.json', { name: todoName })
      .then((res) => {
        setTimeout(() => {
          const todoItem = { id: res.data.name, name: todoName };
          dispatch({ type: 'ADD', payload: todoItem });
          // setTodoList(todoList.concat(todoItem));
        }, 3000);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const todoRemoveHandler = (todoId) => {
    axios
      .delete(`https://react-my-burger-5465f.firebaseio.com/todos/${todoId}.json`)
      .then((res) => {
        dispatch({ type: 'REMOVE', payload: todoId });
      })
      .catch((err) => console.log(err));
  };
  // const inputChangeHandler = (event) => {
  //   setTodoState({
  //     userInput: event.target.value,
  //     todoList: todoState.todoList
  //   });
  // };

  // const todoAddHandler = () => {
  //   setTodoState({
  //     userInput: todoState.userInput,
  //     todoList: todoState.todoList.concat(todoState.userInput)
  //   });
  // };

  // const inputValidationHandler = (event) => {
  //   if (event.target.value.trim() === '') {
  //     setInputIsValid(false);
  //   } else {
  //     setInputIsValid(true);
  //   }
  // };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={todoInput.onChange}
        value={todoInput.value}
        // ref={todoInputRef}
        // onChange={inputValidationHandler}
        style={{ backgroundColor: todoInput.validity ? 'transparent' : 'red' }}
        // style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
        // onChange={inputChangeHandler} value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      {useMemo(
        () => (
          <List items={todoList} onClick={todoRemoveHandler} />
        ),
        [todoList]
      )}
    </React.Fragment>
  );
};

// const todo = (props) => {
//   const [todoName, setTodoName] = useState(''); // return array of ['currentState', 'function']
//   const [todoList, setTodoList] = useState([]);

//   const inputChangeHandler = (event) => {
//     setTodoName(event.target.value);
//   };

//   const todoAddHandler = () => {
//     setTodoList(todoList.concat(todoName));
//   };

//   return (
//     <React.Fragment>
//       <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName} />
//       <button type="button" onClick={todoAddHandler}>
//         Add
//       </button>
//       <ul>
//         {todoList.map((todo) => (
//           <li key={todo}>{todo}</li>
//         ))}
//       </ul>
//     </React.Fragment>
//   );
// };

export default todo;
