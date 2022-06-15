
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import DPButton from './components/DPButton';
// import Canvas from 'react-native-canvas';
// import React, { Component } from 'react';

const cellHeight = 40;

// var switch_state=false;

var switchOn_style = {
  left: 80
}

export default function App() {

  const [Start, SetStart] = useState(4);
  const [Third, SetThird] = useState(0);
  const [Second, SetSecond] = useState(0);
  const [First, SetFirst] = useState(0);

  const [inputValue, SetInputValue] = useState("");
  var calculated_input;
  const [switch_state, setSwitch_state] = useState(true);
  const [width_input_state, setWidth_input_state] = useState(false);
  const [widthValue, SetWidthValue] = useState(0);

  const [eyeletNum_Value, SetEyeletNum_Value] = useState(0);
  const [minimumDis_or_EyeletNum_input_state, setMinimumDis_or_EyeletNum_input_state] = useState(false);
  const [minimumDistance_Value, SetMinimumDistance_Value] = useState(0);
  const [activeColor, SetActiveColor] = useState("tomato");

  // const handleCanvas = (Canvas) => {
  //   const ctx = Canvas.getContext('2d');
  //   ctx.fillStyle = 'purple';
  //   ctx.fillRect(0, 0, 100, 100);
  // }

  function calculate() {
    var width = parseFloat(widthValue);
    var eyeletNum = parseFloat(eyeletNum_Value);
    var minimum = parseFloat(minimumDistance_Value);
    function setFuncs() {
      var d = (width - (Start + 3) * 2) / (eyeletNum - 1);
      var second = (d - 4) / 2 + 0.1;
      SetSecond(second);
      SetThird(d + second);
      SetFirst(d - 2 + 0.1);
    }

    if (switch_state) {
      setFuncs();
    }
    else {
      var eyeletNum = Math.round(((width - (Start + 2) * 2) / (minimum + 6)) / 2) * 2;
      SetEyeletNum_Value(eyeletNum);
      setFuncs();
    }

  }
  function Input_Calculator() {
    if (inputValue.includes('*')) {
      calculated_input = Math.floor(inputValue.substring(0, inputValue.indexOf("*")) *
        Math.floor(inputValue.substring(inputValue.indexOf("*") + 1, inputValue.length)))
    }
    else calculated_input = inputValue;
  }
  function activate_WidthField() {
    setMinimumDis_or_EyeletNum_input_state(false)
    setWidth_input_state(!width_input_state);

    Input_Calculator();
    if (width_input_state) { SetWidthValue(calculated_input); SetInputValue("") }; // width_input_state will be set to false after this function finish !! :)
  }
  function activate_numberOrDistance() {
    setWidth_input_state(false);
    setMinimumDis_or_EyeletNum_input_state(!minimumDis_or_EyeletNum_input_state);
    Input_Calculator();
    if (minimumDis_or_EyeletNum_input_state) {
      if (switch_state) { SetEyeletNum_Value(calculated_input); SetInputValue("") }
      else { SetMinimumDistance_Value(calculated_input); SetInputValue("") }
    }
  }
  return (
    <View style={styles.container}>
      <View style={[styles.colDir,{  top: 10 }]}>
        <View style={{ flex: 1, padding: 10 }}>
          <Image style={[styles.settingIcon]} source={require('./assets/setting-icon.png')} />
        </View>
        <View style={[styles.rowDir,{ flex: 3}]}>
          <View style={styles.Width_eyeletNum}>
            <Text onPress={() => activate_WidthField()}>Width</Text>
          </View>
          <View style={[styles.Width_eyeletNum, { top: cellHeight / 2 }]}>
            <Text onPress={() => activate_numberOrDistance()} style={{fontSize:!switch_state?12:14}}>{switch_state ? `Eyelet Number` : `Minimum Distance`}</Text>
          </View>
        </View>
        <View style={[styles.rowDir,{ flex: 2}]}>
          <View style={[styles.Width_eyeletNum_values, { backgroundColor: width_input_state ? activeColor : "rgb(136, 180, 77)" }]}><Text>{width_input_state ? inputValue : widthValue}</Text></View>
          <View style={[styles.Width_eyeletNum_values, { top: cellHeight / 2, backgroundColor: (minimumDis_or_EyeletNum_input_state) ? activeColor : "rgb(136, 180, 77)" }]}><Text>{(minimumDis_or_EyeletNum_input_state) ? inputValue : switch_state ? eyeletNum_Value : minimumDistance_Value}</Text></View>
        </View>
        <View style={[styles.rowDir,{ flex: 2}]}>
          <View style={styles.cell_setting}></View>
          <View style={[styles.cell_setting, { top: cellHeight / 2, left: 20 }]}><Text>Number</Text></View>
        </View>
        <View style={[styles.rowDir,{ flex: 3}]}>
          <View style={styles.calculate_switch}>
            <Text onPress={() => { calculate() }}>Calculate</Text>
          </View>
          <View style={[styles.calculate_switch, { top: cellHeight / 2, backgroundColor: "rgb(177, 142, 48)" }]}>
            <TouchableOpacity style={[styles.switch_btn, (!switch_state && switchOn_style)]} onPress={() => { setSwitch_state(!switch_state); console.log(switch_state) }}>

            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.rowDir,{ flex: 2}]}>
          <View style={styles.cell_setting}></View>
          <View style={[styles.cell_setting, { top: cellHeight / 3 ,left:10}]}><Text style={{fontSize : 12}} >Minimum distance</Text></View>
        </View>
        <View style={[styles.rowDir,{ flex: 6}]}>
            {/* here I am going to write a function to render all number views programmatically */}
          <View style={[styles.colDir,{ marginBottom: 10 }]}>
            <DPButton num="1" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="2" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="3" onClick={SetInputValue} inputValue={inputValue}/>
          </View>
          <View style={[styles.colDir,{ marginBottom: 10 }]}>
            <DPButton num="4" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="5" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="6" onClick={SetInputValue} inputValue={inputValue}/>
          </View>
          <View style={[styles.colDir,{ marginBottom: 10 }]}>
            <DPButton num="7" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="8" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="9" onClick={SetInputValue} inputValue={inputValue}/>
          </View>
          <View style={[styles.colDir,{ marginBottom: 10 }]}>
            <DPButton num="*" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="0" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="←" onClick={SetInputValue} inputValue={inputValue} deleteFunc={() => {
                var inputValu = "";
                for (var i = 0; i < inputValue.length - 1; i++) {
                  inputValu += inputValue[i];
                };
                SetInputValue(inputValu)
              }}/>
          </View>
        </View>
      </View>
      <View style={[styles.colDir,{ marginLeft: 20 }]}>
        <View style={{ flex: 1 }}><Text>Third : {Third}</Text></View>
        <View style={{ flex: 1 }}><Text>Second : {Second}</Text></View>
        <View style={{ flex: 1 }}><Text>First : {First}</Text></View>
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top:30
  },
  rowDir:{
    flexDirection:"column"
  },
  colDir:{
    flexDirection:"row"
  },
  Width_eyeletNum: {
    backgroundColor: "rgb(185, 117, 27)",
    height: cellHeight,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 10, paddingStart: 10
  },
  Width_eyeletNum_values: {
    backgroundColor: "rgb(136, 180, 77)",
    height: cellHeight,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10, paddingStart: 10
  },
  calculate_switch: {
    backgroundColor: "rgb(245, 139, 0)",
    height: cellHeight,
    borderRadius: 20,
    paddingTop: 10, paddingStart: 10
  },
  switch_btn: {
    width: 30, height: 30, backgroundColor: "rgb(245, 139, 0)", borderRadius: 15, bottom: 5
  },
  digitsPanelCell: {
    backgroundColor: "black",  borderRadius: 20, width: cellHeight, height: cellHeight, marginLeft: 20
  },
  digitsPanelCell_text: {
    color: "white", marginTop: 10, marginLeft: 15
  },
  cell_setting: {
    height: cellHeight,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10
  },
  settingIcon: {
    top: 10,
    height: 60,
    width: 60,
  }
});
