import styles from "./Post.module.scss";
import type {Post} from "../../types/Post/Post.ts";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";

export default function Post() {
    const {id} = useParams();
    const [post, setPost] = useState<Post>()
    //const [users, setUsers] = useState<Array<Post>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        (() => {
            setIsLoading(true)
        })()
        fetch('https://jsonplaceholder.typicode.com/posts/'+id)
            .then(response => response.json())
            .then((json: Post) => {
                setPost(json);
            })
            .catch(() => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [id]);
/*
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/'+post?.userId)
        .then(response => response.json())
            .then((json))=>{

        }
    }, [id]);
*/
    return (
        <div className={styles.Posts}>
            {isLoading && (
                <div className={styles.PostsLoading}>
                    Trwa ładowanie danych...
                </div>
            )}
            {isError && (
                <div className={styles.PostsError}>
                    Wystąpił nieoczekiwany błąd...
                </div>
            )}
            {!isLoading && !isError && (
                <>
                    {post == null && (
                        <div className={styles.PostsError}>
                            Brak wpisu...
                        </div>
                    )}
                    {post != null && (
                        <div className={styles.PostsPost} key={post.id}>
                            <h5
                                className={styles.PostsPostTitle}
                            >
                                {post.title}
                            </h5>
                            <p
                                className={styles.PostsPostBody}
                            >
                                {post.body}
                            </p>
                            <Link
                                to={"/post/"}
                                className={styles.PostsPostLink}
                            >
                                Wróć do wszysktich postów
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
