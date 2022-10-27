import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { touchToEarnHandler } from "../../store/storeSlice/userInfoActions";
import { useState, useEffect } from "react";
import { Icon } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { actions as UserInfoActs } from "../../store/storeSlice/userinfoSlice";

export default function AndroidPromp({
  reference,
  setScanState,
  setTagData,
  demo,
  dirProfile,
}) {
  const [visible, setVisible] = useState(false);
  const { token, isLogin, touchToEarnList } = useSelector(
    (state) => state.userInfoState
  );

  const dispatch = useDispatch();
  function closeHandler() {
    setVisible(false);
    setScanState(true);
    setTagData(undefined);
  }
  useEffect(() => {
    if (reference) {
      reference.current = { setVisible };
    }
  }, [reference]);

  useEffect(() => {
    const demo_model_id = "abc";
    if (demo && touchToEarnList.length === 0) {
      dispatch(touchToEarnHandler({ token, model_id: demo_model_id }));
    } else if (demo && touchToEarnList.length !== 0) {
      // todo
      // since the block chain needs time to complete, so here is directly set result to be true for convenience
      dispatch(
        UserInfoActs.updateTouchToEarnStatus({
          model_id: demo_model_id,
          status: "success",
        })
      );
    }
  }, [demo]);

  const redirectToProfile = () => {
    closeHandler();
    dirProfile(true);
  };

  //isLogin=false
  const LoginJsx = (
    <>
      <View style={styles.wrapper_log}>
        <Text style={styles.log}>Please login first</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={redirectToProfile}>
        <Text style={styles.txt_btn}>Go to login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={closeHandler}>
        <Text style={styles.txt_btn}>cancel</Text>
      </TouchableOpacity>
    </>
  );

  if (!isLogin) {
    return (
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.content}>
          <View style={[styles.backdrop, StyleSheet.absoluteFill]}></View>
          <View style={styles.prompt}>{LoginJsx}</View>
        </View>
      </Modal>
    );
  } else {
    if (demo) {
      return (
        <Modal visible={visible} transparent={true} animationType="slide">
          <View style={styles.content}>
            <View style={[styles.backdrop, StyleSheet.absoluteFill]}></View>
            <View style={styles.prompt}>
              <Image
                style={styles.img}
                source={require("../../assets/img/demo_model.png")}
                resizeMode={"cover"}
              ></Image>
              <View style={styles.wrapper_log}>
                {touchToEarnList.length > 0 &&
                touchToEarnList[0].status === "success" ? (
                  <>
                    <Text style={styles.log}>Completed</Text>
                    <Icon
                      style={styles.success}
                      type="material"
                      name="check-circle-outline"
                      size={50}
                      color="#0CC"
                    ></Icon>
                  </>
                ) : (
                  <>
                    <Text style={styles.log}>
                      Waiting for Dice to be earnd, it may take a while, please
                      check it later
                    </Text>
                    <ActivityIndicator size="large" color="#06AED5" />
                  </>
                )}
              </View>
              <TouchableOpacity style={styles.btn} onPress={closeHandler}>
                <Text style={styles.txt_btn}>cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal visible={visible} transparent={true} animationType="slide">
          <View style={styles.content}>
            <View style={[styles.backdrop, StyleSheet.absoluteFill]}></View>
            <View style={styles.prompt}>
              <View style={styles.wrapper_log}>
                <Text style={styles.log}>Please touch your DESIDER model</Text>
              </View>
              <ActivityIndicator size="large" color="#06AED5" />
              <TouchableOpacity style={styles.btn} onPress={closeHandler}>
                <Text style={styles.txt_btn}>cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  prompt: {
    position: "absolute",
    // top: 300,
    left: 20,
    width: Dimensions.get("window").width - 2 * 20,
    // height: Dimensions.get("window").height / 2,
    backgroundColor: "#242424",
    borderRadius: 20,
    // paddingVertical: 20,
    // paddingHorizontal: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  btn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  txt_btn: {
    color: "white",
  },
  img: {
    // width: 300,
    width: Dimensions.get("window").width - 2 * 20,
    height: 300,
  },
  wrapper_log: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  log: {
    textAlign: "center",
    color: "white",
  },
  success: {
    marginTop: 20,
  },
});
