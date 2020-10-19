import React from 'react';
import axios from 'axios';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import * as Location from 'expo-location';
import SmsAndroid from 'react-native-android-sms';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import { Button, Icon, Text } from 'react-native-magnus';
import { Card } from 'react-native-elements';

import { Loading } from '../components/Loading';
import { HeaderIconButton } from '../components/HeaderIconButton';
import { AuthContext } from '../contexts/AuthContext';
import { BASE_URL } from '../config';
import { UserContext } from '../contexts/UserContext';

const Toast = ({ visible, message }) => {
    if (visible) {
        ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
        return null;
    }
    return null;
};

export default function HomeScreen({ navigation }) {
    const { logout } = React.useContext(AuthContext);
    const user = React.useContext(UserContext);

    const token = user.token;
    const user_id = user.user_id;

    const initialValue = [];
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [number, setNumber] = React.useState(initialValue);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [visibleToast, setvisibleToast] = React.useState(false);

    React.useEffect(() => setvisibleToast(false), [visibleToast]);

    const handleButtonPress = () => {
        setvisibleToast(true);
    };

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderIconButton
                    name={'log-out'}
                    onPress={() => {
                        logout();
                    }}
                />
            ),
        });
    }, [navigation]);

    React.useEffect(() => {
        axios
            .get(`${BASE_URL}/emergency-contacts/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data }) => {
                setData(data);
                // console.log(data.data);
                setLoading(false);
            });
    }, [token, user_id]);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLoading(false);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.parse(JSON.stringify(location));
    }

    function renderNumber() {
        if (loading) {
            return <Loading loading={loading} />;
        } else {
            const emergencyNumber = {
                firstNumber: data.data[0],
                sencondNumber: data.data[1],
            };
            console.log(emergencyNumber);
              AsyncStorage.setItem('emergencyNumber', JSON.stringify(emergencyNumber));
         
            function sendSmsFunction() {
                var phoneNumbers = {
                    addressList: [data.data[0], data.data[1]],
                };
                var message = `See my location here: http://maps.google.com/maps?q=${text.coords.latitude},${text.coords.longitude} please pay close attention to where i am `;
                SmsAndroid.send(
                    JSON.stringify(phoneNumbers),
                    message,
                    (fail) => {
                        console.log('Failed with this error: ' + fail);
                    },
                    (success) => {
                        console.log('SMS sent successfully' + success);
                    }
                );
            }
            return (
                <View style={styles.container}>
                
                <Button
                        onPress={() => {
                            sendSmsFunction();
                            handleButtonPress();
                        }}
                        mb={200}
                        bg="brand900"
                        h={100}
                        w={200}
                        mx="xl"
                        rounded="circle"
                        shadow="2xl"
                        // borderWidth={10}
                        // borderColor="red500"
                        underlayColor="brand900"
                    >
                        SEND SMS
                    </Button>
                    <Toast style={styles.toast} visible={visibleToast} message="Message Successfully sent" />
                </View>
            );
        }
    }

    React.useEffect(() => {
        
           AsyncStorage.getItem('emergencyNumber').then((emergencyNumber) => {
                setNumber(JSON.parse(emergencyNumber));
                // console.log(number);
        })
        
    }, []);

    function isNumberSaved() {
        if (number) {
            function sendSmsFunction() {
                var phoneNumbers = {
                    
                    addressList: [number.firstNumber, number.sencondNumber ],
                };
                var message = `See my location here: http://maps.google.com/maps?q=${text.coords.latitude},${text.coords.longitude} please pay close attention to where i am `;
                SmsAndroid.send(
                    JSON.stringify(phoneNumbers),
                    message,
                    (fail) => {
                        console.log('Failed with this error: ' + fail);
                    },
                    (success) => {
                        console.log('SMS sent successfully' + success);
                    }
                );
            }

            return (
                <View style={styles.view}>
                    
                    <Button
                        onPress={() => {
                            sendSmsFunction();
                            handleButtonPress();
                        }}
                        mb={200}
                        bg="brand900"
                        h={100}
                        w={200}
                        mx="xl"
                        rounded="circle"
                        shadow="2xl"
                        // borderWidth={10}
                        // borderColor="red500"
                        underlayColor="brand900"
                    >
                        SEND SMS
                    </Button>
                    <Toast style={styles.toast} visible={visibleToast} message="Message Successfully sent" />
                </View>
            );
        } else {
            return renderNumber();
        }
    }

    return <View style={styles.container}>{isNumberSaved()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#bbb',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toast: {
        paddingTop: Constants.statusBarHeight,
    },
    // view: {
    //  paddingLeft: 50,
    //  paddingRight: 0
    // },
});