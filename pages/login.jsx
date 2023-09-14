import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/login.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { magic } from '@/lib/magic-client'

const Login = () => {

    const router  = useRouter()

    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() =>{

        function handleComplete(){
            setIsLoading(false)
        }

        router.events.on("routeChangeComplete", handleComplete)

        return () => {
            router.events.off("routeChangeComplete", handleComplete)
        }
    }, [router])


    const handleOnSignWithEmail = async (e) =>{
        e.preventDefault()
        if(email){
            setIsLoading(true)
            try{
                 const didToken =   await magic.auth.loginWithMagicLink({email: email})
                 if(didToken){
                      router.push("/")
                   
                 }

            }catch(er){
                console.log(er)
                setIsLoading(false)

            }
        }

    }

  return (
    <div className={styles.container}>   

    <Head>
        <title>Netflix SignIn</title>
    </Head>
    <header>
    <div className={styles.headerWrapper}>
        <a className={styles.logoLink}>
        <Image src={"/static/Netflix.svg"} width={300} height={64}/>
        </a>
    </div>
    </header>
    <main className={styles.main}>
    <div className={styles.mainWrapper}> 
    <h1 className={styles.signinHeader}>Sign In</h1>
        <input type='text' placeholder='Enter Your Email' className={styles.emailInput} onChange={(e) => setEmail(e.target.value)}/>
        <button className={styles.loginBtn} onClick={handleOnSignWithEmail}>
        { isLoading ? "Processing.." : "Sign In"}
        </button>
    </div>
       
    </main>
    </div>
  )
}

export default Login