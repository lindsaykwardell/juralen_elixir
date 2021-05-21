import { Ref, ref } from "vue";
import client from "./client";
import { DocumentNode } from "graphql";

interface MutationArgument {variables?: { [key: string]: unknown }}

export default <T>(
  mutation: DocumentNode
): [
  (arg?: MutationArgument) => Promise<T>,
  {
    data: Ref<T | undefined>;
    loading: Ref<boolean>;
    error: Ref<unknown>;
  }
] => {
  const data = ref<T>();
  const loading = ref(true);
  const error = ref({});

  const mutate = async (arg?: MutationArgument) => {

    try {
      const res = await client.mutate({
        mutation,
        variables: arg?.variables,
      });
      loading.value = false;
      data.value = res.data;

      return res.data;
    } catch (err) {
      loading.value = false;
      error.value = err;
    }
  };

  return [mutate, { data, loading, error }];
};
