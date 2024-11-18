export const companyRegisterSchema = {
    name:{
        notEmpty:true,
        isString:true,
    },
    description:{
        notEmpty:true,
        isString:true,
    },
    location:{
        notEmpty:true,
        isString:true,
        
    },
}