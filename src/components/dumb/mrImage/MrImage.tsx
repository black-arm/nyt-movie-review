import { MrImageProps } from "@/model";
import { setParameter } from "@/utilities/set-parameter";
import Image from "next/image";

export default function MrImage({ src, width, height, alt }: MrImageProps){

    let newSrc = setParameter(src, '/images/no_photo_available.jpeg')
    let newWidth = setParameter(width, 210)
    let newHeight = setParameter(height, 140)
    let newAlt = setParameter(alt, 'image')

    return<div data-testid='image'>
        <Image loader={imageLoader} src={newSrc} width={newWidth} height={newHeight}  alt={newAlt}/>
    </div> 
}

const imageLoader = ({ src, width, quality }: any) => {
    return `${src}`
  }