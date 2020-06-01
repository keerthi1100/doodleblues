export const AddItemToCart =(data)=>{
   
    return {
        type:'ADD_TO_CART',
        payload:{
            
            DishID:data
            }
    }

}

export const IncrementItem =(data)=>{
   

    return {
        type:'ADD_QUANTITY',
        payload:{
            
            DishID:data
            }
    }
}

export const DrecremtntItem = (data)=>
{
    return {
        type:'SUB_QUANTITY',
        payload:{
            
            DishID:data
            }
    }
}

export const AddtoFinalCart = (data)=>
{
    return{
        type:'ADD_FINAL_CART',
        payload:{
            finalDishList:data
        }
    }
}