import AsyncStorage from '@react-native-community/async-storage';
const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};
export const storeDataObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return false;
    }
  } catch (e) {
    // error reading value
  }
};
export const getDataObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
export const tribeToCode = (object) =>
  ({
    다이어터: '1',
    유지어터: '2',
    '간헐적 다이어터': '3',
    비건: '4',
    '클린푸드 매니아': '5',
    보디빌더: '6',
    파워리프터: '7',
    러너: '8',
    '요가/필라테스족': '9',
    'MMA/격투가': '10',
    종합레저인: '11',
    'MTB/싸이클러': '12',
    클라이머: '13',
    '재활/교정인': '14',
    기타: '15',
  }[object]);
export const codeToTribe = (object) =>
  ({
    1: '다이어터',
    2: '유지어터',
    3: '간헐적 다이어터',
    4: '비건',
    5: '클린푸드 매니아',
    6: '보디빌더',
    7: '파워리프터',
    8: '러너',
    9: '요가/필라테스족',
    10: 'MMA/격투가',
    11: '종합레저인',
    12: 'MTB/싸이클러',
    13: '클라이머',
    14: '재활/교정인',
    15: '기타',
    '': '',
  }[object]);
export const birth = () => {
  let birth = new Object();

  let arr = new Array();

  for (i = 1950; i < 2020; i++) {
    let birthData = new Object();
    birthData.keyValue = i;
    birthData.label = i + '년';
    birthData.value = i;
    arr.push(birthData);
  }

  return arr;
};
export const month = () => {
  return [
    {keyValue: '01', label: '1월', value: '01'},
    {keyValue: '02', label: '2월', value: '02'},
    {keyValue: '03', label: '3월', value: '03'},
    {keyValue: '04', label: '4월', value: '04'},
    {keyValue: '05', label: '5월', value: '05'},
    {keyValue: '06', label: '6월', value: '06'},
    {keyValue: '07', label: '7월', value: '07'},
    {keyValue: '08', label: '8월', value: '08'},
    {keyValue: '09', label: '9월', value: '09'},
    {keyValue: '10', label: '10월', value: '10'},
    {keyValue: '11', label: '11월', value: '11'},
    {keyValue: '12', label: '12월', value: '12'},
  ];
};
export const day = () => {
  return [
    {keyValue: '01', label: '1일', value: '01'},
    {keyValue: '02', label: '2일', value: '02'},
    {keyValue: '03', label: '3일', value: '03'},
    {keyValue: '04', label: '4일', value: '04'},
    {keyValue: '05', label: '5일', value: '05'},
    {keyValue: '06', label: '6일', value: '06'},
    {keyValue: '07', label: '7일', value: '07'},
    {keyValue: '08', label: '8일', value: '08'},
    {keyValue: '09', label: '9일', value: '09'},
    {keyValue: '10', label: '10일', value: '10'},
    {keyValue: '11', label: '11일', value: '11'},
    {keyValue: '12', label: '12일', value: '12'},
    {keyValue: '13', label: '13일', value: '13'},
    {keyValue: '14', label: '14일', value: '14'},
    {keyValue: '15', label: '15일', value: '15'},
    {keyValue: '16', label: '16일', value: '16'},
    {keyValue: '17', label: '17일', value: '17'},
    {keyValue: '18', label: '18일', value: '18'},
    {keyValue: '19', label: '19일', value: '19'},
    {keyValue: '20', label: '20일', value: '20'},
    {keyValue: '21', label: '21일', value: '21'},
    {keyValue: '22', label: '22일', value: '22'},
    {keyValue: '23', label: '23일', value: '23'},
    {keyValue: '24', label: '24일', value: '24'},
    {keyValue: '25', label: '25일', value: '25'},
    {keyValue: '26', label: '26일', value: '26'},
    {keyValue: '27', label: '27일', value: '27'},
    {keyValue: '28', label: '28일', value: '28'},
    {keyValue: '29', label: '29일', value: '29'},
    {keyValue: '30', label: '30일', value: '30'},
    {keyValue: '31', label: '31일', value: '31'},
  ];
};
export const modifyData = (data) => {
  const arr = [];
  var tmp = [];
  data.forEach((val, index) => {
    if (val.IMG1TYPE == 'image') {
      tmp.push(val);
      if (tmp.length == 2) {
        arr.push(tmp);
        tmp = [];
      }
    }
    if (val.IMG1TYPE == 'video') {
      arr.push(val);
      tmp = [];
    }
  });

  return arr;
};