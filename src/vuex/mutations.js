
import {Message} from 'element-ui'
import {fetch,post} from '@/axios/axios'
const mutations = {
    increment (state) {
        state.uptime = new Date();
    },
    baseCollocation(state){
        mutations.getStategyList(state);
        mutations.getTreatyList(state);
        mutations.getManageList(state);
    },
    
    /*
        策略管理模块
        获取合约管理数据
        stategyData{data:[],loading:'before,over,end'} 策略数据
    */
    getStategyList(state){
        fetch('/strategies').then(res=>{
        if(res.errno=="1"){
            let data = res.data;
            for(let i=0;i<data.length;i++){
                data[i].visible = false;
            }
            state.stategyData.data = (data).reverse();
            state.stategyData.loading = 'over';
        }else{
            state.stategyData.data = [];
            
            if(res.errmsg) Message({ message: res.errmsg, type: 'warning',duration:1000,duration:1000,showClose:true,offset:100,});
        }
        }).catch(error=>{
            console.log(error);
        })
    },
    addStategy(state,data){
        state.stategyData.data.unshift(data);
    },
    deleteStategy(state,{data,index}){
        post('/strategies/del ',data).then(res=>{
            if(res.errno=='1'){
                state.stategyData.data.splice(index,1);
                
            }else{
              if(res.errmsg) Message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
            }
          }).catch(error=>{
            console.log(error);
          })
    },
    editSpliceStategy(state,data){
        data.item.Risk = (parseFloat(data.item.Risk)/100).toFixed(6);
        state.stategyData.data.splice(data.index,1,data.item);
    },


    /*
        合约管理模块
        treatyData{data:[],loading:'before,over,end'} 策略数据
    */
    getTreatyList(state){
        fetch('/instruments').then(res=>{
            if(res.errno=="1"){
                let data = res.data;
                for(let i=0;i<data.length;i++){
                  data[i].visible = false;
                  data[i].BenchmarkPrice = (data[i].BenchmarkPrice).toString();
                  data[i].MarginLimit = (data[i].MarginLimit).toString();
                  data[i].PriceLimit = (data[i].PriceLimit).toString();
                }
                state.treatyData.data = (data).reverse();
                state.treatyData.loading = 'over';
                
            }else{
                state.treatyData.data = [];
                if(res.errmsg) Message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
            }
        }).catch(error=>{
            console.log(error);
        })
    },
    addTreaty(state,data){
        state.treatyData.data.unshift(data);
    },
    deleteTreaty(state,{data,index}){
        post('/instruments/del ',data).then(res=>{
            if(res.errno=='1'){
                state.treatyData.data.splice(index,1);
                state.count +=1;
            }else{
              if(res.errmsg) Message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
            }
          }).catch(error=>{
            console.log(error);
          })
    },
    editSpliceTreaty(state,data){
        state.treatyData.data.splice(data.index,1,data.item);
    },

    /*
        任务管理
    */
   getManageList(state){
       fetch('/tasks').then(res=>{
            if(res.errno=="1"){
                let data = res.data;
                for(let i=0;i<data.length;i++){
                    data[i].visible = false;
                }
                state.manageData.data = (data).reverse();
            }else{
                if(res.errmsg) Message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
            }
        }).catch(error=>{
            console.log(error);
        })
    },
    deleteManage(state,{data,selectorDele}){
        post('/tasks/del ',data).then(res=>{
            if(res.errno=='1'){
                // state.manageData.data.splice(index,1);
                let deli=0; //每次删除造成的差值
                selectorDele.forEach((i)=>{
                    state.manageData.data.splice(i-deli,1);
                    deli++;
                })
                this.multipleSelections=[];
            }else{
              if(res.errmsg) Message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
            }
          }).catch(error=>{
            console.log(error);
          })
    },
    tabTypeManage(state,{index,type}){
        state.manageData.data[index].State = type;
    },
    addManage(state,data){
        state.manageData.data.unshift(data);
    },

};


export default mutations;