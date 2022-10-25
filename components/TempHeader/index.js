// import { Header } from "@rneui/themed";
import { View, Text, StyleSheet, Dimensions } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

function TempHeader(props) {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>DESIDER UNIVERSE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
    width: Dimensions.get("window").width,
  },
  text: {
    color: "white",
  },
});

export default TempHeader;
