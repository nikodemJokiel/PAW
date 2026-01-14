import styles from "./Home.module.scss";

const slider = [
    { id: 1, src: "img/sl1.jpg" },
    { id: 2, src: "img/sl2.jpg" },
    { id: 3, src: "img/sl3.jpg" }
];
export default function Home(){
    return (
        <>
            <div className={styles.Home}>
                <h1>Home</h1>
                <p>Test site for learning SCSS and react router at ZSK school!!!</p>
                <div className={styles.slider}>
                    {slider.map((item) => (
                        <img key={item.id} src={item.src} alt={String(item.id)} />
                    ))}
                </div>
            </div>
        </>
    )
}