import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get(`window`).width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({
  data,
  renderCard,
  renderNoMoreCards,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [newData, setNewData] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (onSwipeLeft == null) {
      onSwipeLeft = () => {};
    }
    if (onSwipeRight == null) {
      onSwipeRight = () => {};
    }
  }, []);
  useEffect(() => {
    if (newData !== data) {
      setNewData(data);

      setIndex(0); //set index back to "0"
    }
  }, [data]);
  useLayoutEffect(() => {
    if (Platform.OS === "android")
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [index]);

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },

      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded

        if (gestureState.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      useNativeDriver: false,
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(direction));
  };
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const onSwipeComplete = (direction) => {
    console.log(`On swipe complete index: ${index}`);
    const item = data[index];

    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setIndex((prevIndex) => prevIndex + 1);
    LayoutAnimation.configureNext({
      duration: 2000,
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    });
  };
  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: [`-120deg`, `0deg`, `120deg`],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate: rotate }],
    };
  };
  const renderCards = () => {
    console.log(`Current index:${index}`);
    if (index >= data.length) {
      return renderNoMoreCards();
    }
    return data
      .map((item, i) => {
        if (i < index) {
          return null;
        }
        if (i === index) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.cardStyle, { zIndex: index * -1 }]}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.cardStyle,
              { zIndex: index * -1 },
              { top: 10 * (i - index) },
              { left: 10 * (i - index) },
            ]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});
export default Deck;
