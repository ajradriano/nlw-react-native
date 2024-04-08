import { Image, View, ImageBackground, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "@/styles/colors";
import { useState } from "react";
import { QRCode } from "@/components/qrcode";
import { BadgeStorage } from "@/storage/badge-storage";
import { MotiView } from "moti";

type Props = {
    data: BadgeStorage
    image?: string
    onChangePhoto?: () => void;
    onExpandQRCode?: () => void;
}

export function Credential({
    data,
    onChangePhoto,
    onExpandQRCode
}: Props) {
    const { height } = useWindowDimensions()
    return (
        <MotiView
            from={{
                opacity: 0,
                translateY: -height
            }}
            animate={{
                opacity: 1,
                translateY: 0

            }}
            transition={{
                type: "spring",
                damping: 40
            }}
            className="w-full self-stretch items-center">
            <Image source={require('@/assets/ticket/band.png')} className="w-24 h-52 z-10" />
            <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 rounded-2xl mx-3 -mt-5">
                <ImageBackground source={require("@/assets/ticket/header.png")} className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden">
                    <View className="w-full flex-row items-center justify-between">
                        <Text className="text-zinc-50 text-sm font-bold">
                            {data.eventTitle}
                        </Text>
                        <Text className="text-zinc-50 text-sm font-bold">
                            #{data.id}
                        </Text>

                    </View>
                </ImageBackground>
                {data.image ? (
                    <TouchableOpacity activeOpacity={.7} onPress={onChangePhoto}>
                        <Image source={{ uri: data.image }} className="w-36 h-36 rounded-full -mt-24" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={.8}
                        className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
                        onPress={onChangePhoto}>
                        <MaterialIcons name="add-a-photo" size={32} color={colors.green[400]} />
                    </TouchableOpacity>
                )}

                <Text className="font-bold text-xl text-white mt-4">
                    {data.name}
                </Text>
                <Text className="font-bold text-sm text-zinc-400">
                    {data.email}
                </Text>
                <TouchableOpacity activeOpacity={.8} className="my-6" onPress={onExpandQRCode}>
                    <View className="my-6 flex items-center justify-center content-center">
                        <QRCode value={data.checkInURL} size={100} />
                        <MotiView
                            from={{
                                scale: 0.95
                            }}
                            animate={{
                                scale: 1
                            }}
                            transition={{
                                loop: true,
                                type: "timing",
                                duration: 1000
                            }}>
                            <Text className="font-bold text-zinc-400 mt-2">Ampliar</Text>
                        </MotiView>
                    </View>
                </TouchableOpacity>
            </View>
        </MotiView>
    )
}