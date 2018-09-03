//defining ui variables

const form = document.querySelector('#task-form');//for form

const taskList = document.querySelector('.collection');//collection of tasks
const clearBtn = document.querySelector('.clear-task');//for clear btn
const filter =document.querySelector('#filter');//filtering task in collection
const taskInput = document.querySelector('#task');//new task input 


//load al event listeners

loadEventlisteners();

function loadEventlisteners(){
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task event
    form.addEventListener('submit',addtask);
    //remove task events
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
};

//getting task from local storage

 function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
          // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

    })

 }

//add task function

function addtask(e){
    if(taskInput.value === '') {
        alert('Enter the task First');
    }
    // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';


        e.preventDefault();
};

//store task function

 function storeTaskInLocalStorage(task){
     let tasks;
     if(localStorage.getItem('tasks')===null){
         tasks = [];
     }else{
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }

     tasks.push(task);

     localStorage.setItem('tasks',JSON.stringify(tasks));
 }





//remove task function
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("are you sure ?")){
        e.target.parentElement.parentElement.remove();

        //removing from local storage also
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    };
}

//defining remove from local storage function


function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task,index){

        if(taskItem.textContent===task){
            tasks.splice(index,1);//which_one_and-how_much
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
}








//clear Tasks function

function clearTasks(){
    //simple but slow 
    //taskList.innerHTML = '';

    //while loop but fast
    // while(taskList.firstChild){
    //     if(confirm("are you sure you want to clear all the tasks ?")){
    //     taskList.firstChild.remove();

    //     }
    // }
    if(taskList.firstChild){
        if(confirm("are you sure you want to clear all the tasks ?")){
           //nothing is needed its just for check 
        }
    }
    
    while(taskList.firstChild){
       
        taskList.removeChild(taskList.firstChild);

        
    }
    clearTasksFromLocalStorage();

}
//clearing local storage from_clear_tasks btn

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//for more info about innerhtml vs remove child ->https://jsperf.com/innerhtml-vs-removechild/47

//Filter tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !=- 1)
        {
            task.style.display = 'block';
        }
        else
        {
            task.style.display = 'none';
        }

        
    });
};












