import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native'
import { AppContext } from '../../scripts/appContext';
import {router} from 'expo-router'



export default profile = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)

    const handlePagamento = async () => {
        // try {
        //     const response = await fetch('http://localhost:8000/user/pagamento', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ teste: true})
        //     });
        //     if (response.status === 200) {
        //         Alert('pagamento confirmado')
        //         router.push('/home')
        //         return
        //     } else {
        //         Alert('problema no pagamento')
        //     }
        // } catch (error) {
        //     Alert('problema no pagamento')
        // }
        router.push('/profile')
    }

    return (
        <View style={styles.container}>
            <Text>Payment page</Text>
            <Pressable onPress={handlePagamento} style={styles.buttonStyle}>
                    <Text>Pagar</Text>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonStyle: {
        backgroundColor: 'rgb(255, 135, 46)',
        padding: 10,
        width: '85%',
        alignItems: 'center',
        borderRadius: 10,
    }
})

