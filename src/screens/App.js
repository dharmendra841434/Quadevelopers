/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';
import {FlatList} from 'react-native';
import {Themes} from '../utils/Themes';
import {Dates, TimeLine, boxData} from '../utils/DummyData';
import {DataTable} from 'react-native-paper';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const App = () => {
  const [selectedDate, setSelectedDate] = useState({});
  const [numberOfColumn, setNumberOfColumn] = useState(7);
  const [selectedBox, setSelectedBox] = useState([]);

  const selectYourBox = boxNumber => {
    console.log(boxNumber);
    if (selectedBox.length > 0) {
      if (selectedBox?.includes(boxNumber)) {
        let f = selectedBox?.filter(itrr => itrr !== boxNumber);
        setSelectedBox(f);
      } else {
        setSelectedBox(searches => searches?.concat(boxNumber));
      }
    } else {
      setSelectedBox(searches => searches?.concat(boxNumber));
    }
  };

  console.log(selectedBox, 'khjhjh');
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={Themes.primary} barStyle={'light-content'} />
      <View style={styles.header}>
        <View style={styles.menu}>
          <Icon
            name="bars"
            size={30}
            style={{marginRight: '8%'}}
            color={Themes.textGray}
          />
          <TouchableOpacity style={styles.dropDown}>
            <Text style={styles.text1}>Sept</Text>
            <Icon2
              name="caret-down-outline"
              size={15}
              color={Themes.textGray}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={require('../assets/images/checkbox.png')} />
        </View>
        <TouchableOpacity style={styles.dropDown}>
          <Text style={styles.text2}>My calendar</Text>
          <Icon2 name="caret-down-outline" size={15} color={Themes.textGray} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingStart: '4%',
          alignItems: 'center',
          marginVertical: '3%',
        }}>
        <FlatList
          horizontal
          data={Dates}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setSelectedDate(item)}
              style={styles.dates}
              key={index}>
              <Text
                style={[
                  styles.day,
                  {
                    color:
                      selectedDate?.day === item.day
                        ? Themes.appRed
                        : Themes.textColor,
                  },
                ]}>
                {item.day.charAt(0)}
              </Text>
              <Text
                style={[
                  styles.date,
                  {
                    color:
                      selectedDate?.date === item.date
                        ? Themes.appblack
                        : Themes.textColor,
                    backgroundColor:
                      selectedDate?.date === item.date ? Themes.appRed : null,
                    borderRadius: 20,
                    paddingHorizontal: 9,
                    paddingVertical: 9,
                    textAlign: 'center',
                  },
                ]}>
                {item.date}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: Themes.appblack,
            flexDirection: 'row',
            width: Width,
            paddingHorizontal: '1%',
          }}>
          {[1, 2].map((nt, index) => (
            <View
              key={index}
              style={{
                width: index === 0 ? '10%' : '90%',
                backgroundColor: Themes.appblack,
              }}>
              {index === 0 && (
                <View style={{paddingTop: Height / 15}}>
                  <FlatList
                    data={TimeLine}
                    scrollEnabled={false}
                    renderItem={({item, index}) => (
                      <View style={{height: Height / 13}}>
                        <Text style={styles.time}>{item}</Text>
                      </View>
                    )}
                  />
                </View>
              )}
              {index === 1 && (
                <View style={styles.boxContainer}>
                  <FlatList
                    data={boxData}
                    scrollEnabled={false}
                    numColumns={numberOfColumn}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        onPress={() => selectYourBox(item)}
                        style={{
                          borderBottomColor: Themes.textGray,
                          borderBottomWidth: 2,
                          borderRightColor: Themes.textGray,
                          borderRightWidth: 2,
                          width: Width / 8.17,
                          height: Height / 13,
                          backgroundColor: selectedBox?.includes(item)
                            ? Themes.appGreen
                            : null,
                        }}>
                        {/* <Text>{item}</Text> */}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.floatingButton}>
        <TouchableOpacity activeOpacity={0.6} style={styles.b1}>
          <Image source={require('../assets/images/calender.png')} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.b2}>
          <Image source={require('../assets/images/add.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Themes.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    color: Themes.textColor,
    fontFamily: 'Ampero-Regular',
    fontSize: 22,
  },
  text2: {
    color: Themes.textGray,
    fontFamily: 'Ampero-Regular',
    fontSize: 22,
  },
  checkbox: {
    borderWidth: 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftColor: Themes.appRed,
    borderBottomColor: Themes.appRed,
    borderBottomEndRadius: 3,
    borderBottomStartRadius: 3,
  },
  dates: {
    width: Width / 8,
    alignItems: 'center',
  },
  day: {
    fontFamily: 'Ampero-Regular',
    fontSize: 13,
  },
  date: {
    fontFamily: 'Ampero-Regular',
    fontSize: 20,
    marginTop: '10%',
  },
  boxContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: Themes.textGray,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  time: {
    color: Themes.textGray,
  },
  floatingButton: {
    position: 'absolute',
    bottom: '20%',
    right: 20,
  },
  b1: {
    backgroundColor: '#1B1B1B',
    padding: 18,
    borderRadius: 30,
    elevation: 10,
    margin: 10,
  },
  b2: {
    backgroundColor: '#1B1B1B',
    padding: 18,
    borderRadius: 30,
    elevation: 10,
    margin: 10,
  },
});

export default App;
