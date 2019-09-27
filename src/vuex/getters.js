const getters = {
  /*
    获取策略列表数据
  */
  getStrategyLists: state => {
    /*
      策略数据
      CreateTime 创建时间
      Description 策略描述
      Direction: 1 操作方向   [{label:'双向',value:'2'}, {label:'只多',value:'1'},{label:'只空',value:'0'}];
      ID: 5 策略标识
      Instruments  [{ID: 7 , Name: "IH1911"},...]   合约列表
      Name  策略名称
      Risk 策略风险数据
      visible 删除策略模块显示隐藏参数
    */
    return state.stategyData.data;
  },
  /*
    获取策略数据进行数据筛选重组
  */
  StrategiesSelect: state => {
    let data = state.stategyData.data;
    let ceillData = [];
    for(let i=0;i<data.length;i++){
      let objectCeill = {};
      objectCeill.value = data[i].ID;
      objectCeill.label = data[i].Name;
      ceillData.push(objectCeill);
    }
    return (ceillData).reverse();
  },
  
  /*
    获取合约数据
  */
  getTreatyLists: state => {
    return state.treatyData.data;
  },
  /*
    获取任务
  */
  getManageList:state=>{
    return state.manageData.data;
  },
  getManageListSelect:state=>{
    let ceill = JSON.parse(JSON.stringify(state.manageData.data));
    for(let i=0;i<ceill.length;i++){
      ceill[i].Index = i;
    }
    return ceill;
  }
}

export default getters;