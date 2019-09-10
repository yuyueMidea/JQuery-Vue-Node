import http from './http'
import {getProfile} from './auth'
export function getButtons (menuId, component, key){
    let userId = getProfile().__userId
    http({
        url:'/isc-auth/resource/listPermission',
        method:'post',
        data:{menuId, userId}
    }).then(data=>{
        component[key] = []
        for(let d of data){
            component[key].push(d.resourceCode)
        }
    }).catch(() =>{

    })
}

export function hasPermisstion (permissions, code){
    return permissions.indexOf(code) > -1
}