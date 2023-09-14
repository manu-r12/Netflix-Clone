import  Modal from 'react-modal'
import { useRouter } from 'next/router'
import styles from '../../styles/video.module.css'
import clsx from 'classnames'
import { getYoutubeVideoById } from '@/lib/videos'
import NavBar from '@/components/nav/navbar'

Modal.setAppElement('#__next')


export async function getStaticProps(context) {
  console.log(context)
  const videoId = context.params.videoId

    const videoArray  = await getYoutubeVideoById(videoId)
   
    return {
      props: {
        video: videoArray.length > 0 ? videoArray[0] : {},
      },
      revalidate: 10,
    };
  }

export const getStaticPaths = async () => {
    const videoId = "Zh0Fh124vAk"
      return {
        paths: [
          {
            params: { videoId  },
          },
        ],
        fallback: "blocking", 
      }
  }

const Video = ({video}) =>{

        
      const {
        title,
        publishTime,
        description,
        channelTitle,
        statistics: { viewCount } = { viewCount: 0 },
      } = video;
        console.log("first", video)

      const router = useRouter()

    return (

    <div className={styles.container}>
    <NavBar/>
      <Modal
          isOpen={true}
          onRequestClose={() =>{router.back()}}
          overlayClassName={styles.overlay}
          className={styles.modal}
          contentLabel="Example Modal"
        >
         <div>
            <iframe
                id="ytplayer"
                type="text/html"
                width="100%"
                className={styles.videoPlayer}
                height="360"
                src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                frameBorder="0"
              >
              </iframe>

<div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </Modal>
    </div>)
}



export default Video