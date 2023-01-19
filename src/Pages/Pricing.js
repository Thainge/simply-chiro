import styles from './Pricing.module.css';
import Card from '../Components/Card/Card';
import Fade from 'react-reveal/Fade';

function Pricing() {
    let costArr = [
        {
            name: 'lol1',
            cost: 19.99
        },
        {
            name: 'lol2',
            cost: 29.99
        },
        {
            name: 'lol3',
            cost: 59.99
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <Card />
            </div>
            <div className={styles.childContainer}>
                <div className={styles.fixedLines}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.papa}>
                    <Fade up distance={'1em'} delay={300}>
                        <h1 className={styles.contentHeader}>Pricing for families of all sizes.</h1>
                    </Fade>
                    <Fade up distance={'1em'} delay={500}>
                        <h1 className={styles.contentHeadText}>Always know what you'll pay.</h1>
                    </Fade>
                    <Fade up distance={'1em'} delay={800}>
                        <div className={styles.card}>
                            <h3 className={styles.header}>Pricing</h3>
                            <div className={styles.textBox}>
                                <div className={styles.text}>Straightforward payments for each type of appointment.</div>
                            </div>
                            <div className={styles.costsArr}>
                                {
                                    costArr.map((item, index) => (
                                        <div key={index} className={styles.item}>
                                            <div className={styles.title}>{item.name}</div>
                                            <div className={styles.cost}>${item.cost}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles.button}>Get Started ➔</div>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    )
}

export default Pricing;