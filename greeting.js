const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
	greetingTodo = document.querySelector(".greetingTodo"),
	todoInput = greetingTodo.querySelector("input");

const User_LS = "currentUser",
    Showing_CN = "showing";

function fadeOut(something){
	var opacity = 1;
	var id = setInterval(frame, 20);
	function frame(){
		if(opacity <= 0){
			clearInterval(id);
		}else{
			opacity = opacity-0.02;
			something.style.opacity = opacity;
		}
	}
}
function fadeIn(something){
	something.style.opacity = '0';
	something.style.display = 'block';
	something.classList.add('positionA');
	var opacity = 0;
	var id = setInterval(frame, 20);
	function frame(){
		if(opacity >= 1){
			clearInterval(id);
		}else{
			opacity = opacity+0.02;
			something.style.opacity = opacity;
		}
	}
}
function showInput(){
	const nextInput = document.querySelector("input")
}
function saveName(text){
    localStorage.setItem(User_LS, text);
}
function handleSubmit(event){
    event.preventDefault();
    const currentName = input.value;
    paintGreeting(currentName);
    saveName(currentName);
}
function askForName(){
    form.classList.add(Showing_CN);
    greeting.classList.remove(Showing_CN);
	input.focus();
    form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text){
    let greetings;
    if( hours >= 5 && hours < 12){
        greetings = "Good morning";
    }else if( hours >= 12 && hours < 17){
        greetings = "Good afternoon";
    }else if( hours >= 17 && hours < 22){
        greetings = "Good evening";
    }else{
        greetings = "Good night";
    }
    fadeOut(form);
    setTimeout(function(){fadeIn(greetingTodo);},800);
    // form.classList.remove(Showing_CN);
    // greeting.classList.add(Showing_CN);
    // toDoform.classList.add(Showing_CN);
	toDoInput.focus();
    greeting.innerText = `${greetings}, ${text}`;
    let span = document.createElement("span");
    span.innerText = "What is your main focus for today?";
    greeting.appendChild(span);    
}

function loadName(){
    const currentUser = localStorage.getItem(User_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}
init();