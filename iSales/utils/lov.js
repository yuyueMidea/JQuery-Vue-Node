import { http } from '@/portal/utils/http'
import { getProfile } from '@/portal/utils/auth'
import store from '@/portal/store'
export function getLovValues(types, app) {
    return new Promise((resolve, reject) => {
        let lovs = {}

        if (types.length > 0) {
            // debugger
            let profile = getProfile()
            let lang =  profile.__language
            app = app ? app : profile.__app

            if(!this.$store.state.lov){
                this.$store.state.lov = {}
            }

            if(!this.$store.state.lov[app]){
                this.$store.state.lov[app] = {}
            }

            if(!this.$store.state.lov[app][lang]){
                this.$store.state.lov[app][lang] = {}
            }

            let tmps = types.split(',')
            let ts = []
            let ret = {}
            for(let tmp of tmps){
                if(!store.state.lov[app][lang][tmp]){
                    ts.push(tmp)
                }else{
                    ret[tmp] = this.$store.state.lov[app][lang][tmp]
                }
            }

            if(ts.length > 0){
                return http({
                    url: '/isc-api/lov/getByTypes',
                    method: 'post',
                    params: { application: app, types: ts.join(','), language: lang}
                }).then(data => {
                    this.$store.state.lov[app][lang] = Object.assign(this.$store.state.lov[app][lang], data)
                    resolve(Object.assign(data, ret))
                })
            }else{
                resolve(ret)
            }

        } else {
            resolve(lovs)
        }
    })
}

export function getLabelByValue(lov,value){
    for(let item of lov){
        if(item.value == value){
            return item.label
        }
    }
    return value
}
