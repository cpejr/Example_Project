export default function queryOptimisticUpdate({ queryClient, key }) {
  return {
    onMutate: async (newSample) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)

      await queryClient.cancelQueries({ queryKey: key });

      // Snapshot the previous value
      const previousSamples = queryClient.getQueryData(key);

      // Optimistically update to the new value
      queryClient.setQueryData(key, (old) =>
        old ? [...old, newSample] : [newSample]
      );

      // Return a context object with the snapshotted value
      return { previousSamples };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newSample, context) => {
      queryClient.setQueryData(key, context.previousSamples);
      console.error(err);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  };
}
