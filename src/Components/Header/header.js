import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContextFunction } from "../../Context/contextProvider";
import styles from './header.module.css';

function Header() {
    const obj = ContextFunction();
    const { user, setUser } = obj;

    let NODE_URL = 'https://simply-chiro.herokuapp.com';

    const checkAuthStatus = async () => {
        const response = await fetch(`${NODE_URL}/auth/login/success`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        });
        const data = await response.json();
        let userEmail = data.user.email.split('@')[0];
        const readyData = {
            success: data.success,
            email: userEmail
        }
        setUser(readyData);
    }

    useEffect(() => {
        checkAuthStatus();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.navContainer}>
                <Link to={'/'} className={`${styles.mainText} ${styles.link}`}>
                    Sked
                </Link>
                <div className={styles.navBar}>
                    <Link to='/' className={styles.link}>Home</Link>
                    <Link to='/pricing' className={styles.link}>Pricing</Link>
                    <Link to='/contact' className={styles.link}>Contact</Link>
                    {
                        user.success ? <Link to='/dashboard' className={styles.link}>Dashboard</Link> : <></>
                    }
                </div>
                {
                    user.success
                        ? <a href={'https://simply-chiro.herokuapp.com/auth/logout'} className={`${styles.signIn} ${styles.link}`}>
                            Sign Out
                        </a>
                        : <a href={'https://simply-chiro.herokuapp.com/auth/google'} className={`${styles.signIn} ${styles.link}`}>
                            Sign In
                        </a>
                }
            </div>
        </div>
    )
}

export default Header;