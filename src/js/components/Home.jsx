import React, {useState, useEffect} from "react";

// El usuario fue crado directamente en la URL https://playground.4geeks.com/todo/users/fl-armable
const Home = () => {
	const [taskList, setTaskList] = useState([]);

	const getToDos = () => {
		fetch("https://playground.4geeks.com/todo/users/fl-armable")
			.then(response => {
				if (!response.ok)
					throw Error(response.statusText);
					return response.json(); // Lee la respuesta como JSON
			})
			.then(dataJson => {
				setTaskList(dataJson.todos)
				console.log(dataJson);
			})
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});
	}

	const postToDo = async (toDo) => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/fl-armable", {
				method: "POST",
				body: JSON.stringify({
					"label": toDo,
					"is_done": false
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			getToDos(); // Espera a que postToDo se complete
		} catch (error) {
			console.log('Looks like there was a problem: \n', error);
		}
	}

	const deleteToDo = async (index) => {
		try{
			const response = await fetch("https://playground.4geeks.com/todo/todos/" + index, {
				method: "DELETE"
			});
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			getToDos(); // Espera a que deleteToDo se complete
		} catch(error) {
			console.log('Looks like there was a problem: \n', error);
		};
	}

	useEffect( () => {
		getToDos();
	},[]);

	return (
		<div className="container">
			<input id='taskInput' className='input' type="text" placeholder={
            !taskList.label ? "No hay tareas, añade una" :"¿Te sobra tiempo? Añade otra tarea"}
            onKeyDown={(e) => { // onKeyDown escucha cuando se presiona una tecla
            if (e.key === 'Enter' && e.target.value.trim() !== ''){ // valida si la tecla presionada es Enter y si no son espacios en blanco (trim()) o nada
                postToDo(e.target.value); // agrega el valor que se ingreso en input  
                e.target.value = '' //Limpia el valor de input después de que se 'carga la tarea' 
            }
        	}}
        	/>
			<ul className="list">
            	{taskList.map((task) => // recorre taskList y devuelve el HTML. Asigna el id a key y el label al item <li>
            	<li className="item" key={task.id}>{task.label}
            		<button className="button" onClick={()=> deleteToDo(task.id)}>x</button>
            	</li> // .button oculta el botón, mientras '.item:hover + .button' muestran el botón cuando el mouse pasa sobre la tarea
            	// clic en el botón llama la función deleteToDo con el parámetro index
            )}
			</ul>
		</div>
	);
};

export default Home;