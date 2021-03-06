import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/reducer';
import adminReducer from './admin/reducer';
import clientReducer from './client/reducer';
import productReducer from './product/reducer';
import categoryReducer from './category/reducer';
import orderReducer from './order/order-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  client: clientReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
});

export default persistReducer(persistConfig, rootReducer);
