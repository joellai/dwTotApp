import Constants from "expo-constants";
import axios from "axios";
const { manifest } = Constants;

const BACKEND_BASE_URL = `http://192.168.8.244:3000`;

async function signup() {
  const PARAM_URL = "/signup";
  console.log(BACKEND_BASE_URL + PARAM_URL);
  try {
    const res = await axios.get(BACKEND_BASE_URL + PARAM_URL);

    // await AsyncStorage.multiSet(items);
    return res.data;
    // alert("signup success");
  } catch (e) {
    alert(e.message);
  }

  // console.log(2);
  // console.log(res.data);
}

async function save() {
  try {
    await AsyncStorage.setItem("@storage_Key", "test");
  } catch (e) {
    // saving error
  }
}

async function load() {
  try {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value !== null) {
      // value previously stored
      console.log(value);
    }
  } catch (e) {
    // error reading value
  }
}

async function login({ pubk, ctrAdrs }) {
  const PARAM_URL = "/login";
  try {
    const params = { pkey: pubk, address: ctrAdrs };

    const res = await axios.post(BACKEND_BASE_URL + PARAM_URL, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data);
    console.log(res.data);

    return res.data.data.token;
  } catch (e) {
    alert(e.message);
  }
}

async function touchToEarn({ token, model_id = undefined }) {
  const PARAM_URL = "/touch-to-earn";
  try {
    const res = await axios.post(
      BACKEND_BASE_URL + PARAM_URL,
      { token, model_id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //waiting: app send request; pending:waiting chainblock; success
    return "pending";
  } catch (e) {
    alert(e.message);
  }
}

export { login, signup, touchToEarn };
