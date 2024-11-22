import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, Slider, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AppContext } from '../../scripts/appContext';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons'

export default player = () => {
    const { playingNow, setPlayingNow } = useContext(AppContext)
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(playingNow.duracao);


    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#FF8746" />
            ) : (
                <>
                    <Image source={{ uri: playingNow.album.coverImageUrl }} style={styles.coverImage} />
                    <Text style={styles.songTitle}>{playingNow.titulo}</Text>
                    <Text style={styles.artistName}>{playingNow.artistum.nome}</Text>
                    <Text style={styles.albumTitle}>{playingNow.album.title}</Text>

                    <View style={styles.controls}>
                        <View style={styles.card3}>
                            <Text style={styles.timeText}>
                                {Math.floor(position)} / {Math.floor(duration)}
                            </Text>
                            <Ionicons name="play-circle-outline" size={32} color="#FF8746" style={styles.iconPlayer} />
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    coverImage: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    songTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    artistName: {
        fontSize: 18,
        color: '#777',
        marginBottom: 10,
    },
    albumTitle: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 20,
    },
    timeText: {
        fontSize: 14,
        color: '#777',
        marginBottom: 20,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playPauseButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF8746',
    },
    card3: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});