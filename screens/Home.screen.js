import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { images } from "../assets/images";

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Upload your main photo</Text>
            <View style={styles.content}>
                <View style={styles.box}>
                    <TouchableOpacity>
                        <Image
                            source={images.addImage}
                            style={styles.image}
                            resizeMode="contain" />
                    </TouchableOpacity>
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
        backgroundColor: '#F1F1F1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 88,
        height: 88,
    },
});
