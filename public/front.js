function log(message) {
  console.log(`%c${message}`, "font-size: unset")
}

function assignAllClickEvents () {

  let tasks = document.querySelectorAll('.task-list-item');
  tasks.forEach(function(task) {
    task.onclick = taskClickHandler
  })

  document.querySelector('.doneButton').onclick = function() {
    document.querySelector('.active').classList.remove('active')
    hideViewTask()
  }

  document.addEventListener('swiped-down', function(e) {
    swipeHandler(e.target)
  });

  document.querySelectorAll('.task-select').forEach(function(ts) {
    ts.addEventListener('input', function() {
      checkedTaskSelectHandler(this);
    })
  })
}

function checkedTaskSelectHandler (input) {
  console.log("clicked input")
  console.log(input.checked)

  var parent = input.parentElement.parentElement.parentElement;

  if (input.checked == false) return parent.classList.remove('checked');
  if (input.checked == true) return parent.classList.add('checked');
}

function taskClickHandler () {
  if (this.classList.contains('active')) return;

  let title = this.querySelectorAll('.taskTitle')[0].innerHTML;
  let description = this.querySelectorAll('.taskDesc')[0].innerHTML;
  let taskId = this.dataset.taskid;

  if (document.querySelector('.task-list-item.active')) {
    document.querySelector('.task-list-item.active').classList.remove('active')
  }
  this.classList.add('active')
  //this.scrollIntoView({ block: 'start',  behavior: 'smooth' })

  hideViewTask(this)

  setTimeout(function() {
    viewTask(taskId, title, description);
  }, 301)

}

function viewTask (data_id, id, title, description) {


  var cont = document.querySelector('.taskViewContainer')
  cont.style.display = 'grid'

  setTimeout(function() {
    cont.classList.add("shown")
  }, 10)
}

function hideViewTask (el) {
  var cont = document.querySelector('.taskViewContainer')
  cont.classList.remove("shown")

  setTimeout(function() {
    cont.style.display = null
  }, 300)
}

function swipeHandler (el) {
  var cont = document.querySelector('.taskViewContainer')

  var valid = el.classList.contains("taskViewContainer") ? true : undefined

  let parentArray = $("." + el.classList[0]).parents()

  for(i = 0; i < parentArray.length; i++) {
    if (valid) break;
    valid = parentArray[i].classList.contains("taskViewContainer") ? true : undefined
  }

  if (!valid) return


  hideViewTask();
}

assignAllClickEvents()

