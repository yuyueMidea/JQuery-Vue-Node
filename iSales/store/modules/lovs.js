const lovs = {
    state: {
    },
    mutations: {
        SET_LOVS (state, obj){
            if(obj.lovs){
                for(let l in obj.lovs){
                    state.lovs[l] = obj.lovs[l]
                }
            }
        }
    },
    actions:{
        setLovs({ commit }, obj){
            commit('SET_LOVS', obj)
        }
    }
  }
  
  export default lovs