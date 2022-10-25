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
} from 'react-native';

import {useState, useEffect} from 'react';

export default function AndroidPromp({reference, setScanState}) {
  const [visible, setVisible] = useState(false);

  function closeHandler() {
    setVisible(false);
    setScanState(true);
  }
  useEffect(() => {
    if (reference) {
      reference.current = {setVisible};
    }
  }, [reference]);

  return (
    <Modal visible={visible} transparent={true}>
      <View style={StyleSheet.content}>
        <View style={[styles.backdrop, StyleSheet.absoluteFill]}></View>
        <View style={styles.prompt}>
          <Text>HELLO NFC</Text>
          <TouchableOpacity style={styles.btn} onPress={closeHandler}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  prompt: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: Dimensions.get('window').width - 2 * 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
  },
});
