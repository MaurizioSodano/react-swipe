import React, { useRef } from "react";
import { View, Animated, PanResponder } from "react-native";

const Deck = ({ data, renderCard }) => {
    const position = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        position.setValue({x:gestureState.dx,y:gestureState.dy});
      },

      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      
      },

    })
  ).current;

  const renderCards = () => {
    return data.map((item) => {
      return renderCard(item);
    });
  };

  return <Animated.View 
        style={position.getLayout()}
        {...panResponder.panHandlers}>{renderCards()}
    </Animated.View>;
};

export default Deck;
