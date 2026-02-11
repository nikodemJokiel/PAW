import styles from "./Categories.module.scss"

const categories = [
    {id:1, name:"Food", description:"Food"},
    {id:2, name:"Movies", description:"Food"},
    {id:3, name:"Sports", description:"Food"},
    {id:4, name:"Water sports", description:"Food"},

]
export default function Categories() {
    return (
        <>
            <div className={styles.Categories}>
                <h2>Categories</h2>
                <p>Search through our categories!!!</p>
                {categories.map(category => (
                    <div key={category.id} className={styles.category}>
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}