import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    county: 'Indonesia',
    format: '+62',
    selected: true,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    county: 'India',
    format: '+91',
    selected: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    county: 'Pakistan',
    format: '+92',
    selected: false,
  },
];

const Item = ({data, navigation}) => {
  const handleChange = (country, format) => {
    navigation.navigate('Register', {country, format});
  };
  return (
    <View style={styles.countryView}>
      <Text style={data.selected ? styles.textSelected : styles.textUnSelected}>
        {data.county}
      </Text>

      {data.selected ? (
        <>
          <Text style={styles.textFormat}>{data.format}</Text>
          <Icon name="done" color="#00b09c" size={25} />
        </>
      ) : (
        <TouchableHighlight
          onPress={() => handleChange(data.country, data.format)}>
          <Text style={styles.textFormat2}>{data.format}</Text>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default function CountryPicker({navigation}) {
  return (
    <SafeAreaView style={styles.content}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item data={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#101d25',
    paddingLeft: 16,
    paddingRight: 16,
  },
  textSelected: {
    color: '#00b09c',
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold',
  },
  textUnSelected: {
    color: '#d2d2d8',
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold',
  },
  countryView: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#101d25',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
  },
  textFormat: {
    color: '#d2d2d8',
    fontSize: 19,
    fontWeight: 'bold',
  },
  textFormat2: {
    color: '#d2d2d8',
    fontSize: 19,
    fontWeight: 'bold',
    marginRight: 25,
  },
});
