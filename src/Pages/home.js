import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ContextFunction } from "../Context/contextProvider";
import styles from './home.module.css';
import Fade from 'react-reveal/Fade';

function HomePage() {
    const obj = ContextFunction();
    const { user } = obj;

    let NODE_URL = 'https://simply-chiro.herokuapp.com';

    const [youtubeID] = useState('CFCUiygtUww')

    return (
        <div className={styles.relative}>
            <div className={styles.fixedLines}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>

            {/* Header */}
            <div className={styles.headerContainer}>
                <div className={styles.headerContainerChild}>
                    <Fade up distance={'.5em'} delay={100}>
                        <div className={styles.headerText}>
                            We Help You Get Out Of Pain
                        </div>
                    </Fade>
                    <Fade up distance={'1em'} delay={600}>
                        <div className={styles.headSmallText}>
                            You get back to doing the things you love.
                            You deserve a happy and a healthy life, not one controlled by pain and discomfort.
                            Gentle Chiropractic Care for Moms, Dads, and Kids.
                        </div>
                        <div className={styles.start}>
                            {
                                user.success
                                    ? <Link to={'/schedule'} className={styles.startButton}>Schedule Online ➔</Link>
                                    : <a href={`${NODE_URL}/auth/google`} className={styles.startButton}>Schedule Online ➔</a>
                            }
                        </div>
                    </Fade>
                    <div className={styles.cardContainer}>
                        <Fade up distance={'2em'} delay={1000}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>Less Pain</div>
                                <div className={styles.cardText}>Dr. Atkin is amazing at helping people get rid of back pain, neck pain, and headaches.</div>
                            </div>
                        </Fade>
                        <Fade up distance={'2em'} delay={1200}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>More Energy</div>
                                <div className={styles.cardText}>Stop pain from draining energy from your body and making you feel worn out before you wake up.</div>
                            </div>
                        </Fade>
                        <Fade up distance={'2em'} delay={1400}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>Healthier Life</div>
                                <div className={styles.cardText}>We address the underlying problems that keep you from functioning your best.</div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>


            <div className={styles.container}>
                <div className={styles.childContainer}>
                    <div className={styles.darkOverlay}></div>

                    {/* section 1 */}
                    <div className={styles.contentContainer}>
                        <Fade left delay={100} distance={'1em'}>
                            <h3 className={styles.contentHeadText}>Solutions</h3>
                        </Fade>
                        <Fade left delay={200} distance={'1em'}>
                            <h1 className={styles.contentHeader}>You deserve a happy and a healthy life, not one controlled by pain and discomfort.</h1>
                        </Fade>
                        <div className={styles.contentFlex}>
                            <Fade left delay={400} distance={'1em'}>
                                <div className={styles.contentFlexColumn}>
                                    <div className={styles.contentText}>We get it.  As a parent, you want to be at your best for your family.  But when you’re in pain and it hurts to do everyday things, it can be frustrating. </div>
                                    <div className={styles.contentText}>We help you get out of pain so that you can get back to doing the things that you love with the ones you love, because your worth it!</div>
                                    <div className={styles.buttonContainer}>
                                        <Link to={'/schedule'} className={`${styles.contentButton} ${styles.linkA}`}>Get Started ➔</Link>
                                    </div>
                                </div>
                            </Fade>
                            <Fade right delay={500} distance={'1em'}>
                                <div className={styles.contentImageContainer}>
                                    <img className={styles.contentImage} src={`https://simplychiro.net/wp-content/uploads/2020/09/Untitled-design-17.png`} />
                                </div>
                            </Fade>
                        </div>
                    </div>

                    {/* section 2 */}
                    <div className={styles.contentContainer2}>
                        <div className={styles.childContainer2}>
                            <div className={styles.actualWidth}>
                                <div className={styles.row}>
                                    <div className={styles.actualColumn}>
                                        <Fade left delay={100} distance={'1em'}>
                                            <h3 className={styles.contentHeadText2}>About</h3>
                                        </Fade>
                                        <Fade left delay={200} distance={'1em'}>
                                            <h1 className={styles.contentHeader2}>Meet Dr. Atkin</h1>
                                        </Fade>
                                        <Fade left delay={300} distance={'1em'}>
                                            <div className={styles.contentText2}>Hello! I’m Dr. Atkin, Chiropractor and Master Herbalist here in Holly Springs.  I’ve been training hard and studying for years to be able to help you and I’m excited to finally meet you!</div>
                                        </Fade>
                                    </div>
                                    <Fade right delay={400} distance={'1em'}>
                                        <div className={styles.contentImageContainer2}>
                                            <iframe className={styles.videoPlayer}
                                                title='Youtube player'
                                                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                                src={`https://youtube.com/embed/${youtubeID}?autoplay=0`}>
                                            </iframe>
                                        </div>
                                    </Fade>
                                </div>
                                <div className={styles.utils}>
                                    <Fade up distance={'2em'} delay={500}>
                                        <div className={styles.utilCol}>
                                            <h3 className={styles.utilHeader}>Why Dr.Atkin?</h3>
                                            <div className={styles.utilText}>There are a lot of great chiropractors out there but I think you’ll find something special with what we’ve created here at Simply Chiropractic.</div>
                                            <div>
                                                <Link to={'/pricing'} className={styles.link}>Pricing</Link>
                                            </div>
                                        </div>
                                    </Fade>
                                    <Fade up distance={'2em'} delay={500}>
                                        <div className={styles.utilCol}>
                                            <h3 className={styles.utilHeader}>Learn More</h3>
                                            <div className={styles.utilText}>Check out this video to learn more about me and what we do here – I’ve even included what to expect during your first visits and how our pricing works.</div>
                                            <div>
                                                <Link to={'/contact'} className={styles.link}>Contact</Link>
                                            </div>
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className={`${styles.contentContainer} ${styles.contentNoMargin}`}>
                        <Fade up distance={'1em'} delay={100}>
                            <h3 className={`${styles.contentHeadText} ${styles.center}`}>We’ve made the process simple.</h3>
                        </Fade>
                        <Fade up distance={'1em'} delay={400}>
                            <h1 className={`${styles.contentHeader} ${styles.center}`}>First time visit</h1>
                        </Fade>
                        <div className={styles.cardContainer2}>
                            <Fade up distance={'2em'} delay={600}>
                                <div className={styles.card2}>
                                    <div>
                                        <div className={styles.number}>1</div>
                                    </div>
                                    <div className={styles.cardHeader2}>First Visit</div>
                                    <div className={styles.cardText2}>Schedule online to sit down with Dr. Atkin to review your health concerns, discuss your goals, complete a full spinal evaluation, get your questions answered, and start treatment. (60 mins)</div>
                                </div>
                            </Fade>
                            <Fade up distance={'2em'} delay={800}>
                                <div className={styles.card2}>
                                    <div>
                                        <div className={styles.number}>2</div>
                                    </div>
                                    <div className={styles.cardHeader2}>Personalized Treatment Plan</div>
                                    <div className={styles.cardText2}>Everyone is unique. You will receive a personalized treatment plan and visit frequency designed to help you reach your goals.  Follow-up visits are short and easily fit into your busy day.</div>
                                </div>
                            </Fade>
                            <Fade up distance={'2em'} delay={1000}>
                                <div className={styles.card2}>
                                    <div>
                                        <div className={styles.number}>3</div>
                                    </div>
                                    <div className={styles.cardHeader2}>Get back to doing the things you love.</div>
                                    <div className={styles.cardText2}>Our chiropractic care will help you feel better and function better so you can get back to doing the things you love.</div>
                                </div>
                            </Fade>
                        </div>
                        <Fade up distance={'2em'} delay={1000}>
                            <div className={styles.buttonContainer3}>
                                <div className={styles.contentButton}>Schedule Online ➔</div>
                            </div>
                        </Fade>
                    </div>

                    {/* Section 4 */}
                    <div className={styles.contentContainer2}>
                        <div className={styles.childContainer2}>
                            <div className={styles.actualWidth}>
                                <div className={`${styles.row} ${styles.bookRow}`}>
                                    <div className={`${styles.actualColumn} ${styles.bookColumn}`}>
                                        <Fade up distance={'1em'} delay={100}>
                                            <h3 className={styles.contentHeadText2}>Contact</h3>
                                        </Fade>
                                        <Fade up distance={'1em'} delay={200}>
                                            <h1 className={styles.contentHeader2}>How We Can Help</h1>
                                        </Fade>
                                        <Fade left distance={'1em'} delay={300}>
                                            <div className={styles.contentText2}>Want to learn how to get started on reducing your back pain at home before your scheduled visit?!</div>
                                        </Fade>
                                        <Fade left distance={'1em'} delay={400}>
                                            <div className={styles.buttonContainer2}>
                                                <Link to={'/contact'} className={`${styles.contentButton2} ${styles.linkB}`}>Order My Book ➔</Link>
                                            </div>
                                        </Fade>
                                    </div>
                                    <Fade right distance={'1em'} delay={500}>
                                        <div className={styles.contentImageContainer2}>
                                            <img className={styles.contentImage3} src={`https://simplychiro.net/wp-content/uploads/2020/09/The-Definitive-Guide-to-Back-Painmain-min.png`} />
                                        </div>
                                    </Fade>
                                </div>
                                <div className={styles.utils}>
                                    <div className={styles.utilCol}>
                                        <Fade left distance={'1em'} delay={300}>
                                            <h3 className={styles.utilHeader}>Just tell me where to send your guide</h3>
                                        </Fade>
                                        <Fade left distance={'1em'} delay={400}>
                                            <div className={styles.utilText}>This guide takes you step by step through exactly what he did over the next 24 hours to go from hardly being able to walk because of back pain to becoming completely pain free.</div>
                                        </Fade>
                                        <Fade left distance={'1em'} delay={500}>
                                            <div>
                                                <Link to={'/contact'} className={styles.link}>Send Me My Guide</Link>
                                            </div>
                                        </Fade>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className={`${styles.contentContainer} ${styles.endContainer}`}>
                        <div className={styles.endColumn}>
                            <Fade up distance={'1em'} delay={300}>
                                <h1 className={styles.contentHeader}>Ready to get started?</h1>
                            </Fade>
                            <Fade distance={'1em'} delay={700}>
                                <div className={styles.endText}>Who would you be without pain? Let us help you start living your life at full physical potential.</div>
                            </Fade>
                            <Fade up distance={'1em'} delay={900}>
                                <div className={styles.buttonContainer}>
                                    <div className={styles.contentButton}>Schedule Online ➔</div>
                                </div>
                            </Fade>
                        </div>
                        <div className={styles.endColumn2}>
                            <Fade up distance={'1em'} delay={900}>
                                <div className={styles.card3}>
                                    <div className={styles.cardHeader3}>Healthier Life</div>
                                    <div className={styles.cardText2}>We address the underlying problems that keep you from functioning your best. Check our pricing to see if it fits your needs.</div>
                                    <div>
                                        <Link to={'/pricing'} className={styles.link2}>See Pricing</Link>
                                    </div>
                                </div>
                            </Fade>
                            <Fade up distance={'1em'} delay={900}>
                                <div className={styles.card3}>
                                    <div className={styles.cardHeader3}>Need Help?</div>
                                    <div className={styles.cardText2}>If you need any assistance navigating the website, scheduling an appointment, or have a question to ask, contact me!</div>
                                    <div>
                                        <Link to={'/contact'} className={styles.link2}>Contact Me</Link>
                                    </div>
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default HomePage;