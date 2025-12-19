const taskForm = document.querySelector("#taskForm")
taskForm.addEventListener("submit", e => {
    e.preventDefault()

    console.log(
        taskForm["tittle"].value,
        taskForm["descripcion"].value
    )
})