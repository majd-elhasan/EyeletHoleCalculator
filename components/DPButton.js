import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

export default function Button({num,onClick,inputValue,deleteFunc}) {

  var [ isPress, setIsPress ] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'red',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {
         console.log(num);num!='←'? onClick(inputValue+num):deleteFunc();
},                 // <-- "onPress" is apparently required
  };

  return (
    <View style={styles.digitsPanelCell}>
      <TouchableHighlight {...touchProps}>
        <Text style={styles.digitsPanelCell_text}>{num}</Text>
      </TouchableHighlight>
    </View>
  );
}

var styles = StyleSheet.create({
  btnNormal: {
    backgroundColor:"black",
    color:"rgb(0,0,255)",
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  btnPress: {
   
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  digitsPanelCell_text: {
    color: "white", marginTop: 10, marginLeft: 15
  },
  digitsPanelCell: {
    backgroundColor: "black",  borderRadius: 20, width: 40, height: 40, marginLeft: 20
  }
});