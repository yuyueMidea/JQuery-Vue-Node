const application = {
    state: {
      application:{
        
      },
      emptyApplication:{
        application:'',
        name :'',
        enable:'Y',
        visible:'Y',
        topMenuId:1,
        seq_num:'',
        icon:'',
        relationship:'',
        email:'',
        password:'',
        auth:'Y',
        url:'',
        webRoot:'',
        type:'bi',
        EBSSwitch:true,//EBS开关是否可用
        attribute1:'Y'
      },
      types:[
        {name:'BigData', value:'bi'},
        {name:'International Business Management', value:'business'},
        {name:'Administration &amp; Schedule Platform', value:'sp'},
        {name:'support', value:'My Home'}
      ],
      topMenus:[

      ]
    },
    mutations: {
        clear (state, parent){
          state.application = {}
          for(let i in state.emptyApplication){
            state.application[i] = state.emptyApplication[i]
          }
          parent.showDialog = true
        },
        setMenus(state, menus){
          state.topMenus = menus;
        },
        updateApplication(state, application){
          state.application[application.key] = application.value
          state.application.EBSSwitch=false
        }
    }
  }
  
  export default application