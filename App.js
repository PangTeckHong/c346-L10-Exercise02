import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View} from 'react-native';

//create a new variable name originalData
let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  //useEffect() - Exercise 1B
  useEffect(() => {
    //add fetch() - Exercise 1A
    fetch("https://raw.githubusercontent.com/bahamas10/css-color-names/master/css-color-names.json")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
            // Transform the JSON object into an array
            const transformedData = Object.keys(myJson).map((key) => ({
                name: key,
                hex: myJson[key],
            }));
            if (originalData.length < 1) {
                setMydata(transformedData);
                originalData = transformedData;
            }
        })


  },[]);

  //create the FilterData() function
  const FilterData = (text) => {
    if (text != '') {
      let myFilteredData = originalData.filter((item) =>
          item.name.includes(text));
      setMydata(myFilteredData);
    }
    else {
      setMydata(originalData);
    }
  }

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginVertical: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, backgroundColor:"white"}}>
                <View
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: item.hex,
                        marginRight: 10,
                    }}
                />
                <View
                    style={{
                        width: 1,
                        height: 90,
                        backgroundColor: '#ccc',
                        marginHorizontal: 10,
                    }}
                />
                <View>
                    <Text style={{ color: '#000', fontWeight: 'bold', padding:10 ,}}>Color        Name : {item.name}</Text>
                    <Text style={{ color: '#000', fontWeight: 'bold', padding:10 }}>Color Hex Code : {item.hex}</Text>
                </View>
            </View>
        );
    };

  return (
      <View style={{backgroundColor:"#DFEEF9", flex:1}}>
        <StatusBar/>
            <View style={{backgroundColor: 'lightblue', alignItems: 'center', padding: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Color List</Text>
            </View>
          <View style={{paddingHorizontal:10}}>
              <View style={{paddingVertical:10}}>
                  <TextInput style={{borderWidth:1}} placeholder={"Search Color..."} onChangeText={(text)=>{FilterData(text)}}/>
              </View>
              <FlatList data={mydata} renderItem={renderItem} />
          </View>
      </View>
  );
}

export default App;
