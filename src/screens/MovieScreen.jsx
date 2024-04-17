import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { useRoute } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import Cast from '../components/cast'
import MovieList from '../components/movieList'
import Loading from '../components/loading'
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviedb'

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == "ios"

const topMargin = ios ? "" : "mt-3"

export default function MovieScreen({navigation}) {
  const {params: item} = useRoute()
  // favori buton state'i
  const [isFavorite, toggleFavorite] = useState(false)
  // cast(oyuncular state'i)
  const [cast, setCast] = useState([])
  // benzer filmlerin state'i
  const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5])
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})

  let movieName = 'Ant-Man and the Wasp: Quantumania';


  useEffect(() => {
    // console.log(item.id)
    setLoading(true)
    getMovieDetails(item.id)
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    if(data) setMovie(data) // data varsa filmlerin tutulduğu state'i güncelle
    setLoading(false)
  }
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id)
    if(data && data?.cast) setCast(data?.cast)
  }
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id)
    if(data && data?.results) setSimilarMovies(data?.results)
  }
  

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false} className="flex-1 bg-neutral-900">
      {/* Back Button and Movie Poster */}
      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4"+topMargin}>
          <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.background} className="rounded-xl p-1">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> toggleFavorite(!isFavorite)}>
            <HeartIcon size="35" color={isFavorite ? theme.background : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        {
          loading ? (
            <Loading />
          ) : (
            <View>
              <Image 
                // source={require("../assets/moviePoster2.jpeg")} 
                source={{uri: image500(movie?.poster_path)}}
                style={{width, height:height*0.55}} />
              <LinearGradient 
                colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]} 
                style={{width, height: height*0.40}}
                start={{x:0.5, y:0}}
                end={{x:0.5, y:1}}
                className="absolute bottom-0"
              />
            </View>
          )
        }
      </View>

      {/* Movie Details */}
      <View style={{marginTop: -(height*0.09)}} className="space-y-3">
        {/* Title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>

        {/* Status, Release, Runtime */}
        {movie?.id ? (
           <Text className="text-neutral-400 font-semibold text-base text-center">
           {movie?.status} · {movie?.release_date?.split("-")[0]} · {movie?.runtime} min 
           </Text>
        ):(
          null
        )}       

        {/* Genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {
            movie?.genres?.map((genre, index)=> {
              let showDot = index+1 != movie?.genres?.length // · orta noktayı koşullu göster sonuncu kategorinin sağına nokta konmasın
              return (
                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                  {genre?.name}  {showDot ? "·" : null}
                </Text>
              )
            })
          }
          {/* <Text className="text-neutral-400 font-semibold text-base text-center">
            Action  ·
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Fantastic  ·
          </Text> */}
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>

      {/* Cast */}
      {cast?.length>0 && <Cast cast={cast} />}

      {/* Similar Movies */}
      {similarMovies?.length>0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}
    </ScrollView>
  )
}