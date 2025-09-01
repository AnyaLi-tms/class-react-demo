import HeartLogo from '../../assets/react.svg'
import styles from  './index.module.css'

function Hello({name}) {
  return (
    <>
      <img className={styles.heartLogo} src={HeartLogo} alt="Heart Logo" />
      <h1>Hello World! {name}</h1>
    </>
  )
}

export default Hello
