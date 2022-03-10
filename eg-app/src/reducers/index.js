import { combineReducers } from "redux";

import { productReducer } from "./productReducer";
import { stockCardReducer } from "./stockCardReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  products: productReducer,
  gr_lines: stockCardReducer,
  user:userReducer,
});

export default rootReducer;
