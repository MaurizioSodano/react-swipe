
import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import {Card, Button} from "react-native-elements";
import  Deck from "./src/components/Deck";
const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://loremflickr.com/320/240/sea' },
  { id: 2, text: 'Card #2', uri: 'https://loremflickr.com/320/240/cat' },
  { id: 3, text: 'Card #3', uri: 'https://loremflickr.com/g/320/240/napoli' },
  { id: 4, text: 'Card #4', uri: 'https://loremflickr.com/320/240/brazil,rio' },
  { id: 5, text: 'Card #5', uri: 'https://loremflickr.com/320/240/paris,girl/all' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];
export default function App() {
  
  const renderCard=(item)=>{
    return <Card key={item.text}>
      <Card.Title>{item.text}</Card.Title>
      <Card.Image source={{uri:item.uri}}/>
      <Text style={{marginBottom:10}}> Some Text</Text>
      <Button 
        icon={{name:"code"}}
        backgroundColor="#03A9F4"
        title="View Now!"
        ></Button>    
    </Card>
  }
  
  return (
    <View style={styles.container}>
      <Deck 
        data={DATA}
        renderCard={renderCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
