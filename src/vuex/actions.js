const actions = {
    increment (context) {
      context.commit('increment');
    },
    getStategyList (context){
      context.commit('getStategyList');
    },
    addStategy(context,data){
    
      context.commit('addStategy',data);
    },
    deleteStategy(context,{data,index}){
      context.commit('deleteStategy',{data,index});
    },
    editSpliceStategy(context,data){
      context.commit('editSpliceStategy',data);
    },
    getTreatyList(context){
      context.commit('getTreatyList');
    },
    addTreaty(context,data){
      console.log(data)
      context.commit('addTreaty',data);
    },
    deleteTreaty(context,{data,index}){
      context.commit('deleteTreaty',{data,index});
    },
    editSpliceTreaty(context,data){
      context.commit('editSpliceTreaty');
    }
}
export default actions;