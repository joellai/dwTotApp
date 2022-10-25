/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
} from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

import NfcManager, { NfcTech, NfcEvents } from "react-native-nfc-manager";

import AndroidPrompt from "./components/AndroidPrompt";
import { useRef } from "react";

NfcManager.start();
const App = () => {
  const promptRef = useRef();
  const isDarkMode = useColorScheme() === "dark";
  const [scanState, setScanState] = useState(true);

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
    <SafeAreaView style={[styles.wrapper, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Text>Header</Text>
      </View>

      <View>
        <Button title="press me to read" onPress={readNdef}></Button>
        <Button
          title="show prompt"
          onPress={() => promptRef.current.setVisible(true)}
        ></Button>

        <AndroidPrompt
          reference={promptRef}
          setScanState={setScanState}
        ></AndroidPrompt>
      </View>
      <View>
        <Text>Footer</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default App;
