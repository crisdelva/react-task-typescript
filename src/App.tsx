import React, { useRef, useState } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>
interface InterfaceTask {
  name: string;
  done: boolean;
}
function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<InterfaceTask[]>([])
  const taskInput = useRef<HTMLInputElement>(null);
 
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("")
    taskInput.current?.focus();
    console.log(tasks)

  }

  const addTask = (name: string) => {
    const newTasks: InterfaceTask[] = [...tasks, { name, done: false }];
    setTasks(newTasks)
  }

  const toggleDoneTask=(i:number)=>{
    const auxTasks: InterfaceTask[] = [...tasks]
    auxTasks[i].done = !auxTasks[i].done
    setTasks(auxTasks)
  }
  const removeTask=(i:number)=>{
    const auxTasks:InterfaceTask[] = [...tasks]
    auxTasks.splice(i,1);
    setTasks(auxTasks)
  }

  return (
    <div className='container p-4'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-body d-flex justify-content-center'>
              <form onSubmit={handleSubmit}>
                <h1 className='mt-4'> Add Task </h1>
                <input
                  type="text"
                  onChange={e => setNewTask(e.target.value)}
                  value={newTask}
                  className='form-control mt-4 mb-4'
                  ref={taskInput}
                  autoFocus
                  />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>             
            </div>
          </div>
          {tasks.map((t: InterfaceTask, i: number) => (
             <div className='card card-body mt-2' key={i}>
               <h2 style={{textDecoration: t.done ? "line-through":""}}>{t.name}</h2>
               <div className='d-flex justify-content-center'>
                <button className="btn btn-secondary" onClick={()=>toggleDoneTask(i)}>
                {t.done ? "✓" : "✗"}
                </button>
                <button className='btn btn-danger' onClick={()=>removeTask(i)}> 🗑</button>
                </div>
             </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
