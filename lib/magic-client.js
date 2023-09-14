
import { Magic } from 'magic-sdk';

// const m = new Magic(process.env.MAGIC_API);


const createMagic = () =>{
    return (
        typeof window !== "undefined" && 
        new Magic(process.env.NEXT_PUBLIC_MAGIC_API)
    )
}


export const magic = createMagic();

