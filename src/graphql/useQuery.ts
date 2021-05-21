import { Ref, ref } from "vue";
import client from "./client";
import { DocumentNode } from "graphql";

export default <T>(
  query: DocumentNode,
  variables?: { [key: string]: unknown }
): {
  data: Ref<T | undefined>;
  loading: Ref<boolean>;
  error: Ref<unknown>;
  refetch: () => Promise<void>
} => {
  const data = ref();
  const loading = ref(true);
  const error = ref({});

  const refetch = () =>
    client
      .query({
        query,
        variables,
      })
      .then((res) => {
        loading.value = false;
        data.value = res.data;
      })
      .catch((err) => {
        loading.value = false;
        error.value = err;
      });

  return {
    data,
    loading,
    error,
    refetch
  };
};
