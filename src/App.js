import './App.css';
import { useState } from 'react';
import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, yellow, red } from '@mui/material/colors';


function App() {



  const [inputValue, setInputValue] = useState(''); 
  
  const [todos, setTodos] = useState([
   
  ]);
 

  const addNewTodo = () => {
    if(inputValue) {
      setTodos((currentTodos) => [...currentTodos,
        {
          text: inputValue,
          isChecked: false,
          id: (Math.random() + 1).toString(36).substring(2)
        } 
      ]);
    }

    setInputValue('');
    console.log(todos);
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }


  const deleteItem = (id)=> {
    const newArray = todos.filter((todo) => todo.id != id);

    setTodos(newArray);
  }

  const checkItem = (id)=> {
    const newArray = todos.map((todo) => {
      if(todo.id == id) {
        todo.isChecked = !todo.isChecked
      }

      return todo;
    });

    setTodos(newArray);
  }

  const deleteAll = () => setTodos([])

  
  const checkAll = ()=> {
    const newArray = todos.map((todo) => {
      todo.isChecked = true;

      return todo;
    });

    setTodos(newArray);
  }

    
  const deleteChecked = ()=> {
    const newArray = todos.filter((todo) => !todo.isChecked);

    setTodos(newArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>To do list</h2>
        
        <Box
          sx={{
            maxWidth: 400,
            width: "100%", 
          }}
          
        >
            <TextField
              fullwidth
              label="What needs to be done"
              variant="standard"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                      addNewTodo();
                      ev.preventDefault();
                    }
                }
                }
                
            />
            

          {
            todos.map((todo) => (
             
              <div key={todo.id}>
                <Stack spacing={3} direction="row">
                  <Checkbox checked={todo.isChecked}  onClick={() => checkItem(todo.id)} />{todo.text} 
                  <Chip label="x" deleteIcon={<DeleteIcon />} variant="outlined" on onClick={() => deleteItem(todo.id)}/>                  
                </Stack>
              </div>
             
            ))
          }
        </Box>
        <div>
        <br />
           <Button variant="outlined" onClick={() => deleteChecked()}>Delete checked</Button>&nbsp;&nbsp;&nbsp;
           <Button variant="outlined" onClick={() => checkAll()}>Check all</Button>&nbsp;&nbsp;&nbsp;
           <Button variant="outlined" onClick={() => deleteAll()}>Delete all</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
