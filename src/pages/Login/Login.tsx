import styles from "./Login.module.css";

interface Props {
    //declare props here
}

const Login = (props: Props) => {
    return (
        <div className={styles.loginWrapper}>
            <h1>This is the login page</h1>
        </div>
    )
}

export default Login
