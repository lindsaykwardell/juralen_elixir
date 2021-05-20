import { DocumentNode } from "graphql";
import { Ref, ref } from "vue";
import client from "./client";

export default <T>(query: DocumentNode, variables?: { [key: string]: unknown }): {
  data: Ref<T | undefined>
  loading: Ref<boolean>
} => {
  const data = ref<T>();
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
