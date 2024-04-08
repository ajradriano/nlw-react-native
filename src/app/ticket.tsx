import { StatusBar, View, ScrollView, TouchableOpacity, Text, Alert, Modal, Share, useWindowDimensions } from "react-native";
import { useState } from "react";
import Header from "./header";
import { Credential } from "@/components/credential";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import * as ImagePicker from "expo-image-picker";
import { QRCode } from "@/components/qrcode";
import { useBadgeStorage } from "@/storage/badge-storage";
import { Redirect } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {

    const [expandQRCode, setExpandQRCode] = useState(false)
    const badgeStorage = useBadgeStorage()
    const { height} = useWindowDimensions()

    async function share() {
        try {
            if (badgeStorage.data?.checkInURL) {
                await Share.share({
                    message: badgeStorage.data.checkInURL
                })
            }

        } catch (error) {
            console.log(error)
            Alert.alert('Erro', 'Não foi possível compartilhar')
        }
    }

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4]
            })
            if (result.assets) {
                badgeStorage.updateAvatar(result.assets[0].uri)
            }
        } catch (error) {
            Alert.alert('Erro com a Foto', 'Não foi possível selecionar esta imagem.')
        }
    }

    if (!badgeStorage.data?.checkInURL) {
        return <Redirect href='/' />
    }

    return (
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle="light-content" />
            <Header title="Minha Credencial" />
            <ScrollView
                className="-mt-28 -z-10"
                contentContainerClassName="px-8 pb-8"
                showsVerticalScrollIndicator={false}>
                <Credential
                    data={badgeStorage.data}
                    onChangePhoto={handleSelectImage}
                    onExpandQRCode={() => setExpandQRCode(true)} />
                <MotiView
                    from={{
                        opacity: 0,
                        translateY: height * 2
                    }}
                    animate={{
                        opacity: 1,
                        translateY: 0
                    }}
                    transition={{
                        type:'timing',
                        duration: 3000
                    }}
                    className="mt-6">
                    <Button title="Compartilhar" onPress={share} />
                    <View className="w-20 mt-6 self-center">
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => badgeStorage.remove()}>
                            <Text className="text-zinc-400 self-center"> Sair</Text>
                        </TouchableOpacity>
                    </View>
                </MotiView>

            </ScrollView>
            <Modal visible={expandQRCode} statusBarTranslucent>
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <QRCode value="Adriano Rodrigues" size={300} />
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => setExpandQRCode(false)}>
                        <View className="flex items-center justify-center">
                            <Text className="text-base text-zinc-400 text-center mt-5">
                                <FontAwesome name="close" size={24} color={colors.gray[300]} />
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}