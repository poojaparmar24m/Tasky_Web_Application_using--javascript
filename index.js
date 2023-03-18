const state = {
  task: [],
};
// console.log("satte", state.task);
let card_content = document.querySelector(".cards_content");
let modal_body_content = document.querySelector(".modal_body_content");
let open_modal_contant = document.querySelector(".open_task_modal");

const create_cards = ({ id, url, title, type, decription }) => `
<div class="col-md-4" id=${id}>
  <div class="card" style="width:25rem;">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-info edit_icon " name=${id}  onclick="editTask.apply(this,arguments)"><i class="fas fa-pencil-alt" name=${id}></i></button>
        <button type="button" class="btn btn-outline-danger trash_icon" name=${id} onclick="deleteTaks.apply(this, arguments)" ><i class="fa-solid fa-trash-can" name=${id}></i></button>
    </div>
    <div class="card-body">
      ${
        url
          ? `<img src=${url} alt="card_image" class="card-img-top md-3 rounded-lg" width='100%'>`
          : `<img src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt="card_image" class="card-img-top md-3 rounded-lg" width='100%'>`
      }
      <h5 class="card-title mt-2">${title}</h5>
      <p class="card-text">${decription}</p>
      <span class="badge text-bg-primary">${type}</span>
    </div>
    <div class="card-footer">
    <button type="button" class="btn btn-outline-primary taskOpen" data-bs-toggle="modal" data-bs-target="#open_task_modal" onclick="open_task_content.apply(this, arguments)" id=${id} >Open Task</button>
    
    </div>
 </div> 
</div>
`;
// card_content.innerHTML = create_cards(1, "hello", "work", "pooja parmar");

// data store in local storage
const updateLocalstorage = () => {
  const tasklList = state.task;
  localStorage.setItem("task", JSON.stringify(tasklList));
  // console.log("tasklist", tasklList);
  // localStorage.setItem(
  //   "task",
  //   JSON.stringify({
  //     tasks: state.task,
  //   })
  // );
};

//parse data from local storage
const retriveData = (event) => {
  const retrivedata = JSON.parse(localStorage.getItem("task"));
  // console.log(retrivedata);

  if (retrivedata) state.task = retrivedata;

  state.task.map((cardData) => {
    card_content.insertAdjacentHTML("beforeend", create_cards(cardData));
  });
};

//  save new item
const save_add_item = (event) => {
  const id = `${Date.now()}`;
  let add_modal_form = document.getElementById("add_modal_form");
  // console.log("id>>", id);

  const input = {
    url: document.getElementById("imageurl").value,
    title: document.getElementById("task_title").value,
    type: document.getElementById("Task_type").value,
    decription: document.getElementById("taskDesc").value,
  };

  card_content.insertAdjacentHTML("beforeend", create_cards({ ...input, id }));
  console.log(card_content);

  state.task.push({ ...input, id });
  // console.log("satte", state.task);
  updateLocalstorage();

  add_modal_form.reset();
};

// card_body for open task modal
const open_task_modal = ({ id, title, decription, url, type }) => {
  const date = new Date(parseInt(id));
  console.log("new date", date);
  return `
  <div id=${id}>
  ${
    url
      ? `<img src=${url} alt="card_image" class="card-img-top md-3 rounded-lg" width='100%'>`
      : `<img src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt="card_image" class="card-img-top md-3 rounded-lg" width='100%'>`
  }
  <strong class="mt-3"> Created On ${date.toDateString()}</strong>
  <h5 class="card-title mt-3">${title}</h5>
  <p class="card-text mt-2">${decription}</p></div>
  <!--span class="badge text-bg-primary mt-2">${type}</span-->
`;
};

// open task

const open_task_content = (e) => {
  if (!e) e = window.event;

  const get_task = state.task.find(({ id }) => id === e.target.id);
  // console.log(get_task);
  open_modal_contant.innerHTML = open_task_modal(get_task);
};

///Delete task

const deleteTaks = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.getAttribute("name");
  console.log(targetId);

  const type = e.target.tagName;
  console.log(type);

  const delete_task = state.task.find(({ id }) => id === targetId);
  console.log(delete_task);

  updateLocalstorage();

  type === "BUTTON"
    ? e.target.parentElement.parentElement.parentElement.parentElement.removeChild(
        e.target.parentElement.parentElement.parentElement
      )
    : e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
      );

  // if (type === "BUTTON") {
  //   // console.log(e.target.parentNode.parentNode.parentNode.parentNode);
  //   // return e.target.parentNode.parentNode.parentNode.parentNode;
  //   console.log(
  //     e.target.parentElement.parentElement.parentElement.parentElement
  //   );
  //   return e.target.parentElement.parentElement.parentElement.parentElement.removeChild(
  //     e.target.parentElement.parentElement.parentElement
  //   );
  // } else if (type === "I") {
  //   return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
  //     e.target.parentNode.parentNode.parentNode.parentNode
  //   );
  // }
};

// Edit Task

const editTask = (e) => {
  if (!e) e = window.event;
  const targetId = e.target.getAttribute("name");
  // console.log(targetId);

  const type = e.target.tagName;
  // console.log(type);

  const parentnode =
    type === "BUTTON"
      ? e.target.parentNode.parentNode.parentNode
      : e.target.parentNode.parentNode.parentNode.parentNode;
  // if (type === "BUTTON") {
  //   parentnode = e.target.parentNode.parentNode.parentNode;
  //   // console.log(e.target.parentNode.parentNode.parentNode);
  // } else if (type === "I") {
  //   parentnode = e.target.parentNode.parentNode.parentNode.parentNode;
  //   console.log(e.target.parentNode.parentNode.parentNode.parentNode);
  // }

  // console.log(parentnode.childNodes);

  const taskTitle = parentnode.childNodes[1].childNodes[3].childNodes[3];
  // console.log(taskTitle);
  const taskType = parentnode.childNodes[1].childNodes[3].childNodes[7];
  // console.log(taskType);
  const taskDesc = parentnode.childNodes[1].childNodes[3].childNodes[5];
  // console.log(taskDesc);
  const button = parentnode.childNodes[1].childNodes[5].childNodes[1];
  // console.log(button);

  button.setAttribute("onclick", "saveEdit.apply(this,arguments)");
  button.innerHTML = "Save Changes";

  taskTitle.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  taskDesc.setAttribute("contenteditable", "true");

  button.removeAttribute("data-bs-toggle");
  button.removeAttribute("data-bs-target");
};

const saveEdit = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;

  // console.log(edit);

  const parentnode = e.target.parentNode.parentNode.parentNode;
  // console.log(parentnode);

  const taskTitle = parentnode.childNodes[1].childNodes[3].childNodes[3];
  // console.log(taskTitle);
  const taskType = parentnode.childNodes[1].childNodes[3].childNodes[7];
  // console.log(taskType);
  const taskDesc = parentnode.childNodes[1].childNodes[3].childNodes[5];
  // console.log(taskDesc);
  const button = parentnode.childNodes[1].childNodes[5].childNodes[1];
  // console.log(button);

  const saveData = {
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDesc: taskDesc.innerHTML,
  };
  // console.log(saveData);

  let stateTaskcopy = state.task;

  stateTaskcopy = stateTaskcopy.map((data) => {
    // console.log("data", data);
    return data.id === targetId
      ? {
          id: data.id,
          title: saveData.taskTitle,
          type: saveData.taskType,
          decription: saveData.taskDesc,
          url: data.url,
        }
      : data;
  });

  state.task = stateTaskcopy;
  updateLocalstorage();
  // console.log(state.task[0]);

  button.setAttribute("onclick", "open_task_content.apply(this, arguments)");
  button.innerHTML = "Open Task";
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#open_task_modal");

  taskTitle.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  taskDesc.setAttribute("contenteditable", "false");
};

const searchData = (e) => {
  if (!e) e = window.event;

  const searchitem = document.getElementById("search_input").value;
  console.log("item", searchitem);
  while (card_content.firstChild) {
    console.log("firstchild", card_content.firstChild);
    const removedata = card_content.removeChild(card_content.firstChild);
    console.log("remove", removedata);
  }
  const result = state.task.filter(({ title }) =>
    // console.log("title", title);
    // console.log(
    //   "include >>>",
    //   title.toLowerCase().includes(searchitem.toLowerCase())
    // );
    title.toLowerCase().includes(searchitem.toLowerCase())
  );

  result.map((data) =>
    // console.log("data>>", data)
    card_content.insertAdjacentHTML("beforeend", create_cards(data))
  );
  console.log("result", result);
};
