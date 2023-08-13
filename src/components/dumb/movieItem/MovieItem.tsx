import style from './MovieItem.module.css'
import MrImage from '../mrImage/MrImage'
import { MovieItemProps } from '@/model'

export default function MovieItem({ movie, clickReviewer }: MovieItemProps){

  let src = movie?.multimedia?.src
  let width = movie?.multimedia?.width
  let height = movie?.multimedia?.height

  function onClickReviewer(){
    if(!movie?.byline || !clickReviewer){
      return;
    }
    clickReviewer(movie.byline)
  }

  return <div data-testid='movieItem' className={style.movieItem}>
    <div data-testid='date'>{movie?.publication_date as string}</div>
    <div  data-testid='movie' className={style.movieInfo}>
      <h2 className={style.noMargin}>{movie?.headline}</h2>
      <h4  data-testid='reviewer' className={style.noMargin}>By <span onClick={onClickReviewer}>{movie?.byline}</span></h4>
      <p className={style.noMargin}>{movie?.summary_short}</p>
    </div>
    <div data-testid='image'>
      <MrImage src={src} width={width} height={height} alt='film Image'/>
    </div>
  </div>
}
