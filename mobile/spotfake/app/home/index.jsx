import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { AppContext } from '../../scripts/appContext';



export default profile = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)

    return (
        <View style={styles.container}>
            <Text>Home page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})

