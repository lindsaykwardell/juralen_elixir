import { Ref, ref, inject } from "vue";
import { DocumentNode, GraphQLError } from "graphql";
import ApolloClient from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

export default <T>(
  query: DocumentNode,
  variables?: { [key: string]: unknown }
): {
  data: Ref<T | undefined>;
  loading: Ref<boolean>;
  error: Ref<readonly GraphQLError[] | undefined>;
  refetch: () => Promise<void>;
} => {
  const client = inject<ApolloClient<NormalizedCacheObject>>("graphql-client");

  const data = ref();
  const loading = ref(true);
  const error = ref<readonly GraphQLError[] | undefined>();

  const refetch = async () => {
    if (!client) throw new Error("GraphQL Client is not defined!");

    try {
      const res = await client.query({
        query,
        variables,
      });
      loading.value = false;
      data.value = res.data;
      error.value = res.errors;
    } catch (err) {
      loading.value = false;
      error.value = err;
    }
  };

  refetch();

  return {
    data,
    loading,
    error,
    refetch,
  };
};
