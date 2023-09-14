import videosData from '../data/videos.json'


export const getCommonVideos = async (getQuery) =>{


    const YOUTUBE_API_KEY = process.env.API

    try{
        const BASE_URL = "youtube.googleapis.com/youtube/v3";
        const response = await fetch(
          `https://${BASE_URL}/${getQuery}&maxResults=25&key=${YOUTUBE_API_KEY}`)

          const data = await response.json()
         console.log("data", data)

            if(data?.error){
                console.log(data.error)
                return []
            }

            return data?.items.map(item =>{
                const id = item.id?.videoId || item.id;
                const snippet = item.snippet;
                return {
                    title: item.snippet.title,
                    imgUrl: item.snippet.thumbnails.high.url,
                    id,
                    description: snippet.description,
                    publishTime: snippet.publishedAt,
                    channelTitle: snippet.channelTitle,
                    statistics: item.statistics ? item.statistics : { viewCount: 0 },
                }
            })}catch(er){
                    console.log(er)
                    return []
            }
}

export const getVideo = (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}&type=video`;
    return getCommonVideos(URL);
  };


export const getYoutubeVideoById = (id) =>{

    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
    return getCommonVideos(URL)
}