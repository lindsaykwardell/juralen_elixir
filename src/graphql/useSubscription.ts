import { DocumentNode } from "graphql";
import { Ref, ref, inject } from "vue";
import ApolloClient from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

export default <T>(query: DocumentNode, variables?: { [key: string]: unknown }): {
  data: Ref<T | undefined>
  loading: Ref<boolean>
} => {
  const client = inject<ApolloClient<NormalizedCacheObject>>("graphql-client");

  const data = ref<T>();
  const loading = ref(true);

  if (!client) throw new Error("GraphQL Client is not defined!");

  const observable = client.subscribe({
    query,
    variables,
  });

  observable.subscribe((val) => {
    loading.value = false;
    data.value = val.data;
  });

  return {
    data,
    loading,
  };
};
