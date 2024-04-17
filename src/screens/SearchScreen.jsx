import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline';
import Loading from '../components/loading';
import {debounce} from 'lodash';
import { image185, searchMovies } from '../../api/moviedb';

const {width, height} = Dimensions.get('window');

export default function SearchScreen({navigation}) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  let movieName = 'Ant-Man and the Wasp: Quantumania';

  const handleSearch = value => {
    // console.log(value)
    if(value && value.length>2){
      setLoading(true)
      searchMovies({
        // bu parametreleri api'den aldık. arama yapmak için bunlar gerekli
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      })
      .then(data => {
        setLoading(false)
        if (data && data.results) setResults(data.results);
      })
    }else {
      setLoading(false)
      setResults([])
    }
  }

  // inputa her yazı girildiğinde api'ye istek atmak mantıklı olmadığından bu yola gidiyoruz
  // yazmayı bırakınca istek atılacak. daha performanslı olacak !!
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])


  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
       <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          placeholder={'Search Movie'}
          placeholderTextColor={'lightgray'}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* results */}
      {
        loading ? (
          <Loading />
        ) : (
          results.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}} className="space-y-3">
                <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
    
                <View className="flex-row justify-between flex-wrap">
                    {results.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('Movie', item)}>
                        <View className="space-y-2 mb-4">
                            <Image
                            className="rounded-3xl"
                            source={{uri: image185(item?.poster_path)}}
                            // source={require('../assets/moviePoster2.jpeg')}
                            style={{width: width * 0.44, height: height * 0.3}}
                            />
                            <Text className="text-neutral-300 ml-1">
                            {item?.title.length > 22
                                ? item?.title.slice(0, 22) + '...'
                                : item?.title}
                            </Text>
                        </View>
                        </TouchableWithoutFeedback>
                    );
                    })}
                </View>
            </ScrollView>
            ) : (
                <View className="flex-row justify-center">
                    <Image
                        source={require('../assets/popcorn.png')}
                        className="h-96 w-96 mt-10 rounded-md"/>
                </View>
            )
        )
      }
    </SafeAreaView>
  )
}