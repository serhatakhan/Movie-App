import {Dimensions, View, Text, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {styles} from '../theme';
import {useNavigation} from '@react-navigation/native';
import { image185 } from '../../api/moviedb';

const {width, height} = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}) {
  let movieName = 'Ant-Man and the Wasp:Quantumania';
  const navigation = useNavigation();

    return (
      <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-medium">{title}</Text>
          {
            !hideSeeAll && (
              <TouchableOpacity>
                <Text style={styles.text} className="text-lg">See All</Text>
              </TouchableOpacity>
            )
          }
        </View>

        {/* Movie row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}>
          {data?.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}>
                <View className="space-y-1 mr-4">
                  <Image
                    // source={require('../assets/moviePoster2.jpeg')}
                    source={{uri: image185(item?.poster_path)}}
                    className="rounded-3xl"
                    style={{width: width * 0.33, height: height * 0.22}}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {/* filmin adının uzunluğu 15 den büyükse ilk 15'i al devamına 3 nokta koy değilse filmin tam adını koyabilirsin */}
                    {item?.title?.length>15 ? item?.title?.slice(0,15)+"..." : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
    );
}