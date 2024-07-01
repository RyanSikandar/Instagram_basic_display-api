import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { images } from "../assets/images";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { getPictures } from "../api/api_calls";
import { getNextPictures } from "../api/api_calls";

export default function ChoosePhoto({ route,navigation }) {
    const { accessToken } = route.params;
    const { chooseAPhoto } = route.params;
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        console.log(accessToken, "accessToken");
        //Fetching pictures
        const fetchPictures = async () => {
            try {
                const response = await getPictures(accessToken);
                setPictures(response);
            } catch (error) {
                console.error("Error fetching pictures:", error);
            }
        };
        fetchPictures();

    }, []);




    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Upload your main photo</Text>
            <View style={styles.content}>
                <View style={styles.box}>
                    <FlatList
                    numColumns={3}
                        data={pictures}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                console.log(item.media_url, "item");
                                chooseAPhoto(item.media_url)
                                //go back
                                navigation.goBack()
                                ;
                                
                                }}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.media_url }}
                                />
                            </TouchableOpacity>
                        )}
                       key={(item) => item.id}
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
        width: 200,
        height: 200,
    },
});
