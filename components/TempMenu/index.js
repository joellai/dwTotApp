import { View, StyleSheet, Button, Dimensions, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { useState } from "react";
function TempMenu(props) {
  const [active, setActive] = useState(undefined);
  const type = "material";
  const navItems = [
    { name: "home" },
    { name: "dashboard" },
    { name: "add", raised: true, color: "black" },
    { name: "notifications" },
    { name: "person" },
  ];

  function activeTab(e) {
    setActive(e);
  }

  const navList = navItems.map((item, index) => {
    return (
      <Pressable
        onPress={() => {
          activeTab(item.name);
        }}
        key={item.name}
      >
        <Icon
          style={styles.tab}
          raised={item.raised}
          type={type}
          name={item.name}
          size={item.name === "add" ? 30 : 50}
          color={active === item.name ? "#06AED5" : item.color ?? "white"}
        ></Icon>
      </Pressable>
    );
  });
  return <View style={styles.main}>{navList}</View>;
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // width: Dimensions.get("window").width,
    // borderColor:'black',
    borderRadius: 20,
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    padding: 5,
    height: 90,
    backgroundColor: "black",
    shadowColor: "#06AED5",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 5,
  },

  tab: {
    android_ripple: {
      color: "transparent",
    },
  },
});
export default TempMenu;
