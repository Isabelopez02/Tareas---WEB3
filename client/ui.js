const taskForm = document.querySelector("#taskForm")

document.addEventListener("DOMContentLoaded", ()=>{
    App.init()
})
taskForm.addEventListener("submit", e => {
    e.preventDefault()
    const tittle = taskForm["tittle"].value;
    const descripcion = taskForm["descripcion"].value;
    console.log(
        taskForm["tittle"].value,
        taskForm["descripcion"].value
    )

    App.createTask(tittle,descripcion);
})