import { Ref, ref } from "vue";
import client from "./client";
import { DocumentNode } from "graphql";

export default <T>(
  mutation: DocumentNode,
  variables?: { [key: string]: unknown }
): {
  data: Ref<T | undefined>;
  loading: Ref<boolean>;
  error: Ref<unknown>;
} => {
  const data = ref<T>();
  const loading = ref(true);
  const error = ref({});

  client
    .mutate({
      mutation,
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
  };
};
