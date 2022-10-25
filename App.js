/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
// import { SafeAreaProvider } from "react-native-safe-area-context";
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
} from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

import { NavigationContainer } from "@react-navigation/native";

import NfcManager, { NfcTech, NfcEvents } from "react-native-nfc-manager";
import TempMenu from "./components/TempMenu";
import AndroidPrompt from "./components/AndroidPrompt";
import TempHeader from "./components/TempHeader";
import { useRef } from "react";

function Section({ img_src, img_name }) {
  return (
    <View style={styles.wrapper_section}>
      <Text>{img_name}</Text>
      <Image source={img_src}></Image>
    </View>
  );
}

NfcManager.start();

const App = () => {
  const promptRef = useRef();
  const isDarkMode = useColorScheme() === "dark";
  const [scanState, setScanState] = useState(true);

  const DUMMY_SECTIONS = [
    { name: "desert", src: require("./assets/img/desert.jpeg") },
    { name: "plain", src: require("./assets/img/plain.png") },
    {
      name: "spaceranger fortrest",
      src: require("./assets/img/spacerangerFortrest.png"),
    },
    { name: "spaceship", src: require("./assets/img/spaceship.png") },
    {
      name: "Ya'loong forest",
      src: require("./assets/img/Ya'loongForest.png"),
    },
  ];

  const sections = DUMMY_SECTIONS.map((item) => {
    return <Section img_src={item.src} img_name={item.name}></Section>;
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (tag) {
        promptRef.current.setVisible(true);
      }
      console.warn("Tag found", tag);
    } catch (ex) {
      console.warn("Oops!", JSON.stringify(ex));
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
        // console.log('unregister')
        console.log(tag);
        promptRef.current.setVisible(true);
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

      <View style={styles.main}>
        {sections}
        <Section></Section>
        <Section></Section>
        <Section></Section>
        <Section></Section>
        <Section></Section>

        {/* <Button title="press me to read" onPress={readNdef}></Button>
        <Button
          title="show prompt"
          onPress={() => promptRef.current.setVisible(true)}
        ></Button>

        <AndroidPrompt
          reference={promptRef}
          setScanState={setScanState}
        ></AndroidPrompt> */}
      </View>

      <TempMenu></TempMenu>
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
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  wrapper_section: {
    width: Dimensions.get("window").width - 20,
    backgroundColor: "white",
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default App;
