import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Share } from 'react-native';
import { StackNavProps, StackScreens } from '../../../navigation';
import { MyIcon } from '../../component/MyIcon';
import { SubTitle } from '../../component/SubTitle';
import { Title } from '../../component/Title';
import { Divider } from '../../component/Divider';
import { NO_IMAGE } from '../../../constant';

const ScreenFullNews = (props: StackNavProps<StackScreens.FULL_NEWS>) => {
    //const navigation = props.navigation;
    const screenParams = props.route.params;

    const onReadFullNews = () => {
        Linking.openURL(screenParams.url);
    }
    const onShare = () => {
        Share.share({
            title: "Share news with",
            message: `${screenParams.title}\nRead full new here- ${screenParams.url}`,
            url: `${screenParams.url}`
        });
    }

    return (
        <View style={styles.main}>
            <ScrollView style={{ flex: 1 }}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: screenParams.urlToImage ?? NO_IMAGE }} />

                <View style={{ padding: 16 }}>
                    <View style={styles.options}>
                        <Title style={{ fontSize: 15 }}>
                            {screenParams.author ?? "Author- N/A"}
                        </Title>
                        <TouchableOpacity onPress={onShare}>
                            <MyIcon name="share-social-outline"
                                size={22} color="#242B2E" />
                        </TouchableOpacity>
                    </View>

                    <SubTitle style={{ fontSize: 12, marginTop: 5 }}>
                        {screenParams.source.name}
                    </SubTitle>
                    <SubTitle style={{ fontSize: 12, marginTop: 5 }}>
                        {new Date(screenParams.publishedAt).toDateString()}
                    </SubTitle>
                </View>

                <Divider size={1} />

                <View style={{ padding: 16 }}>
                    <Title style={{ lineHeight: 23 }}>
                        {screenParams.title}
                    </Title>
                    <SubTitle style={{ marginTop: 16, lineHeight: 25 }}>
                        {screenParams.description}
                        <SubTitle style={{ color: "#1B98F5" }} onPress={onReadFullNews}>
                            {` Click to read full news.`}
                        </SubTitle>
                    </SubTitle>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        width: "100%",
        height: 250,
        marginBottom: 5
    },
    options: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});

export default ScreenFullNews;