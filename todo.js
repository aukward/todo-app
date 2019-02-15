
const todo = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todo, filters)

document.querySelector('#search-todos').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todo, filters)
})

document.querySelector('#submitForm').addEventListener('submit', function (e) {
    e.preventDefault()
    todo.push({
        id: uuidv4(),
        title: e.target.elements.submitTodo.value,
        done: false
    })
    saveTodos(todo)
    renderTodos(todo, filters)
    e.target.elements.submitTodo.value = ''
})

document.querySelector('#completed-todos').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todo, filters)
})

