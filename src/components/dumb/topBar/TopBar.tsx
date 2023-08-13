import MrImage from "../mrImage/MrImage";
import style from './TopBar.module.css'

export default function TobBar() {

    return <>
        <div data-testid='topBarBox' className={style.topBar}>
            <div>
                <MrImage src="/images/nyt_logo.png" alt="Logo" width={150} height={40}/>
            </div> 
        </div>
    </>
}