import {http} from '@/portal/utils/http'
import app from '@/portal/appConfig'
export function getLayout(defaultHeaders, gridId, page, tableData, pageSize, showFilterBar, component){
    let headers = []
    http({
        url: '/isc-admin/layout/get',
        method: 'post',
        data:{application:app.APP_NAME, pageName:page, gridId:gridId}
    }).then(data => {
        if(null == data){
            defaultHeaders.forEach(o=>{
                if(!o.hasOwnProperty('hidden')){
                    o['hidden'] = false
                }

                if(!o.hasOwnProperty('fixed')){
                    o['fixed'] = false
                }
            })

            return
        }

        let map = {}

        for(let detail of data.details){
            map[detail.columnName] = detail
        }

        for(let h of defaultHeaders){
           if(map[h.prop]){
            let tmp = map[h.prop]
            let header = Object.assign({}, h)
            
            if(tmp.columnWidth  > 0)
                header.width = tmp.columnWidth
            else
                delete header.width
            header['hidden'] = tmp.hidden == 1
            header['fixed'] = tmp.fixed

            headers.push(header)
           }else{
            headers.push(h)
           }
        }
        
        
        component[tableData] = headers
        
        if(null != showFilterBar)
            component[showFilterBar] = data.showFilter
        if(null != pageSize)
            component[pageSize] = data.pageSize * 1 
    
        if(undefined != gridId && component.$refs[gridId] && component.$refs[gridId].$refs.pager){
            component.$refs[gridId].$refs.pager.change(component[pageSize])
        }

        component.$refs[gridId].$forceUpdate()
    })
}
    
export function setLayout(headers, pageSize, showFilterBar, gridId, component){
    if(null != headers){
        component[this.tableData] = headers
    }

    if(undefined != showFilterBar){
        component[this.showFilterBar] = showFilterBar
    }
    
    if(undefined != pageSize){
        component[this.pageSize] = pageSize
    }

    if(undefined != gridId && component.$refs[gridId] && component.$refs[gridId].$refs.pager){
        component.$refs[gridId].$refs.pager.change(pageSize)
    }
}