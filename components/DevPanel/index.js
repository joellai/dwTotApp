import { Modal, View, Button, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actions as UserInfoActs } from "../../store/storeSlice/userinfoSlice";

function DevPanel({ toggle }) {
  const userInfo = useSelector((state) => state.userInfoState);
  console.log(userInfo);
  const dispatch = useDispatch();

  function clearReduxInfo() {
    dispatch(UserInfoActs.clearInfo());
  }

  function clearTouchToEarnList() {
    dispatch(UserInfoActs.clearTouchToEarnList());
  }
  return (
    <Modal>
      <Button
        style={styles.btn}
        title="clear touch to earn"
        onPress={clearTouchToEarnList}
      ></Button>

      <Button
        style={styles.btn}
        title="clear all info"
        onPress={clearReduxInfo}
      ></Button>
      <Button
        style={styles.btn}
        title="cancel"
        onPress={() => toggle(false)}
      ></Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginVertical: 10,
  },
});

export default DevPanel;
