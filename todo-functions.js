const getSavedTodos = function () {
    const todoJSON = localStorage.getItem('todo')
    if (todoJSON !== null) {
        return JSON.parse(todoJSON)
    }
    else {
        return []
    }
}

const saveTodos = function (todo) {
    localStorage.setItem('todo', JSON.stringify(todo))
}

const deleteTodo = function (id) {
    const todoIndex = todo.findIndex(function (todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todo.splice(todoIndex, 1)
    }
}

const renderTodos = function (todo, filters) {
    const filteredTodos = todo.filter(function (todo) {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.done

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.done
    })

    document.querySelector('#todos').innerHTML = ''

    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

const generateTodoDOM = function (todo) {
    const todoDiv = document.createElement('div')
    const checkDone = document.createElement('input')
    const todoSpan = document.createElement('span')
    const deleteButton = document.createElement('button')

    checkDone.setAttribute('type', 'checkbox')
    todoDiv.appendChild(checkDone)

    todoSpan.textContent = todo.title 
    todoDiv.appendChild(todoSpan)

    deleteButton.textContent = 'Delete'
    todoDiv.appendChild(deleteButton)
    deleteButton.addEventListener('click', function () {
        deleteTodo(todo.id)
        saveTodos(todo)
        renderTodos(todo, filters)
    })

     return todoDiv
}

const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left.`
    return summary
}

//Wire up button event
//Remove todo by id
//Save and rerender list