import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, TextInput, FlatList
} from 'react-native'
import { AppContext } from '../../scripts/appContext';
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'



export default home = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)
    const { playingNow, setPlayingNow } = useContext(AppContext)
    const [searchText, setSearchText] = useState('');
    const [dataArtists, setDataArtists] = useState([])
    const [dataAlbums, setDataAlbums] = useState([])
    const [maisOuvidas, setMaisOuvidas] = useState([])


    const getDataArtistas = async () => {
        try {
            const response = await fetch('http://localhost:8000/artista');
            if (response.status === 200) {
                const data = await response.json()
                setDataArtists(data)
                return
            } else {
                Alert('problema ao obter artistas')
            }
        } catch (error) {
            Alert('problema')
        }
    }
    const getDataAlbums = async () => {
        try {
            const response = await fetch('http://localhost:8000/album');
            if (response.status === 200) {
                const dataalbums = await response.json()
                setDataAlbums(dataalbums)
                return

            } else {
                Alert('problema ao obter artistas')
            }
        } catch (error) {
            Alert('problema')
        }
    }
    const getMaisOuvidas = async () => {
        try {
            const response = await fetch('http://localhost:8000/album/mais-ouvidas');
            if (response.status === 200) {
                const dataMusicas = await response.json()
                setMaisOuvidas(dataMusicas)
                return

            } else {
                Alert('problema ao obter artistas')
            }
        } catch (error) {
            Alert('problema')
        }
    }
    useEffect(() => {
        getDataArtistas()
        getDataAlbums()
        getMaisOuvidas()
    }, [])

    // const filteredAlbums = dataAlbums.filter(album =>
    //     album.title.toLowerCase().includes(searchText.toLowerCase())
    // );

    // const filteredArtists = dataArtists.filter(artist =>
    //     artist.name.toLowerCase().includes(searchText.toLowerCase())
    // );

    const playMusic = (music) => {
        setPlayingNow(music)
        router.push('/player')
        return
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for music or artists"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
                <View>
                    <Ionicons name="person-circle-outline" size={32} color="white" onPress={() => router.push('/profile')} style={styles.iconQR} />
                </View>
            </View>
            <Text style={styles.sectionTitle}>Albums</Text>
            <View>

                {dataAlbums ?
                    <FlatList
                        data={dataAlbums}
                        horizontal
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Image source={{ uri: item.coverImageUrl }} style={styles.image} />
                                <Text style={styles.cardText}>{item.title} - {item.releaseYear}</Text>
                            </View>
                        )}
                    />
                    : <ActivityIndicator />}
            </View>
            <View style={styles.meio}>
                <Text style={styles.sectionTitle}>Artistas</Text>
                <Text style={styles.sectionTitle}>Mais Ouvidas</Text>
            </View>

            <View style={styles.meio}>
                <View>
                    {dataArtists ?
                        <FlatList
                            data={dataArtists}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.card2}>
                                    <Image source={{ uri: item.imageUrl }} style={styles.image2} />
                                    <Text style={styles.cardText2}>{item.nome}</Text>
                                </View>
                            )}
                        />
                        : <ActivityIndicator />}
                </View>
                <View>
                    {maisOuvidas ?
                        <FlatList
                            data={maisOuvidas}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.card3}>
                                    <Text style={styles.cardText2}>{item.titulo} - {item.artistum.nome}</Text>
                                    <Ionicons name="play-circle-outline" size={32} color="#FF8746" onPress={() => playMusic(item)} style={styles.iconPlayer} />
                                </View>
                            )}
                        />
                        : <ActivityIndicator />}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    },
    card: {
        alignItems: 'center',
        margin: 15
    },
    card2: {
        alignItems: 'center',
        margin: 5,
        flexDirection: 'row'
    },
    card3: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    image2: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    cardText: {
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
    },
    cardText2: {
        fontSize: 12,
        textAlign: 'center',
        marginLeft: 10
    },
    iconQR: {
        alignSelf: 'flex-end',
        margin: 6
    },
    iconPlayer: {
        alignSelf:'flex-end'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    meio: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

});
