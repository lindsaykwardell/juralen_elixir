import { ref } from "vue";
import client from "./client";
import { DocumentNode } from "graphql";

export default (query: DocumentNode, variables?: { [key: string]: any }) => {
  const data = ref();
  const loading = ref(true);
  const error = ref({});

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
  };
};
