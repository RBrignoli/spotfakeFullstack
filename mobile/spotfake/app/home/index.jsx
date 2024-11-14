import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { AppContext } from '../../scripts/appContext';
import Ionicons from '@expo/vector-icons/Ionicons'
import {router} from 'expo-router'


export default profile = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)

    return (
        <View style={styles.container}>
            <Ionicons name="person-circle-outline" size={32} color="white" onPress={() => router.push('/profile')} style={styles.iconQR} />
            <Text>Home page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    iconQR:{
        alignSelf:'flex-end',
        margin:6
    }
})

