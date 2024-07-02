import React, { useEffect, useState } from "react";
import { View, Text, Linking, Button } from "react-native";
import queryString from 'query-string';
import { StyleSheet } from "react-native";
const useInitialURL = () => {
    const [url, setUrl] = useState(null);
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();
            if (initialUrl) {
                setUrl(initialUrl);
            }
            setProcessing(false);
        };

        getUrlAsync();
    }, []);

    return { url, processing };
};

export default function Home({ navigation }) {
    const { url: initialUrl, processing } = useInitialURL();
    const [code, setCode] = useState(null);

    const handleDeepLink = (url) => {
        if (url) {
            const parsedUrl = queryString.parseUrl(url);
            const codeFromUrl = parsedUrl.query.code;
            if (codeFromUrl) {
                console.log(`Code: ${codeFromUrl}`);
                setCode(codeFromUrl);
                navigation.navigate("About", { code: codeFromUrl });
            }
        }
    };

    useEffect(() => {
        if (!processing && initialUrl) {
            handleDeepLink(initialUrl);
        }
    }, [processing, initialUrl]);

    useEffect(() => {
        const handleURLChange = (event) => {
            handleDeepLink(event.url);
        };

        Linking.addEventListener('url', handleURLChange);

        return () => {
            Linking.removeAllListeners('url', handleURLChange);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Add Photos" onPress={()=>{
                Linking.openURL('https://api.instagram.com/oauth/authorize?client_id=831240245208477&redirect_uri=https://smart-control-app-backend.vercel.app&scope=user_profile,user_media&response_type=code');
            
            }} style={styles.Button}/>
            <Text>
                {processing ? "Processing..." : code ? `Code: ${code}` : "No code"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});