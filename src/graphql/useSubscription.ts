import { DocumentNode } from "graphql";
import { ref } from "vue";
import client from "./client";

export default (query: DocumentNode, variables?: { [key: string]: any }) => {
  const data = ref();
  const loading = ref(true);

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
