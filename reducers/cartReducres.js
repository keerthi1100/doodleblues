const dishList = [
  {
    dishname: 'pokada',
    dishType: 'Starter',
    DishID: 1,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'pokada veg',
    dishType: 'Starter',
    DishID: 2,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'pokada egg',
    dishType: 'Starter',
    DishID: 3,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'kabab',
    dishType: 'Starter',
    DishID: 4,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'kabab b',
    dishType: 'Starter',
    DishID: 5,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },

  {
    dishname: 'fish',
    dishType: 'Starter',
    DishID: 6,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'fish f',
    dishType: 'Starter',
    DishID: 7,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'choco cake',
    dishType: 'Dessert',
    DishID: 8,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'vanila ice',
    dishType: 'Dessert',
    DishID: 9,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'choco ice',
    dishType: 'Dessert',
    DishID: 10,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'vanila ice big',
    dishType: 'Dessert',
    DishID: 11,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'chocko ice big',
    dishType: 'Dessert',
    DishID: 12,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'beeda',
    dishType: 'Dessert',
    DishID: 13,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'pepsi',
    dishType: 'Drinks',
    DishID: 14,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: '7up',
    dishType: 'Drinks',
    DishID: 15,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    dishname: 'cola',
    dishType: 'Drinks',
    DishID: 16,
    DishPrice: 100,
    selectedQuantati: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
];

const DishType = [

    {DishType:'Starter',
     ItemCount:7
    },
    {DishType:'Dessert',
    ItemCount:4
   },
   {DishType:'Drinks',
   ItemCount:5
  }
   ]

let arrayadded =[]
const initialState = {
  dishList: dishList,
  dishTypes:DishType,
  dishSelected: [],
  finalDishSelected:[],
  totalAmt: 0,
};

const cartreducers = (state = initialState, action) => {
  if (action.type === 'ADD_TO_CART') {
    let addedItem = state.dishList.find(item => item.DishID === action.payload.DishID);
    //check if the Dish id exists in the addedItems
    let existed_item = state.dishSelected.find(item => action.payload.DishID === item.DishID);
    if (existed_item) {
        state.dishSelected.selectedQuantati += 1;
      return {
        ...state,
        totalAmt: state.totalAmt + state.dishSelected.DishPrice,
      };
    } else {
        state.dishSelected.quantity = 1;
      //calculating the total
      let newTotal = state.totalAmt + state.dishSelected.DishPrice;

      return {
        ...state,
        arrayadded:[...state.dishSelected , addedItem],
        
        totalAmt: newTotal,
      };
    }
  }
  if (action.type === 'ADD_QUANTITY') {
    let addedItem = state.dishList.find(item => item.DishID === action.payload.DishID);
    addedItem.selectedQuantati += 1;
    let newTotal = state.totalAmt + addedItem.DishPrice;
    return {
      ...state,
      totalAmt: newTotal,
    };
  }
  if (action.type === 'SUB_QUANTITY') {
    let addedItem = state.dishList.find(item => item.DishID === action.payload.DishID);
    addedItem.selectedQuantati -= 1;
    let newTotal = state.totalAmt + addedItem.DishPrice;
    return {
      ...state,
      totalAmt: newTotal,
    };
  }
  if (action.type === 'ADD_FINAL_CART') {
      console.log(action.payload.finalDishList)
    return{
        ...state,
        finalDishSelected:action.payload.finalDishList
        
    }
  }
  return state;
};
export default cartreducers;
