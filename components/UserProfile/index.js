import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import { signupHandler } from "../../store/storeSlice/userInfoActions";
import { Icon } from "@rneui/themed";
import { connect } from "react-native-redux";
import { getStateForKey } from "react-native-redux";
import { useSelector } from "react-redux";
import { actions as userInfoActions } from "../../store/storeSlice/userinfoSlice";
import { useDispatch } from "react-redux";
function UserProfile(props) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userInfoState.isLogin);
  const userInfo = useSelector((state) => state.userInfoState);

  const DUMMY_COLLECT = [
    { id: "abc", src: require("../../assets/img/demo_model.png") },
    { id: "placeholder", src: "" },
  ];

  // const isLogin =useSelector(state=>state.userInfoState.isLogin);
  // console.log(isLogin);
  return (
    <View style={styles.main}>
      {/* <Text style={{color:'white'}}>{JSON.stringify(userInfo)}</Text> */}
      <Icon
        type="material"
        name={"account-circle"}
        color="white"
        size={100}
        style={styles.icon}
      ></Icon>
      {isLogin ? (
        <Button
          title="logout"
          onPress={() => {
            dispatch(userInfoActions.setLogin(false));
          }}
        ></Button>
      ) : (
        <Button
          title="login"
          onPress={() => {
            dispatch(signupHandler());
          }}
        ></Button>
      )}
      <View style={styles.wrapper_collection}>
        <Text style={styles.title_collect}>My Collection</Text>
        {userInfo.touchToEarnList.length > 0 && isLogin ? (
          <FlatList
            data={DUMMY_COLLECT}
            renderItem={CollectionItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          ></FlatList>
        ) : (
          <Text style={styles.txt_no_item}>No Collection</Text>
        )}
      </View>
    </View>
  );
}

function CollectionItem({ item }) {
  return (
    <View>
      <Image
        style={[styles.img, item.id === "placeholder" && styles.placeholder]}
        source={item.src}
        resizeMode={"cover"}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  icon: {
    marginVertical: 20,
  },
  wrapper_collection: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  img: {
    width: Dimensions.get("window").width / 2 - 40,
    height: Dimensions.get("window").width / 2 - 40,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  placeholder: {
    borderWidth: 0,
  },
  title_collect: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  txt_no_item: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 30,
  },
});

export default UserProfile;
