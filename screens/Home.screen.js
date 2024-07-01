import React, { useEffect, useState } from "react";
import { View, Text, Linking } from "react-native";
import queryString from 'query-string';

const useInitialURL = () => {
    const [url, setUrl] = useState(null);
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();
            setTimeout(() => {
                setUrl(initialUrl);
                setProcessing(false);
            }, 1000);
        };

        getUrlAsync();
    }, []);

    return { url, processing };
};

export default function Home({ navigation }) {
    const { url: initialUrl, processing } = useInitialURL();
    const [code, setCode] = useState(null);

    useEffect(() => {
        const fetchCode = async () => {
            if (initialUrl) {
                const parsedUrl = queryString.parseUrl(initialUrl);
                const codeFromUrl = parsedUrl.query.code;
                if (codeFromUrl) {
                    console.log(`Code: ${codeFromUrl}`);
                    setCode(codeFromUrl);
                    navigation.navigate("About", { code: codeFromUrl });
                }
            }
        };

        fetchCode();
    }, [initialUrl]);




    return (
        <View>
            <Text>
                {processing ? "Processing..." : code ? `Code: ${code}` : "No code"}
            </Text>
        </View>
    );
}
