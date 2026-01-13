import styles from "./Post.module.scss";
const posts = [
    {id:1, title: "Tytuł 1", desription:"Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum", src:"src1.jpg", alt:"allt1"},
    {id:2, title: "Tytuł 2", desription:"Lorem IpsumLorem IpsumLorem Ipsum DOLOR dsada", src:"src2.jpg", alt:"allt2"},
]

export default function Post() {
    return (
            <div className={styles.Posts}>
                {posts.map((post) => (
                    <div key={post.id} className={styles.post}>
                        <h2>{post.title}</h2>
                        <p>{post.desription}</p>
                        <img src={post.src} alt={post.alt}/>
                    </div>
                ))}
            </div>
    );
}