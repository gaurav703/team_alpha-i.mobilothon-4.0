"use strict";

import React, { Component } from "react";
import {
  ViroARScene,
  ViroMaterials,
  ViroNode,
  ViroAnimations,
  Viro3DObject,
  ViroLightingEnvironment,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroSphere,
  ViroSpotLight,
  ViroQuad,
} from "react-viro";

class ARCarDemo extends Component {
  state = {
    texture: "white",
    playAnim: false,
    animateCar: false,
    tapWhite: false,
    tapBlue: false,
    tapGrey: false,
    tapRed: false,
    tapYellow: false,
  };

  render() {
    return (
      <ViroARScene>
        <ViroLightingEnvironment
          source={require("../assets/tesla/garage_1k.hdr")}
        />

        <ViroARImageMarker
          target={"logo"}
          onAnchorFound={this._onAnchorFound}
          pauseUpdates={this.state.pauseUpdates}
        >
          <ViroNode
            scale={[0, 0, 0]}
            transformBehaviors={["billboardY"]}
            animation={{ name: this.state.animName, run: this.state.playAnim }}
          >
            {this._renderColorSpheres()}
          </ViroNode>

          <Viro3DObject
            scale={[0, 0, 0]}
            source={require("../assets/tesla/object_car.obj")}
            resources={[require("../assets/tesla/object_car.mtl")]}
            type="OBJ"
            materials={this.state.texture}
            onClick={this._toggleButtons}
            animation={{ name: "scaleCar", run: this.state.animateCar }}
          />

          <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, 0]}
            position={[0, 5, 1]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={7}
            shadowOpacity={0.7}
          />

          <ViroQuad
            rotation={[-90, 0, 0]}
            position={[0, -0.001, 0]}
            width={2.5}
            height={2.5}
            arShadowReceiver={true}
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _renderColorSpheres() {
    const colors = ["white", "blue", "grey", "red", "yellow"];
    return colors.map((color, index) => (
      <ViroSphere
        key={color}
        materials={[`${color}_sphere`]}
        heightSegmentCount={20}
        widthSegmentCount={20}
        radius={0.03}
        position={[index * 0.1 - 0.2, 0.25, 0]}
        onClick={() => this._selectColor(color)}
        animation={{
          name: "tapAnimation",
          run: this.state[
            `tap${color.charAt(0).toUpperCase() + color.slice(1)}`
          ],
          onFinish: this._animateFinished,
        }}
        shadowCastingBitMask={0}
      />
    ));
  }

  _onAnchorFound = () => {
    this.setState({ animateCar: true });
  };

  _toggleButtons = () => {
    this.setState((prevState) => ({
      animName: prevState.animName === "scaleUp" ? "scaleDown" : "scaleUp",
      playAnim: true,
    }));
  };

  _selectColor(color) {
    this.setState({
      texture: color,
      [`tap${color.charAt(0).toUpperCase() + color.slice(1)}`]: true,
    });
  }

  _animateFinished = () => {
    this.setState({
      tapWhite: false,
      tapBlue: false,
      tapGrey: false,
      tapRed: false,
      tapYellow: false,
    });
  };
}

ViroMaterials.createMaterials({
  white: {
    lightingModel: "PBR",
    diffuseTexture: require("../assets/tesla/object_car_main_Base_Color.png"),
    metalnessTexture: require("../assets/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("../assets/tesla/object_car_main_Roughness.png"),
  },
  blue: {
    lightingModel: "PBR",
    diffuseTexture: require("../assets/tesla/object_car_main_Base_Color_blue.png"),
    metalnessTexture: require("../assets/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("../assets/tesla/object_car_main_Roughness.png"),
  },
  grey: {
    lightingModel: "PBR",
    diffuseTexture: require("../assets/tesla/object_car_main_Base_Color_grey.png"),
    metalnessTexture: require("../assets/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("../assets/tesla/object_car_main_Roughness.png"),
  },
  red: {
    lightingModel: "PBR",
    diffuseTexture: require("../assets/tesla/object_car_main_Base_Color_red.png"),
    metalnessTexture: require("../assets/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("../assets/tesla/object_car_main_Roughness.png"),
  },
  yellow: {
    lightingModel: "PBR",
    diffuseTexture: require("../assets/tesla/object_car_main_Base_Color_yellow.png"),
    metalnessTexture: require("../assets/tesla/object_car_main_Metallic.png"),
    roughnessTexture: require("../assets/tesla/object_car_main_Roughness.png"),
  },
  white_sphere: { lightingModel: "PBR", diffuseColor: "rgb(231,231,231)" },
  blue_sphere: { lightingModel: "PBR", diffuseColor: "rgb(19,42,143)" },
  grey_sphere: { lightingModel: "PBR", diffuseColor: "rgb(75,76,79)" },
  red_sphere: { lightingModel: "PBR", diffuseColor: "rgb(168,0,0)" },
  yellow_sphere: { lightingModel: "PBR", diffuseColor: "rgb(200,142,31)" },
});

ViroARTrackingTargets.createTargets({
  logo: {
    source: require("../assets/logo.png"),
    orientation: "Up",
    physicalWidth: 0.165,
  },
});

ViroAnimations.registerAnimations({
  scaleUp: {
    properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 500,
    easing: "bounce",
  },
  scaleDown: { properties: { scaleX: 0, scaleY: 0, scaleZ: 0 }, duration: 200 },
  scaleCar: {
    properties: { scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09 },
    duration: 500,
    easing: "bounce",
  },
  scaleSphereUp: {
    properties: { scaleX: 0.8, scaleY: 0.8, scaleZ: 0.8 },
    duration: 50,
    easing: "easeineaseout",
  },
  scaleSphereDown: {
    properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 50,
    easing: "easeineaseout",
  },
  tapAnimation: [["scaleSphereUp", "scaleSphereDown"]],
});

export default ARCarDemo;
