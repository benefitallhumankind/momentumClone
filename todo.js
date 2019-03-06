const toDoform = document.querySelector(".js-toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    toDoTitle = document.querySelector(".js-toDoList");
const Todos_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentElement;
	li.classList.add('deleted');
    setTimeout(function(){
		toDoList.removeChild(li)},'700');
    const cleanToDos = toDos.filter(function(toDo){ /* filter : 함수를 통과한 모든 배열 요소로 다시 배열을 만듬 */
        return toDo.id !== parseInt(li.id);
    });
    if(cleanToDos == ""){
		setTimeout(function(){
			toDoTitle.classList.remove("showing");			
		},'700');
    }
    toDos = cleanToDos;
    saveToDos(); 
}

function saveToDos(){ /* JSON.stringify : 객체를 string으로 변경해줌 */
    localStorage.setItem(Todos_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    toDoTitle.classList.add("showing");
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.setAttribute('title','Delete');
    delBtn.innerText = "❌"; /* :smile emojisense plugin */
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length +1;
    span.innerText = text;
	// li.classList.add("clearFix");
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    if( currentValue !== "" ){
		if(toDos.length < 6){
			paintToDo(currentValue);
			toDoInput.value = "";
		}else{
			alert('이미 할 일이 많으십니다.');
			toDoInput.value = '';
		}
    }
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(Todos_LS);
    const parsedToDos = JSON.parse(loadedToDos);
    if(loadedToDos !== null && parsedToDos.length > 0){
        toDoTitle.classList.add("showing");
        parsedToDos.forEach(function(toDo){ /* forEach : Array 인자 하나씩 함수 실행 */
            paintToDo(toDo.text);
        });      
    }else{
        toDoTitle.classList.remove("showing");
    }
}
function init(){
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}
init();