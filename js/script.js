// Selecting Elements
const clear= document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');
const plus = document.getElementById('plus');

// Classes Names
const check = 'fa-check-circle';
const unCheck = 'fa-circle-thin';
const lineThrough = 'lineThrough';

// Show Today's Date
const options = { weekday:'long', month:'short', day:'numeric' };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US' , options);

// Variable 
let itemList, id;

// Local Storage Work Starts
// Get Item From Local Storage
let data = localStorage.getItem('ToDo');

// check if data is not empty
if(data){
    itemList = JSON.parse(data);
    id = itemList.length;
    loadList(itemList);
}
else{
    // If data isn't empty
    itemList = [];
    id = 0;
}

// Load items to User Interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name , item.id , item.done , item.trash);
    });
}

// Clear LocalStorage
clear.addEventListener('click' , function(){
    localStorage.clear();
    location.reload();
})

// Local Storage Work Ends


// Add to-do
function addToDo(toDo , id , done , trash){
    
    if(trash){ return; }

    const doneToDo = done ? check : unCheck;
    const lineTh = done ? lineThrough : ''; 

    const item = `<li class="item">
    <i class="fa ${doneToDo} complete" job="complete" id="${id}"></i>
    <p class="text ${lineTh}">${toDo}</p>
    <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
</li>`;
    const position = 'beforeend';

    list.insertAdjacentHTML(position , item);
}


// Addd An Item When User Enter
// document.addEventListener('keyup' , function(event) { 
//     if (event.keyCode == 13) {
//         const toDo = input.value;

//         // If Input Isn't Empty 
//         if(toDo){
//             addToDo(toDo , id , false , false); 
            
//             itemList.push({
//                 name : toDo,
//                 id : id,
//                 done: false,
//                 trash: false
//             });
            
//             // Add To Local Storage
//             localStorage.setItem('ToDo' , JSON.stringify(itemList));

//             id++;
//         }

//         input.value = '';
        
//     }
// })

//Add Items When User Click Plus Button
plus.addEventListener('click' , function() { 
        const toDo = input.value;

        // If Input Isn't Empty 
        if(toDo){
            addToDo(toDo , id , false , false); 
            
            itemList.push({
                name : toDo,
                id : id,
                done: false,
                trash: false
            });
            
            // Add To Local Storage
            localStorage.setItem('ToDo' , JSON.stringify(itemList));
            id++;
        }
        // Make Input Empty
        input.value = '';
});


// Complete To-Do
function completeToDo(element){ 
    element.classList.toggle(check);
    element.classList.toggle(unCheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);

    itemList[element.id].done = itemList[element.id].done ? false : true;
};

// Remove To-Do
function removeToDo(element){ 
    element.parentNode.parentNode.removeChild(element.parentNode);

    itemList[element.id].trash = true;
};

// Target the Items Created Dynamically
list.addEventListener('click' , function(event){ 
    const element = event.target; // returns the clicked item
    const elementJob = element.attributes.job.value; // returns the attribute complete or delete 

    if(elementJob == 'complete'){
        completeToDo(element);
    }
    else if(elementJob == 'delete'){
        removeToDo(element);
    }

    // Add To Local Storage
    localStorage.setItem('ToDo' , JSON.stringify(itemList));

});

// Ends To-Do App