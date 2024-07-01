import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, Button } from "react-native";
import { getAccessToken } from "../api/api_calls";
import { images } from "../assets/images";

export default function About({ route, navigation }) {
    const [photo, setPhoto] = useState(null); // Default to null
    const { code } = route.params;
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await getAccessToken(code);
                console.log(response, "response");
                setAccessToken(response.access_token);
            } catch (error) {
                console.error("Error fetching access token:", error);
            }
        };

        fetchAccessToken();
    }, [code]);

    const handleChoosePhoto = (selectedPhoto) => {
        setPhoto({ uri: selectedPhoto }); 
    };

    return (
        <View style={styles.container}>
            {accessToken ? (
                <>
                    <Text style={styles.headerText}>Upload your main photo</Text>
                    <Text>Access Token: {accessToken}</Text>
                    <View style={styles.content}>
                        <View style={styles.box}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("ChoosePhoto", {
                                        accessToken: accessToken,
                                        chooseAPhoto: handleChoosePhoto,
                                    })
                                }
                            >
                                <Image
                                    source={photo ? photo : images.addImage}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button title="Reset Photo" onPress={()=>[
                        setPhoto(null)
                    ]}/>
                    <Button title="Done" onPress={()=>[
                        navigation.navigate("Home")
                    ]}/>
                </>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Loading...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        width: 235,
        height: 330,
        backgroundColor: "#F1F1F1",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 235,
        height: 330,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
