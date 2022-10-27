import { useSelector, useDispatch } from "react-redux";
import { actions as UserInfoActs } from "../store/storeSlice/userinfoSlice";

function clearReduxInfo() {
  const dispatch = useDispatch();
  dispatch(UserInfoActs.clearInfo());
}

function clearTouchToEarnList() {
  const dispatch = useDispatch();
  dispatch(UserInfoActs.clearTouchToEarnList());
}

export { clearReduxInfo, clearTouchToEarnList };
