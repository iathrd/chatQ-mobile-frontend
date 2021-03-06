import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Form, Input, Item, Button} from 'native-base';
import Dialog from 'react-native-dialog';
import {useDispatch, useSelector} from 'react-redux';
import loginAction from '../redux/actions/auth';
import getUserAction from '../redux/actions/getuser';
import {Formik} from 'formik';
import {phoneValidation} from '../helpers/form_validations';

export default function Register({navigation}) {
  const token = useSelector((state) => state.auth.token) || '';
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const [phoneFormat, setPhoneFormat] = useState('+62');
  const [phone, setPhone] = useState('');
  const isLogin = useSelector((state) => state.auth.isLogin);
  const handleDialog = () => {
    setDialog(!dialog);
  };

  useEffect(() => {
    if (token.length) {
      dispatch(getUserAction.getUser(token));
      navigation.navigate('OTP', {data: phone});
    }
  }, [token]);

  const handleMove = (form) => {
    setDialog(false);
    const data = phoneFormat.concat(form.phone);
    setPhone(data)
    dispatch(loginAction.doLogin(data));
    if (token.length) {
    }
  };

  const handleSubmit = (data) => {
    dispatch(loginAction.doLogin(data));
  };

  return (
    <>
      <View style={styles.parent}>
        <View>
          <Text style={styles.textDes}>
            ChatQ will send an SMS message to verify your
          </Text>
          <View style={styles.desView}>
            <Text style={styles.textDes}>phone number.</Text>
            <Text style={styles.textLink}> What's my number?</Text>
          </View>
        </View>
        <View style={styles.pickerWrapper}>
          <TouchableHighlight
            style={styles.touchableCountry}
            onPress={() => navigation.navigate('Country')}>
            <View style={styles.picker}>
              <Text style={styles.textcoutry}>Indonesia</Text>
              <Icon name="arrow-drop-down" color="#1cac94" size={30} />
            </View>
          </TouchableHighlight>
        </View>
        <Formik
          style={styles.form}
          initialValues={{
            phone: '',
          }}
          validationSchema={phoneValidation}
          enableReinitialize
          onSubmit={(values) => {
            handleMove(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.formView}>
                <Item style={styles.numberFormat}>
                  <Icon2 name="plus" color="#9b9b9b" />
                  <Input style={styles.inputNumberFormat} value="62" />
                </Item>
                <Item style={styles.itemPhone}>
                  <Input
                    keyboardType="numeric"
                    style={styles.inputPhone}
                    placeholder="Phone number"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                  />
                </Item>
              </View>
              {errors.phone && touched.phone && (
                <Text style={{color: 'red'}}>{errors.phone}</Text>
              )}
              <Text style={styles.textSms}>Carrier SMS changes may apply</Text>
              <Dialog.Container
                contentStyle={styles.dialogCon}
                visible={dialog}>
                <Dialog.Title style={styles.dialogTitle}>
                  We will be verifying the phone
                </Dialog.Title>
                <Dialog.Title style={styles.dialogTitle}>number:</Dialog.Title>
                <Dialog.Description style={styles.dialogDes}>
                  {phoneFormat.concat(values.phone)}
                </Dialog.Description>
                <Dialog.Description style={styles.dialogTitle}>
                  Is this OK,or would you like to edit the number?
                </Dialog.Description>
                <View style={styles.btnView}>
                  <Dialog.Button
                    onPress={handleDialog}
                    color="#00b09c"
                    label="Edit"
                  />
                  <Dialog.Button
                    onPress={handleSubmit}
                    color="#00b09c"
                    label="Ok"
                  />
                </View>
              </Dialog.Container>
              <View style={styles.footer}>
                <Button
                  style={styles.btn}
                  onPress={
                    values.phone.length >= 10 ? handleDialog : handleSubmit
                  }>
                  <Text style={styles.btnText}>Next</Text>
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#101d25',
    alignItems: 'center',
    paddingTop: 10,
  },
  picker: {
    borderBottomColor: '#1cac94',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: '35%',
  },
  pickerWrapper: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 20,
  },
  textDes: {
    color: '#d2d2d8',
  },
  textLink: {
    color: '#609cc7',
  },
  desView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textcoutry: {
    color: '#d2d2d8',
    flexGrow: 1,
    alignSelf: 'center',
    fontSize: 17,
  },
  form: {
    width: '80%',
  },
  formView: {
    flexDirection: 'row',
    width: '80%',
  },
  numberFormat: {
    width: '25%',
  },
  inputNumberFormat: {
    color: '#d2d2d8',
    marginLeft: 15,
  },
  itemPhone: {
    flex: 1,
  },
  inputPhone: {
    color: '#d2d2d8',
  },
  textSms: {
    color: '#9b9b9b',
    alignSelf: 'center',
    marginTop: 20,
    flex: 1,
  },
  dialogCon: {
    backgroundColor: '#364147',
  },
  dialogTitle: {
    color: '#d2d2d8',
    fontSize: 16,
  },
  dialogDes: {
    color: '#d2d2d8',
    fontWeight: 'bold',
    fontSize: 17,
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    backgroundColor: '#101d25',
    paddingBottom: 40,
  },
  btn: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#00b09c',
  },
  btnText: {
    textTransform: 'uppercase',
  },
  touchableCountry: {
    width: '100%',
  },
});
