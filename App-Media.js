import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      requestPermission(cameraStatus.status === 'granted');
      requestMediaPermission(mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
  if (!permission || !mediaPermission) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Libere o uso da câmera</Text>;

  if (!permission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Libere o uso da câmera e da galeria</Text>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function take() {
    if (ref) {
      const data = await ref.current.takePictureAsync();
      setCaptured(data.uri)
      setOpen(true)
      console.log(data)
  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      await MediaLibrary.createAlbumAsync('Minhas Fotos', asset, false);
      Alert.alert('Foto salva na galeria!');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref}>
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
          <TouchableOpacity style={styles.buttonFlip} onPress={toggleCameraFacing}>
            <Image style={styles.icon} source={require("./assets/flip.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTake}
            onPress={take}>

          <TouchableOpacity style={styles.buttonTake} onPress={takePicture}>
            <Image style={styles.icon} source={require("./assets/camera.png")} />
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal transparent={true} visible={open} >
        <View style={styles.contentPhoto}>
          <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
            <Image style={styles.icon} source={require("./assets/close.png")} />
          </TouchableOpacity>
          <Image style={styles.img} source={{ uri: captured }} />
        </View>
      </Modal>
    </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: "80%",
    height: "80%"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row"
    flexDirection: "row",
  },
  icon: {
    width: "80%",
    height: "80%"
  },
  buttonFlip: {
    position: "absolute",

@@ -107,25 +105,9 @@ const styles = StyleSheet.create({
    height: 50,
    borderRadius: 50,
  },
  contentPhoto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  img: {
    width: "100%",
    height: "80%"
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonClose: {
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  }
});