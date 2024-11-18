export const profileSchema = {
    fullName:{
        notEmpty:true,
        isString:true,
    },
    email:{
        notEmpty:true,
        isEmail:true,
    },
    phoneNumber:{
        notEmpty:true,
        isLength:{
            options:{
                min:10,
                max:10
            }
        }
    },
    bio:{
        notEmpty:true,
        isString:true,
    },
    skills:{
        notEmpty:true,
        isString:true,
        
    }
}