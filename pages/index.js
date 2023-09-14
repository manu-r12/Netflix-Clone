import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner/banner'
import NavBar from '@/components/nav/navbar'
import Card from '@/components/card/card'
import SectionCards from '@/components/card/sectionCard'
import { getVideo, getVideos } from '@/lib/videos'

// the data within this function is rendered server side 
export async function getServerSideProps() {
  const trailers =  await getVideo("netflix trailer")
  const anime =  await getVideo("anime")
  const disney =  await getVideo("disney movies trailer")
  const tvShows =  await getVideo("Netflix stranger things , winx the fate saga more")

  return {
    props: {trailers, anime, tvShows , disney}
  }
}


export default function Home({trailers, anime, tvShows, disney}) {

  return (
    <div>
      {/* <h1>Hello </h1> */}
      <NavBar username="manulovesearth@gmail.com"/>
      <Banner
       videoId = "dfXRud1AIiw"
        title="Fate: The Winx Saga"
        subTitle="Welcome to the magical world"
        imgUrl= "/static/fate.jpg"
      />
        <SectionCards videos={disney} title="Disney" size="large"/>     
        <SectionCards videos={trailers} title="Trailers" size="medium"/>     
        <SectionCards videos={anime} title="Anime" size="medium"/>     
        <SectionCards videos={tvShows} title="TV Shows Related" size="small"/>     
    </div>
  )
}
