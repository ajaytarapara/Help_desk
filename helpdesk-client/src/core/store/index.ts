import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import uiReducer from "../../features/ui/uiSlice";
import { injectStore } from "../api/axiosInstance";
import ticketReducer from "../../features/ticket/ticketSlice";
import dropDownReducer from "../../features/dropDown/dropDownSice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  ticket: ticketReducer,
  dropDown: dropDownReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "dropDown"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

injectStore(store);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
