// swal("Login Successfully!", "account created", "success"); - checking sweet alert

console.log("JavaScript loaded Successfully !!");

    let prevData = localStorage.getItem('User Informations');   //Get Item from Local Storage
    let userData = prevData ? JSON.parse(prevData) : [];        //JSON to Object convert
    console.log(userData);  //console to check the data

//SIGNUP FUNCTION   
console.log(userData.length)
// console.log(userData.length == undefined);
    let userID =1000;
    // let prevUserID = ;
    // console.log("userID",prevUserID);
function signUp(event){

    event.preventDefault();     // TO STOP THE PAGE REFRESH - invoke
    console.log("signup");      // Checking Function is calling or not on click !

    // Getting values from the input feilds:
    let signupUsername = document.getElementById('signupUsername').value;   //Getting Username
    let signupEmail = document.getElementById('signupEmail').value;         //Getting Email
    let signupPassword = document.getElementById('signupPassword').value;   //Getting Password
    
    // let userID = 1000;


        console.log("Username: " + signupUsername);                         //checking username
        console.log("Email Address: " + signupEmail);                       //checking email
        console.log("Password: " + signupPassword);                         //checking password 
        console.log("Username Length: " + signupUsername.length);           //checking username length
        console.log("Password Length: " + signupPassword.length);           //checking password length
    

    //Validations of SignUp Page

    //username validation
    if(!(signupUsername && (signupUsername.length >= 3 && signupUsername.length <= 17))){
        console.log("username validation error occured!!");
        swal("Invalid Username !!", "Username should'nt be empty or greater than 2 and less than 18 !", "error");          
    }


    // email validations 
    else if(!(signupEmail && signupEmail.includes('@'))){
        console.log("email validation error occured!!");
        swal("Invalid Email !!", "Email must contain @", "error");
      
    }
    
    //password validations
    else if(!(signupPassword && signupPassword.length >= 5)){
        console.log("password validation error occured!!");
        swal("Invalid Password !!", "Password should'nt be empty or greater than 7 !!", "error");
    }

    // if passess all the validation than:-
    else{
        
        //creating an object to store the information of the signup page we get
        let userDetails =  {
            username: signupUsername,
            email: signupEmail,
            password: signupPassword,
            userID:  userData.length == 0 ? (userID +1) : (userData[(userData.length-1)].userID+1)
        }
            userData.push(userDetails);     //push the data into the userData Array

            let stringifyData  = JSON.stringify(userData);
            localStorage.setItem("User Informations",stringifyData);


            localStorage.setItem(
                "loginUser",
                JSON.stringify(userDetails)
            );
          
// setting input feilds empty    
// $('#singup input').val('');  jquery
    document.getElementById('signupUsername').value = '';   
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    

    
    swal("Login Successfully!", "account created", "success");  
   console.log("Login Successfully")
// Check krwa len gy bd m
    
    setInterval(function(){
        window.location.href = "../Dashboard/dashboard.html";
    },2000);
       
    }


}

function loginToAccount(event){
    event.preventDefault();
    console.log('login');
    let loginEmail = document.getElementById('loginEmail').value;
    let loginPassword = document.getElementById('loginPassword').value;
    
    let userFound = userData.find((user)=>{
      if(user.email == loginEmail){
        return user;
      }
      else{
        return 0;
      }
    });

    console.log(userFound);
    if(!(userFound)){
        console.log("user doesn't exist");
        swal("Invalid Email !!", "user not exist or empty feild", "error");
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    }

    else if(!(userFound.password == loginPassword)){
        console.log("Wrong Password");
        swal("Wrong Password !!", "Invalid password, please try again", "error");
        document.getElementById('loginPassword').value = '';
    }
    else if(userFound.email == loginEmail && userFound.password === loginPassword){
        swal("Login Successfully!", `Wellcome ${userFound.username}`, "success");  
        console.log("login success");
        
    let loginUser  = JSON.stringify(userFound); 
    localStorage.setItem('loginUser' , loginUser);
    
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        window.location.href = './Dashboard/dashboard.html';


    }

}









//Dashboard

let prevTodoData = localStorage.getItem("Todo Item") ;
let todoData = prevTodoData ? JSON.parse(prevTodoData) : [];


let loginUserGet = JSON.parse(localStorage.getItem('loginUser'));
console.log(loginUserGet);


let dashboardUser = document.getElementById('dashboard-user');
dashboardUser.innerHTML = loginUserGet.username;
TODOlist(loginUserGet.userID)



let todoID = 100;


function dashboard(event){
    event.preventDefault();


 
    // dashboardUser = userData.username;

    let todoTitle = document.getElementById('todoTitle').value;
    let priority = document.getElementById('prioritySelect');
    // console.log(priority);
    let selectedPriority = priority.value;
    console.log(selectedPriority);
 

    let description = document.getElementById('description').value;
 // Date object
const d = new Date();

let currentDay= String(d.getDate()).padStart(2, '0');

let currentMonth = String(d.getMonth()+1).padStart(2,"0");

let currentYear = d.getFullYear();

// we will display the date as DD-MM-YYYY 

let date = `${currentDay}-${currentMonth}-${currentYear}`;


 
    if(!todoTitle){
        // swal("Todo Title is Missing!!", "Please add Todo Tile", "error"); 
        console.log("Please add Todo Tile")   
    }
    
    else if(selectedPriority == "none"){
        // swal("Priority is Missing!!", "Please choose priority", "error");    
        console.log("Please choose priority")
    }
    
    else{
        let todo = {
            userID: loginUserGet.userID,
            todoTitle,
            selectedPriority,
            description,
            date,
            todoID: todoData.length == 0? todoID+1 : (todoData[todoData.length-1].todoID + 1)
        }
        todoData.push(todo);
        // console.log(todo)
        document.getElementById('todoTitle').value = '';
        document.getElementById('description').value = '';
        // priority.value = '';
        alert(todoTitle + " descript: " +description + " " + " date: " +date+ " "+ selectedPriority);

        //reset:
        

    }

    let todoStringify = JSON.stringify(todoData);
    localStorage.setItem("Todo Item" , todoStringify);
    TODOlist(loginUserGet.userID);


}


//task done


function TODOlist(userid){

    let prevTodoData = localStorage.getItem("Todo Item") ;
    let todoData = prevTodoData ? JSON.parse(prevTodoData) : [];
    let html = '';
    todoData.forEach(data => {
        console.log(data.userID);
        if(data.userID==userid){
            html+=`
                <tr>
                    <td><input type="checkbox" class='checkable' id="done" ></td>
                    <td>${data.userID}</td>
                    <td>${data.todoID}</td>
                    <td>${data.selectedPriority}</td>
                    <td>${data.todoTitle}</td>
                    <td>${data.description}</td>
                    <td>${data.date}</td>
                    <td><i class="fa-solid fa-pen-to-square me-2"></i>
                    <i class="fa-solid fa-trash" onclick="delt()"></i></td>
                </tr>
            `;
            }
    });

    document.getElementById("todoBody").innerHTML=html;
   
}

function delt(){
    let prevTodoData = localStorage.getItem("Todo Item") ;
    let loginUserGet = JSON.parse(localStorage.getItem('loginUser'));
    let todoData = prevTodoData ? JSON.parse(prevTodoData) : [];
    let ind = loginUserGet.userID;   //login user ID
   
todoData.filter((index)=>{    
    console.log(ind);
    todoData.splice(index, 1);
    localStorage.setItem("Todo Item", JSON.stringify(todoData));
    let user =data.userid

}) 
// TODOlist(ind);

    // alert(todoData.userID);
    // alert(ind+" " +todoData.indexOf(ind));
}

function testLogout(){
    localStorage.setItem("loginUser", null);
    window.location.href = "../index.html";
}

var checkboxes = document.querySelectorAll(".checkable");

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("click", function() {
        var closestTr = this.closest('tr');
        if (closestTr) {
            closestTr.classList.toggle('checked');
        }

    });
});
