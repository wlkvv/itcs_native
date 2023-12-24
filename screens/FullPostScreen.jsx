import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import {ScrollView, View} from "react-native";
import {Loading} from "../components/Loader";
import {axiosInstance} from "../API";
import {DOMEN} from "../consts";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
`

const PostDetails = styled.View`
  flex-direction: column;
`

const PostText = styled.Text`
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
`



const FullPostScreen = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()

    const { id, name } = route.params

    const fetchGroup = () => {
        navigation.setOptions({
            name,
        })

        axiosInstance
            .get("/services/" + id)
            .then(({data}) => {
                setData(data)
            })
            .catch((err) => {
                console.log(err)
                alert("Ошибка, не удалось получить статью")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(fetchGroup, [])

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Loading />
            </View>
        )
    }

    const image = `http://${DOMEN}/api/services/${data.id}/image/`

    return (
        <ScrollView style={{ padding: 20 }}>
            <PostImage source={{uri: image}} />
            <PostDetails>
                <PostText>
                    Название: {data.name}
                </PostText>
                <PostText>
                    Описание: {data.description}
                </PostText>
                <PostText>
                    Цена: {data.price}
                </PostText>
                <PostText>
                    Срок выполнения: {data.time}
                </PostText>
                <PostText>
                    Срок поддержки: {data.due_date}
                </PostText>
            </PostDetails>
        </ScrollView>
    )
}

export default FullPostScreen;