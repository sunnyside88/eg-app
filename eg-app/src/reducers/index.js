import { combineReducers } from "redux";
import { grReducer } from "./grReducer";

import { productReducer } from "./productReducer";
import { stockCardReducer } from "./stockCardReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  products: productReducer,
  gr_lines: stockCardReducer,
  user:userReducer,
  grs:grReducer
});

export default rootReducer;
