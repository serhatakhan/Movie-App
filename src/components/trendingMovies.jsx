import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../api/moviedb';

const {width, height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
    const navigation = useNavigation()

    const handleClick = (item) => {
        // movie screen'e giderken item'ı da yolla
        navigation.navigate("Movie", item)
    }

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5 font-medium">Trending</Text>
      <Carousel 
      data={data}
      renderItem={({item})=> <MovieCard item={item} handleClick={handleClick} />}
      firstItem={2} //kaçıncıdan başlasın
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width*0.62}
      slideStyle={{display: "flex", alignItems: "center"}}
      />
    </View>
  )
}

const MovieCard = ({item, handleClick}) => {
    //console.log('item.poster_path: ', item.poster_path);

    return (
      <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
        <Image
          // source={require('../assets/moviePoster1.jpg')}
          source={{uri: image500(item.poster_path)}}
          style={{
            width: width * 0.6,
            height: height * 0.4,
          }}
          className="rounded-3xl"
        />
      </TouchableWithoutFeedback>
    );
  };