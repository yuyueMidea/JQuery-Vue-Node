import {http} from '@/portal/utils/http'
import {getProfile} from '@/portal/utils/auth'
export function getLovValues(types){
    let profile = getProfile()
    return http({
        url: '/isc-admin/lov/getByTypes',
        method: 'post',
        params:{application:profile.__app, types:types, language:profile.__language}
    }).then(data => {
        return new Promise(resolve => {
            let ret = {}
            for(let prop in data){
                ret[prop] = []
                data[prop].forEach(o =>{
                    ret[prop].push({value: o.value,label: o.label})
                })
            }
            resolve(ret)
        })
    })
}
