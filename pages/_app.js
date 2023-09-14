import { magic } from '@/lib/magic-client'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

    useEffect(  () =>{
      // async function getuser (){
      // const isLoggedIn = await magic.user.isLoggedIn()
      //     if(isLoggedIn){
      //       router.push("/")
          
      //     }else{
      //       router.push("/login")
        
      //     }
      // }

      // getuser();
    }, [])

    useEffect(() =>{

      function handleComplete(){
          setIsLoading(false)
      }

      router.events.on("routeChangeComplete", handleComplete)
      router.events.on("routeChangeError", handleComplete)

      return () => {
          router.events.off("routeChangeComplete", handleComplete)
          router.events.off("routeChangeError", handleComplete)

      }
  }, [router])


  return isLoading? <div>Loading...</div> : <Component {...pageProps} />
}
