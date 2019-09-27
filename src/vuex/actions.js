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
      context.commit('addTreaty',data);
    },
    deleteTreaty(context,{data,index}){
      context.commit('deleteTreaty',{data,index});
    },
    editSpliceTreaty(context,data){
      context.commit('editSpliceTreaty');
    },
       /*
        任务管理
    */
    getManageList(context){
      context.commit('getManageList');
    },
    deleteManage(context,{data,selectorDele}){
      context.commit('deleteManage',{data,selectorDele});
    },
    tabTypeManage(context,{index,type}){
      context.commit('tabTypeManage',{index,type});
    },
    addManage(context,data){
      context.commit('getManageList');
    },
}
export default actions;