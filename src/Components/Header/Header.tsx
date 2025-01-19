import s from './Header.module.css'
import headerLogo from '../../assets/vkLogo.svg'

 const Header = () => {
  return (
    <header>
        <div className={s.wrapper}>
            <div className={s.title__block}>
                <h1 className={s.title}>Hi VK!</h1>
                <img src={headerLogo} alt='VK logo' />
            </div>
            <div className={s.sort__block}>
                <button>sort</button>
                <button>order</button>
            </div>
        </div>
    </header>
  )
}

export default Header
