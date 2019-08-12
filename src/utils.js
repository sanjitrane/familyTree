import _ from 'lodash'
const helper={
    sortObj:(arr,prop)=>{
        return _.sortBy(arr,[prop])
        
    },

    listObj:(arr, key, str)=>{
        return _.find(arr,(o)=>{
            return o[key]=== str
        })
    },
    trimString:str=>_.trim(str)

}

export default helper;