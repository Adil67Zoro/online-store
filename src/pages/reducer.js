export const initialState = {
    cart: [],
    totalPrice: 0,
}

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'ADD_TO_CART':
            const newItem = { ...action.item, quantity: 1 };
            return { 
                    ...state,
                    cart: [...state.cart, newItem ],
                    totalPrice: state.totalPrice + newItem.price,
                };
        case 'REMOVE_FROM_CART':
            const removedItem = state.cart.find(item => item.name === action.name);
            return {
                ...state,
                cart: state.cart.filter(cartItem => cartItem.name !== action.name),
                totalPrice: state.totalPrice - (removedItem ? removedItem.price * removedItem.quantity : 0),
            };
        case 'INCREASE_COUNTER':
            return {
                ...state, 
                cart: state.cart.map(cartItem => {
                    if (cartItem.name === action.name) {
                        return {...cartItem, quantity: cartItem.quantity + 1 }
                    }
                    return cartItem
                }),
                totalPrice: state.totalPrice + state.cart.find(item => item.name === action.name).price,
            }
        case 'DECREASE_COUNTER':
            const targetCartItem = state.cart.find(item => item.name === action.name);
            const targetItemIndex = state.cart.findIndex(item => item.name === action.name);
        
            if (targetCartItem && targetCartItem.quantity > 1) {
                const updatedCart = [...state.cart];
                updatedCart[targetItemIndex] = {
                    ...targetCartItem,
                    quantity: targetCartItem.quantity - 1,
                };
        
                return {
                    ...state,
                    cart: updatedCart,
                    totalPrice: state.totalPrice - targetCartItem.price,
                };
            }
        
            return state;
        case 'SET_COUNTER': 
            const updatedCartItem = state.cart.find(item => item.name === action.name);
            const priceDifference = (action.quantity - updatedCartItem.quantity) * updatedCartItem.price;
            return {
                ...state,
                cart: state.cart.map(cartItem => {
                    if (cartItem.name === action.name) {
                        return { ...cartItem, quantity: action.quantity };
                    }
                    return cartItem;
                }),
                totalPrice: state.totalPrice + priceDifference,
            };
        default:
            return state;
    }
} 

export default reducer;