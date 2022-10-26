import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./storeSlice/userinfoSlice";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    stateReconciler: autoMergeLevel2
  }
  
  const persistedReducer = persistReducer(persistConfig, userInfoReducer)

export const store = configureStore({
  reducer: {
    userInfoState: persistedReducer,
  },
  middleware: [thunk]
});

export const persistor = persistStore(store)