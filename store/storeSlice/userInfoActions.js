import { actions as UserInfoActs } from "./userinfoSlice";
import { login, signup, touchToEarn } from "../../httpHelper";
export function signupHandler() {
  return async function fetchUserInfoThunk(dispatch, getState) {
    try {
      // const signupData = await signup();

      const signupData = {
        ctrAdrs:
          "0x2196d84663c1d534e13debe621dcf57afee2ab62db2590ec1b9d5497a95a905",
        privk:
          "0x1aa31a627cbcb6c956692a54fa6da4d32e39df7820273930a511aac92cfe72d",
        pubk: "0x07e8eb33c810ff6868b5c3922afcf4bd21e3930235d1d9885bb4204ef7a35744",
      };
      dispatch(UserInfoActs.signup(signupData));

      //   const loginData = await login({
      //     pubk: signupData.pubk,
      //     ctrAdrs: signupData.ctrAdrs,
      //   });

      const loginData =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZGRyZXNzIjoiIiwiZXhwIjoxNjY3OTg4MjQ1LCJpYXQiOjE2NjY3Nzg2NDUsImlzcyI6ImR3YmFja2VuZCIsInN1YiI6ImR3d2ViIn0.488qYCsohKYJJaoefCi4SbnWy7ZaaRmks4loBk10z_Y";
      dispatch(UserInfoActs.login(loginData));
    } catch (e) {
      alert(e.message);
    }
  };
}

export function touchToEarnHandler({ model_id, token }) {
  return async function fetchUserInfoThunk(dispatch, getState) {
    dispatch(
      UserInfoActs.updateTouchToEarnStatus({ model_id, status: "waiting" })
    );

    // const res = await touchToEarn({ token, model_id });
    const res = "pending";
    dispatch(UserInfoActs.updateTouchToEarnStatus({ model_id, status: res }));
  };
}
