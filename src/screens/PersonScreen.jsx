import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../theme';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation, useRoute} from '@react-navigation/native';
import {HeartIcon} from 'react-native-heroicons/solid';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../../api/moviedb';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {
  const {params: item} = useRoute()
  // favori buton state'i
  const [isFavorite, toggleFavorite] = useState(false);
  // aktörün filmleri ile ilgili state
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();


  useEffect(() => {
    setLoading(true)
    getPersonDetails(item.id)
    getPersonMovies(item.id)
  }, [item])

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id)
    if(data) setPerson(data)
    setLoading(false)
  }

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id)
    if(data?.cast) setPersonMovies(data?.cast)
    setLoading(false)
  }
  

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>
      {/* Back button */}
      <SafeAreaView
        className={
          ' z-20 w-full flex-row justify-between items-center px-4' +
          verticalMargin
        }>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1">
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
          <HeartIcon size="35" color={isFavorite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person Detail */}
      {
        loading ? (
          <Loading />
        ) : (
          <View>
            <View
              className="flex-row justify-center"
              style={{
                shadowColor: 'gray',
                shadowRadius: 40,
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 1,
              }}>
              <View className="items-center rounded-full overflow-hidden h-72 w-72 border border-neutral-500">
                <Image
                  source={{uri: image342(person?.profile_path)}}
                  // source={require('../assets/cast1.webp')}
                  style={{height: height * 0.45, width: width * 0.73}}
                />
              </View>
            </View>

            <View className="mt-6">
              <Text className="text-3xl text-white font-bold text-center">
                {person?.name}
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                {person?.place_of_birth}
              </Text>
            </View>

            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                <View className="border-r-2 border-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Gender</Text>
                  <Text className="text-neutral-300 text-sm">
                   {person?.gender === 1 ? "Female" : "Male"}
                  </Text>
                </View>
                <View className="border-r-2 border-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Birtday</Text>
                  <Text className="text-neutral-300 text-sm">
                    {person?.birthday}
                  </Text>
                </View>
                <View className="border-r-2 border-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Known for</Text>
                  <Text className="text-neutral-300 text-sm">
                  {person?.known_for_department}
                  </Text>
                </View>
                <View className="px-2 items-center">
                  <Text className="text-white font-semibold">Popularity</Text>
                  <Text className="text-neutral-300 text-sm">
                    {person?.popularity?.toFixed(2)} %
                  </Text>
                </View>
              </View>

              <View className="my-6 mx-4 space-y-2">
                <Text className="text-white text-lg font-medium">Biography</Text>
                <Text className="text-neutral-400 tracking-wide">
                  {person?.biography || "N/A"}
                </Text>
              </View>

              {/* Actor Movies */}
              <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />

          </View>
        )
      }
    </ScrollView>
  );
}
