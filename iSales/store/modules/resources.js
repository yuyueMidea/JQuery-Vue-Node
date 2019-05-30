const resources = {
    state: {
        resources:{
        
      }
    },
    mutations: {
        SET_RESOURCE (state, obj){
            if(obj.resources)
                state.resources[obj.menuId] = obj.resources
        }
    },
    actions:{
        setResources({ commit }, obj){
            commit('SET_RESOURCE', obj)
        }
        
    }
  }
  
  export default resources