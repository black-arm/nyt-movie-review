import { MovieReview } from '@/model/movieReview'
import style from './MovieItem.module.css'
import Image from 'next/image'

export default function MovieItem({ movie }: {movie?: MovieReview}){

  let src = '/images/no_photo_available.jpeg', width = 250, height = 250;
  
  if(movie?.multimedia?.src){
    src = movie.multimedia.src
  }

  if(movie?.multimedia?.width){
    width = movie.multimedia.width;
  }

  if(movie?.multimedia?.height){
    height = movie.multimedia?.height;
  }


  return <div data-testid='movieItem' className={style.movieItem}>
    <div data-testid='date'>{movie?.publication_date}</div>
    <div  data-testid='movie' className={style.movieInfo}>
      <h2 className={style.noMargin}>{movie?.headline}</h2>
      <h4  data-testid='reviewer' className={style.noMargin}>By {movie?.byline}</h4>
      <p className={style.noMargin}>{movie?.summary_short}</p>
    </div>
    <div data-testid='image'>
      <Image src={src} width={width} height={height} loader={({src}) => src} alt='film Image'/>
    </div>
  </div>
}
