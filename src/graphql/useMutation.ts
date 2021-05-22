import { Ref, ref, inject } from "vue";
import { DocumentNode, GraphQLError } from "graphql";
import ApolloClient from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

interface MutationArgument {
  variables?: { [key: string]: unknown };
}

export default <T>(
  mutation: DocumentNode
): [
  (arg?: MutationArgument) => Promise<T>,
  {
    data: Ref<T | undefined>;
    loading: Ref<boolean>;
    error: Ref<readonly GraphQLError[] | undefined>;
  }
] => {
  const client = inject<ApolloClient<NormalizedCacheObject>>("graphql-client");

  const data = ref<T>();
  const loading = ref(true);
  const error = ref<readonly GraphQLError[] | undefined>([]);

  const mutate = async (arg?: MutationArgument) => {
    if (!client) throw new Error("GraphQL Client is not defined!");

    try {
      const res = await client.mutate({
        mutation,
        variables: arg?.variables,
      });
      loading.value = false;
      data.value = res.data;
      error.value = res.errors;

      return res.data;
    } catch (err) {
      loading.value = false;
      error.value = err;
    }
  };

  return [mutate, { data, loading, error }];
};
