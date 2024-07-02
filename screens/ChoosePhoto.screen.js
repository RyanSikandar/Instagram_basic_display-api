import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { getNextPictures } from "../api/api_calls";

export default function ChoosePhoto({ route, navigation }) {
    const { accessToken, chooseAPhoto } = route.params;
    const [pictures, setPictures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [next, setNext] = useState("");

    const fetchPictures = async (token, next) => {
        try {
            setLoading(true);
            const response = await getNextPictures(token, next);
            console.log("API Response:", response);
            if (response.paging && response.paging.cursors) {
                setNext(response.paging.cursors.after);
            } else {
                setNext(null);
            }
            if (Array.isArray(response.data.data)) {
                setPictures(prevPictures => [...prevPictures, ...response.data.data]);
            } else {
                console.error("Expected response.data to be an array");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching pictures:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (accessToken) {
            setPictures([]);
            fetchPictures(accessToken, '');
        } else {
            setPictures([]);
        }
    }, [accessToken]);

    const handleEndReached = () => {
        if (next && !loading) {
            fetchPictures(accessToken, next);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.box}>
                    <FlatList
                        numColumns={2}
                        data={pictures}
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.5}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                chooseAPhoto(item.media_url);
                                navigation.goBack();
                            }}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.media_url }}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                        ListFooterComponent={loading && <ActivityIndicator size="large" color="black" animating={loading} />}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
       
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
      
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        width: "100%",
        backgroundColor: "#F1F1F1",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
       
    },
});
