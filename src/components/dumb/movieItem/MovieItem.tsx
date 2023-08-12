import { MovieReview } from '@/model/movieReview'
import style from './MovieItem.module.css'
import Image from 'next/image'
import MrImage from '../mrImage/MrImage'

export default function MovieItem({ movie }: {movie?: MovieReview}){

  let src = movie?.multimedia?.src
  let width = movie?.multimedia?.width
  let height = movie?.multimedia?.height

  return <div data-testid='movieItem' className={style.movieItem}>
    <div data-testid='date'>{movie?.publication_date as string}</div>
    <div  data-testid='movie' className={style.movieInfo}>
      <h2 className={style.noMargin}>{movie?.headline}</h2>
      <h4  data-testid='reviewer' className={style.noMargin}>By {movie?.byline}</h4>
      <p className={style.noMargin}>{movie?.summary_short}</p>
    </div>
    <div data-testid='image'>
      <MrImage src={src} width={width} height={height} alt='film Image'/>
    </div>
  </div>
}
