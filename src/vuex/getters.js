const getters = {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    showsLogo: state => {
      return state.showIndex
    }
}

export default getters;