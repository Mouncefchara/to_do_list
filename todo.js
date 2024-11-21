let task=document.getElementById("taskText");
let btnCreate=document.getElementById("inputBtn");

let toDoTasks;
let didItTasks;
let mode="create";
if(localStorage.TODOTASK!=null){
    
    toDoTasks= JSON.parse(localStorage.TODOTASK);
   
}else{
    
    toDoTasks=[];
}
if(localStorage.DIDITTASK!=null){
    
    didItTasks= JSON.parse(localStorage.DIDITTASK);
   
}else{
    
    didItTasks=[];
}
displayToDoTasks();
displayDidItTasks();

function createTask(){
   
    if(task.value!==""){
        if(mode==="create"){

        toDoTasks.push(task.value)
        
    }else{
        toDoTasks[x]=task.value;
        
    }
        
        localStorage.setItem("TODOTASK",JSON.stringify(toDoTasks));
        task.value="";
        displayToDoTasks();
        mode="create";
        btnCreate.innerHTML=mode;
        
    }else{
        alert("please enter your task");
    }
}



function displayToDoTasks(){
    let tmp="";
for(let i=0;i<toDoTasks.length;i++){
    tmp+=`
     <tr>
         <td>${toDoTasks[i]}</td>
         <td><button class="outputBtn"  onclick="updateTask(${i})" id="${i}">update</button></td>
         <td><button class="outputBtn" onclick="didIt(${i})" id="${i}">did it</button></td>
      </tr>
    `
}
document.getElementById("wantTbody").innerHTML=tmp;

}
function displayDidItTasks(){
    let tmp="";
    for(let i=0;i<didItTasks.length;i++){
        tmp+=`
         <tr>
             <td>${didItTasks[i]}</td>
             <td><button class="outputBtn"  onclick="back(${i})" id="${i}">back</button></td>
             <td><button class="outputBtn"onclick="deleteTask(${i})" id="${i}">delete</button></td>
          </tr>
        `
    }
    document.getElementById("didTbody").innerHTML=tmp;
}

function didIt(i){
    didItTasks.push(toDoTasks[i]);
    toDoTasks.splice(i,1);
    localStorage.setItem("TODOTASK",JSON.stringify(toDoTasks));
    localStorage.setItem("DIDITTASK",JSON.stringify(didItTasks));
    displayDidItTasks();
    displayToDoTasks();
}
function back(i){
    toDoTasks.push(didItTasks[i]);
    didItTasks.splice(i,1);
    localStorage.setItem("TODOTASK",JSON.stringify(toDoTasks));
    localStorage.setItem("DIDITTASK",JSON.stringify(didItTasks));
    displayDidItTasks();
    displayToDoTasks();
}

function deleteTask(i){
    didItTasks.splice(i,1);
    localStorage.setItem("DIDITTASK",JSON.stringify(didItTasks));
    displayDidItTasks();
}
let x;
function updateTask(i){
scroll({
    top :0,
    behavior:'smooth'
})
task.focus();
    mode="update";
    btnCreate.innerHTML=mode;
    x=i;
    task.value=toDoTasks[i];
}