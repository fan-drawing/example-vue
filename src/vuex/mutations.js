const mutations = {
    increment (state) {
        state.count++
    },
    changeIndexshow(state,boleans){
        state.showIndex=boleans;
    },
    addTodos (state) {
        state.todos.length==0? state.todos.push({ id:1, text: 'done为true', done: true }):state.todos.push({ id: parseInt(state.todos[state.todos.length-1].id)+1, text: 'done为true', done: true });
        
    },
    deleteTodos (state,index) {
        state.todos.splice(parseInt(index)-1,1);
       
    }
};


export default mutations;