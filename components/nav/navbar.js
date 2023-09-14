import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { magic } from "@/lib/magic-client";

const NavBar = () => {


    const [showDropdown, setShowDropdown] = useState(false)
    const [email , setEmail] = useState("")

        const router = useRouter()


         useEffect(  () =>{

          const  getUser =  async () =>{
            try{

              const { email } = await  magic.user.getMetadata()
              if(email){
                setEmail(email)
                console.log(email)
              }
     
            
              
          }catch(er){
            console.log(er)
          }
          }
       getUser()

      }, [])

   const handleOnClickHome = (e) =>{
        e.preventDefault()
        router.push("/")
    }


    const handleOnClickMyList = (e) =>{
        e.preventDefault()
        router.push("my-list")

    }

    const handleSignOut = async (e) =>{
        e.preventDefault()

        try{

          await magic.user.logout()
          router.push("/login")
        }catch(er){
            console.log("somthing went wrong :", er)
          router.push("/login")

        }
    }

     


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
        <Image src={"/static/Netflix.svg"} width={200} height={44}/>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
          <li className={styles.navItem2} onClick={handleOnClickMyList} >My List</li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={() => setShowDropdown(!showDropdown)}>
              <p className={styles.username}>{email}</p>
            </button>

          { showDropdown && <div className={styles.navDropdown}>
              <div>
            <a  onClick={handleSignOut} className={styles.linkName}>Sign out</a>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>}
          </div>
        </nav>
      </div>
    </div>
  );
};



export default NavBar