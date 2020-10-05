
import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import {Card, Button} from "react-native-elements";
import  Deck from "./src/components/Deck";
const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://loremflickr.com/320/240/sea' },
  { id: 2, text: 'Card #2', uri: 'https://loremflickr.com/320/240/cat' },
  { id: 3, text: 'Card #3', uri: 'https://loremflickr.com/g/320/240/napoli' },
  { id: 4, text: 'Card #4', uri: 'https://loremflickr.com/320/240/brazil,rio' },
  { id: 5, text: 'Card #5', uri: 'https://loremflickr.com/320/240/napoli,girl/all' },
  { id: 6, text: 'Card #6', uri: 'https://loremflickr.com/320/240/napoli,sea' },
  { id: 7, text: 'Card #7', uri: 'https://loremflickr.com/320/240/soccer' },
  { id: 8, text: 'Card #8', uri: 'https://loremflickr.com/320/240/basketball' },
];
export default function App() {
  
  const renderCard=(item)=>{
    return <Card key={item.id}>
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
  const renderNoMoreCards=()=>{
    return <Card>
      <Card.Title>All Done</Card.Title>
      
      <Text style={{marginBottom:10}}> There's no more content here!</Text>
      <Button 
        icon={{name:"code"}}
        backgroundColor="#03A9F4"
        title="Get more!"
        ></Button> 
    </Card>
  }

  return (
    <View style={styles.container}>
      <Deck 
        data={DATA}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
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
