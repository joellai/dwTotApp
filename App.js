/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import DevPanel from "./components/DevPanel";
import React, { useEffect, useState } from "react";
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
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { PersistGate } from "redux-persist/integration/react";
import NfcManager, { NfcTech, NfcEvents } from "react-native-nfc-manager";
import TempMenu from "./components/TempMenu";
import AndroidPrompt from "./components/AndroidPrompt";
import TempHeader from "./components/TempHeader";
import UserProfile from "./components/UserProfile";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { Pressable } from "react-native";

function Section({ img_src, img_name, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.wrapper_section}>
        <Text style={styles.section_text}>{img_name}</Text>
        <Image
          style={styles.img_section}
          source={img_src}
          resizeMode={"cover"}
        ></Image>
      </View>
    </Pressable>
  );
}

NfcManager.start();

const App = () => {
  const promptRef = useRef();
  const isDarkMode = useColorScheme() === "dark";
  const [scanState, setScanState] = useState(true);
  const [tagData, setTagData] = useState(undefined);
  const [profile, setProfile] = useState(false);
  const [devPanel, setDevPanel] = useState(false);
  

  const toggleDev = () => {
    setDevPanel(true);
  };

  const DUMMY_SECTIONS = [
    // {
    //   name: "Storm is coming",
    //   src: require("./assets/img/storm.png"),
    // }
  ];

  const sections = DUMMY_SECTIONS.map((item) => {
    return (
      <Section
        key={item.name}
        img_src={item.src}
        img_name={item.name}
        onPress={toggleDev}
      ></Section>
    );
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function touchToEarnHandler() {
    promptRef.current.setVisible(true);
    readNdef();
  }

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (tag) {
        promptRef.current.setVisible(true);
        setTagData(tag);
      }
    } catch (ex) {
      // there is a double call problem, when the manager is not cancel, it is called again, there will be a warning,for the demo, the warning is not affecting effect
      // console.warn("Oops!", JSON.stringify(ex));
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  async function promptShowHandler() {
    promptRef.current.setVisible(true);
  }

  function listenToNfcEventOnce() {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise((resolve) => {
      let tagFound = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        tagFound = tag;
        resolve(tagFound);
        promptRef.current.setVisible(true);
        setTagData(tag);
        setScanState(false);

        NfcManager.unregisterTagEvent();
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });

      NfcManager.registerTagEvent();
    });
  }

  useEffect(() => {
    if (scanState) {
      listenToNfcEventOnce();
    }
  }, [scanState]);

  return (
    <SafeAreaView style={[styles.wrapper]}>
      <StatusBar
        barStyle={!isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={"black"}
      />

      <TempHeader></TempHeader>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {devPanel && <DevPanel toggle={setDevPanel}></DevPanel>}

          <AndroidPrompt
            reference={promptRef}
            setScanState={setScanState}
            setTagData={setTagData}
            demo={tagData ? true : false}
            dirProfile={setProfile}
          ></AndroidPrompt>
          {profile ? (
            <UserProfile></UserProfile>
          ) : (
            <ScrollView style={styles.main}>{sections}</ScrollView>
          )}

          <TempMenu
            dirProfile={setProfile}
            onTouchToEarn={touchToEarnHandler}
            profileState={profile}
          ></TempMenu>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242424",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  main: {
    // flex: 1,
    // justifyContent: "flex-start",
    // alignContent: "center",
  },
  wrapper_section: {
    width: Dimensions.get("window").width - 20,
    backgroundColor: "white",
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
  },
  section_text: {
    position: "absolute",
    zIndex: 1,
    // top: '50%',
    left: 10,
    fontSize: 20,
    color: "white",
    textTransform: "uppercase",
  },
  img_section: {
    height: 100,
    width: Dimensions.get("window").width - 20,
  },
});

export default App;
