import styles from "./Post.module.scss";
import {Link, useParams} from "react-router";
import {usePost} from "../../hooks/usePost.ts";
import {useUser} from "../../hooks/useUser.ts";
import {useComments} from "../../hooks/useComments.ts";

export default function Post() {
    const {id} = useParams<{id: string}>();

    const {data: post, isLoading, isError} = usePost(id);
    const {data: user, isLoading: isUserLoading, isError: isUserError} = useUser(post?.userId);
    const {data: comments, isLoading: isCommentsLoading, isError: isCommentsError} = useComments(id);

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
                        <>
                        <div className={styles.PostsPost} key={post.id}>
                            <h5
                                className={styles.PostsPostTitle}
                            >
                                {post.title}
                            </h5>
                            {isUserLoading && (
                                <h6 className={styles.PostsPostAuthor}>
                                    Ładowanie użytkownika...
                                </h6>
                            )}
                            {isUserError && (
                                <h6 className={styles.PostsPostAuthor}>
                                    Błąd ładowania użytkownika...
                                </h6>
                            )}
                            {!isUserLoading && !isUserError && user &&(
                                <h6 className={styles.PostsPostAuthor}>
                                    {user.username} ({user.name})
                                </h6>
                            )}
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
                        <div className={styles.PostsComments}>
                            <h4 className={styles.PostsCommentsCount}>
                                Comments ({comments?.length || 0 })
                            </h4>
                            {isCommentsLoading && (
                                <div className={styles.PostsLoading}> Trwa ładowanie komentarzy...</div>
                            )}
                            {isCommentsError && (
                                <div className={styles.PostsError}> Wystąpił nieoczekiwany błąd...</div>
                            )}
                            {!isCommentsLoading && !isCommentsError && comments?.map((comment) => (
                                <div key={comment.id} className={styles.PostsCommentsComment}>
                                    <h5 className={styles.PostsCommentsCommentTitle}> {comment.name}</h5>
                                    <h6 className={styles.PostsCommentsCommentEmail}>( {comment.email} )</h6>
                                    <div className={styles.PostsCommentsCommentBody}> {comment.body}</div>
                                </div>
                            ))}
                        </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}
