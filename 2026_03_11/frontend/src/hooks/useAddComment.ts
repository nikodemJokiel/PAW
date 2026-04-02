import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NewCommentProps {
    user: string;
    content: string;
}

export const useAddComment = (postId: string | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newComment: NewCommentProps) => {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            if (!response.ok) {
                throw new Error('Error creating new comment');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts', postId] });
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        },
    });
}