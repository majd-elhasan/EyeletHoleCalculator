
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity ,Dimensions} from 'react-native';
import DPButton from './components/DPButton';
import Svg, { Circle, Rect,Line ,Polyline,Text as SVGText} from 'react-native-svg';


const cellHeight = 40;
const chartWidth = Dimensions.get('window').width/2;
const chartHeight= Dimensions.get('window').height/2;
const leftStart = chartWidth*3/4-19;
const rightStart = chartWidth*3/4+19;

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
  const activeColor = "tomato"

  const [start_input_state, setStart_input_state] = useState(false);

  function calculate() {
    // var start = parseFloat(Start);
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
  function activate_StartField() {
    setMinimumDis_or_EyeletNum_input_state(false);
    setWidth_input_state(false);
    setStart_input_state(!start_input_state);

    Input_Calculator();
    if (start_input_state) { SetStart(parseFloat(calculated_input)); SetInputValue("") }; // width_input_state will be set to false after this function finish !! :)
  }
  function activate_WidthField() {
    setStart_input_state(false);
    setMinimumDis_or_EyeletNum_input_state(false);
    setWidth_input_state(!width_input_state);

    Input_Calculator();
    if (width_input_state) { SetWidthValue(calculated_input); SetInputValue("") }; // width_input_state will be set to false after this function finish !! :)
  }
  function activate_numberOrDistance() {
    setStart_input_state(false);
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
      <View style={{  top: 10 ,flexDirection:"row"}}>
        <View style={{ flex: 1, padding: 10 }}>
          <Image style={[styles.settingIcon]} source={require('./assets/setting-icon.png')} />
        </View>
        <View style={{ flex: 3,flexDirection:"column"}}>
          <View style={styles.Width_eyeletNum}>
            <Text onPress={() => activate_WidthField()}>Width</Text>
          </View>
          <View style={[styles.Width_eyeletNum, { top: cellHeight / 2 }]}>
            <Text onPress={() => activate_numberOrDistance()} style={{fontSize:!switch_state?12:14}}>{switch_state ? `Eyelet Number` : `Minimum Distance`}</Text>
          </View>
          {/* Starting Distance */}
          <View style={[styles.Width_eyeletNum,{ top: cellHeight}]}>
            <Text onPress={() => activate_StartField()} style={{fontSize:13}}>Starting Distance</Text>
          </View>
        </View>
        <View style={{ flex: 2,flexDirection:"column"}}>
          <View style={[styles.Width_eyeletNum_values, { backgroundColor: width_input_state ? activeColor : "rgb(136, 180, 77)" }]}><Text>{width_input_state ? inputValue : widthValue}</Text></View>
          <View style={[styles.Width_eyeletNum_values, { top: cellHeight / 2, backgroundColor: (minimumDis_or_EyeletNum_input_state) ? activeColor : "rgb(136, 180, 77)" }]}><Text>{(minimumDis_or_EyeletNum_input_state) ? inputValue : switch_state ? eyeletNum_Value : minimumDistance_Value}</Text></View>
          {/* Starting Distance */}
          <View style={[styles.Width_eyeletNum_values, { top:cellHeight,backgroundColor: start_input_state ? activeColor : "rgb(136, 180, 77)"}]}><Text>{start_input_state ? inputValue : Start}</Text></View>
        </View>
        <View style={{ flex: 2,flexDirection:"column"}}>
          <View style={styles.cell_setting}></View>
          <View style={[styles.cell_setting, { top: cellHeight / 2, left: 20 }]}><Text>Number</Text></View>
        </View>
        <View style={{ flex: 3,flexDirection:"column"}}>
          <View style={styles.calculate_switch}>
            <Text onPress={() => { calculate() }}>Calculate</Text>
          </View>
          <View style={[styles.calculate_switch, { top: cellHeight / 2, backgroundColor: "rgb(177, 142, 48)" }]}>
            <TouchableOpacity style={[styles.switch_btn, (!switch_state && switchOn_style)]} onPress={() => { setSwitch_state(!switch_state); console.log(switch_state) }}>

            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 2,flexDirection:"column"}}>
          <View style={styles.cell_setting}></View>
          <View style={[styles.cell_setting, { top: cellHeight / 3 ,left:10}]}><Text style={{fontSize : 12}} >Minimum distance</Text></View>
        </View>
        <View style={{ flex: 6,flexDirection:"column"}}>
            {/* here I am going to write a function to render all number views programmatically */}
          <View style={{ marginBottom: 10 ,flexDirection:"row"}}>
            <DPButton num="1" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="2" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="3" onClick={SetInputValue} inputValue={inputValue}/>
          </View>
          <View style={{ marginBottom: 10 ,flexDirection:"row"}}>
            <DPButton num="4" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="5" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="6" onClick={SetInputValue} inputValue={inputValue}/>
          </View>
          <View style={{ marginBottom: 10 ,flexDirection:"row"}}>
            <DPButton num="7" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="8" onClick={SetInputValue} inputValue={inputValue}/>
            <DPButton num="9" onClick={SetInputValue} inputValue={inputValue}/>
          </View>
          <View style={{ marginBottom: 10 ,flexDirection:"row"}}>
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
      <View style={{ marginLeft: 20 ,flexDirection:"row"}}>
        {/* <View style={{ flex: 1 }}><Text>Third : {Third}</Text></View>
        <View style={{ flex: 1 }}><Text>Second : {Second}</Text></View>
        <View style={{ flex: 1 }}><Text>First : {First}</Text></View> */}
        <View style={{ flex: 3 ,paddingLeft:40}}>
          <Svg width={chartWidth*5/4} height={chartHeight} style={styles.svg} >
            {/* <Rect width={chartWidth/2} height={chartHeight/2} fill={'#ef7'} /> */}
            <Circle cx={chartWidth*3/4} cy={chartHeight/2} r={29} fill={'#aaa'}/>
            <Circle cx={chartWidth*3/4} cy={chartHeight/2} r={19} fill='black'/>
            {/* Third Line */}
            <Line x1={leftStart-Third*10} y1={chartHeight/2-10} x2={leftStart-Third*10} y2={chartHeight/2+10} stroke={Third?"red":null} strokeWidth="3" />
            <Polyline
              points={`
              ${leftStart-Third*10},${chartHeight/2+20} 
              ${leftStart-Third*10*0.98},${chartHeight/2+25}
              ${leftStart-Third*10*0.90},${chartHeight/2+30} 
              ${leftStart-Third*10*0.10},${chartHeight/2+30} 
              ${leftStart-Third*10*0.02},${chartHeight/2+25} 
              ${leftStart},${chartHeight/2+20}
              `}
              fill="none"
              stroke={Third?"black":null}
              strokeWidth="3"
            />
            <SVGText
              fill="purple"
              stroke="purple"
              fontSize="20"
              fontWeight="bold"
              x={leftStart-Third*10*0.50}
              y={chartHeight/2+50}
              textAnchor="middle"
            >
             {Third?Third:null}
            </SVGText>

            {/* Second Line */}
            <Line x1={leftStart-Second*10} y1={chartHeight/2-10} x2={leftStart-Second*10} y2={chartHeight/2+10} stroke={Second?"red":null} strokeWidth="3" />
            <Polyline
              points={`
              ${leftStart-Second*10},${chartHeight/2-20} 
              ${leftStart-Second*10*0.98},${chartHeight/2-25}
              ${leftStart-Second*10*0.90},${chartHeight/2-30} 
              ${leftStart-Second*10*0.10},${chartHeight/2-30} 
              ${leftStart-Second*10*0.02},${chartHeight/2-25} 
              ${leftStart},${chartHeight/2-20}
              `}
              fill="none"
              stroke={Second?"black":null}
              strokeWidth="3"
            />
            <SVGText
              fill="purple"
              stroke="purple"
              fontSize="20"
              fontWeight="bold"
              x={leftStart-Second*10*0.50}
              y={chartHeight/2-50}
              textAnchor="middle"
            >
             {Second?Second:null}
            </SVGText>
            {/* start Line */}
            <Line x1={rightStart+(Start+1.1)*10} y1={chartHeight/2-10} x2={rightStart+(Start+1.1)*10} y2={chartHeight/2+10} stroke={Start?"green":null} strokeWidth="3" />
            <Polyline
              points={`
              ${rightStart+(Start+1.1)*10},${chartHeight/2-20} 
              ${rightStart+(Start+1.1)*10*0.98},${chartHeight/2-25}
              ${rightStart+(Start+1.1)*10*0.90},${chartHeight/2-30} 
              ${rightStart+(Start+1.1)*10*0.10},${chartHeight/2-30} 
              ${rightStart+(Start+1.1)*10*0.02},${chartHeight/2-25} 
              ${rightStart},${chartHeight/2-20}
              `}
              fill="none"
              stroke={Start?"black":null}
              strokeWidth="3"
            />
            <SVGText
              fill="purple"
              stroke="purple"
              fontSize="20"
              fontWeight="bold"
              x={rightStart+(Start+1.1)*10*0.50}
              y={chartHeight/2-50}
              textAnchor="middle"
            >
             {Start?(Start+1.1):null}
            </SVGText>
            {/* First Line */}
            <Line x1={rightStart+First*10} y1={chartHeight/2-10} x2={rightStart+First*10} y2={chartHeight/2+10} stroke={First?'red':null} strokeWidth="3" />
            <Polyline
              points={`
              ${(rightStart+First*10)},${chartHeight/2+20} 
              ${(rightStart+First*10*0.98)},${chartHeight/2+25}
              ${(rightStart+First*10*0.90)},${chartHeight/2+30} 
              ${(rightStart+First*10*0.10)},${chartHeight/2+30} 
              ${(rightStart+First*10*0.02)},${chartHeight/2+25} 
              ${rightStart},${chartHeight/2+20}
              `}
              fill="none"
              stroke={First?"black":null}
              strokeWidth="3"
            />
            <SVGText
              fill="purple"
              stroke="purple"
              fontSize="20"
              fontWeight="bold"
              x={rightStart+First*10*0.50}
              y={chartHeight/2+50}
              textAnchor="middle"
            >
             {First?First:null}
            </SVGText>
          </Svg>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#ef7",
    top:30
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
  },
  svg:{
    // borderWidth:3,
    borderRadius:30,
    top:-30
  }
});
