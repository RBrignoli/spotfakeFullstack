import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native'
import { AppContext } from '../../scripts/appContext';



export default profile = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)
    console.log(userInfo)

    return (
        <View style={styles.container}>
            {userInfo ?
                <View>
                    <Image
                        style={styles.logo}
                        source={{ uri: 'https://www.jet.ir/uploadFiles/avatar/noprofile.png' }}
                    />
                    <Text>Usuario</Text>
                    <Text>Email</Text>
                    <Text>Senha</Text>
                    <Text>Status Pagamento</Text>
                </View> :
                <ActivityIndicator />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
})

