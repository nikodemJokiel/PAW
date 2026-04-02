import styles from "./Post.module.scss";
import {Link, useParams} from "react-router";
import {usePost} from "../../hooks/usePost.ts";
import { useAddComment } from "../../hooks/useAddComment.ts";
import {useComments} from "../../hooks/useComments.ts";
import {useState} from "react";

export default function Post() {
    const {id} = useParams<{id: string}>();

    const {data: post, isLoading, isError} = usePost(id);
    const {data: comments, isLoading: isCommentsLoading, isError: isCommentsError} = useComments(id);

    const addCommentMutation = useAddComment(id);
    const [user, setUser] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !content) return;

        addCommentMutation.mutate(
            { user, content },
            {
                onSuccess: () => {
                    setUser("");
                    setContent("");
                }
            }
        );
    };

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

                            <h6 className={styles.PostsPostAuthor}>
                                {post.author}
                            </h6>
                            <p
                                className={styles.PostsPostBody}
                            >
                                {post.content}
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
                                    <h5 className={styles.PostsCommentsCommentTitle}> {comment.user}</h5>
                                    <div className={styles.PostsCommentsCommentBody}> {comment.content}</div>
                                </div>
                            ))}

                        </div>
                            <form onSubmit={handleSubmit} className={styles.PostsForm}>
                                <h4 className={styles.PostsFormTitle}>Dodaj komentarz:</h4>

                                <input
                                    type="text"
                                    placeholder="Twój nick..."
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    className={styles.PostsFormInput}
                                    disabled={addCommentMutation.isPending}
                                />

                                <textarea
                                    placeholder="Treść komentarza..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={4}
                                    className={styles.PostsFormTextarea}
                                    disabled={addCommentMutation.isPending}
                                />

                                <button
                                    type="submit"
                                    className={styles.PostsFormButton}
                                    disabled={addCommentMutation.isPending || !user || !content}
                                >
                                    {addCommentMutation.isPending ? 'Wysyłanie...' : 'Wyślij komentarz'}
                                </button>
                            </form>
                        </>
                    )}
                </>
            )}
        </div>
    )
}
