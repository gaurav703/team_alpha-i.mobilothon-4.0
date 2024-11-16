/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {
  ViroMaterials.createMaterials({
    wood: {
      diffuseTexture: require("./assets/wood-texture.jpg"),
    },
    blue: {
      lightingModel: "PBR",
      diffuseTexture: require("./assets/tesla/object_car_main_Base_Color_blue.png"),
      metalnessTexture: require("./assets/tesla/object_car_main_Metallic.png"),
      roughnessTexture: require("./assets/tesla/object_car_main_Roughness.png"),
    },
  });

  ViroAnimations.registerAnimations({
    rotate: {
      properties: {
        rotateY: "+=90",
      },
      duration: 2500,
    },
    scaleCar: {
      properties: { scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09 },
      duration: 500,
      easing: "bounce",
    },
  });
  return (
    <ViroARScene>
      {/* <ViroText
        text="Hello World!"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -3]}
        style={styles.helloWorldTextStyle}
      /> */}
      <ViroBox
        height={15}
        length={15}
        width={15}
        position={[0, -2, -10]}
        scale={[0.2, 0.2, 0.2]}
        materials={["wood"]}
        animation={{ name: "rotate", run: true, loop: true }}
      />
      {/* <Viro3DObject
        position={[0, -2, -10]}
        scale={[0.2, 0.2, 0.2]}
        source={require("./assets/tesla/object_car.obj")}
        resources={[require("./assets/tesla/object_car.mtl")]}
        type="OBJ"
        materials={["blue"]}
        // animation={{ name: "scaleCar", run: true }}
      /> */}
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
