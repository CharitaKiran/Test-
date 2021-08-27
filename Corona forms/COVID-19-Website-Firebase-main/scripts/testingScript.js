
  var firebaseConfig = {
    apiKey: "AIzaSyCcjzKBMOVbmeJFY77fYbdh1Ou5VmFOniE",
    authDomain: "covid-19-d325a.firebaseapp.com",
    databaseURL: "https://covid-19-d325a-default-rtdb.firebaseio.com",
    projectId: "covid-19-d325a",
    storageBucket: "covid-19-d325a.appspot.com",
    messagingSenderId: "902897875426",
    appId: "1:902897875426:web:ee5bd40faa259b7a9be1bb"
  };

  firebase.initializeApp(firebaseConfig);

  

  var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit',submitForm);

  function submitForm(e){
    e.preventDefault();
    var fname =getInputVal('firstname');
    var lname = getInputVal('lastname');
    var mobile =getInputVal('mobile');     
    var state =getInputVal('state');         
    readState(state);     
    var email =getInputVal('email');     
    var emailstatus=validateEmail();     
    var profession =getInputVal('profession');     
    var dateofbirth =getInputVal('dateofbirth');     
    var symptomsList =getSelectedCheckboxValues('symptoms');     
        
   
    

    var selectedOption = document.querySelector('input[name = option]:checked').value;

    if(emailstatus)
    saveMessages(lname+ " " +fname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}


 function readState(state)
 {var centers;     
  var ref = 
  firebase.database().ref(state);     
  
  ref.on('value', (data) => {  
  centers = data.val();      
  document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();    
 }
 )
}


function getInputVal(id){
    return document.getElementById(id).value;
}


function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList)
{var newuserInputsRef = UserInputsRef.push();     
  newuserInputsRef.set(
    {name:name,         
    mobile:mobile,         
    email:email,         
    profession:profession,         
    dateofbirth:dateofbirth,         
    selectedOption:selectedOption,         
    state:state,          
    symptomsList:symptomsList})   
    alert("Thank you, find the list of centers nearby!  "); }




function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

function validateEmail() 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
