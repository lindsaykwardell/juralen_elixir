import { useQuery, useMutation } from "@/graphql";
import { User } from "@/types";
import gql from "graphql-tag";
import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "profile",
  state(): {
    token: null | string;
  } {
    return {
      token: null,
    };
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
});

export default function useProfile(): {
  profile: User | undefined,
  login: (email: string, password: string) => Promise<void>,
}  {
  const profileStore = useProfileStore();
  const { data: profileData, refetch } = useQuery<{ profile: User }>(gql`
    query Profile {
      profile {
        name
        email
        id
      }
    }
  `);

  const [loginMutation] = useMutation<{
    login: string;
  }>(gql`mutation Login($email: String, password: $String) {
    login(email: $email, password: $password)
  }`);

  const login = async (email: string, password: string) => {
    const { login } = await loginMutation({ variables: { email, password } });
    profileStore.setToken(login);
    refetch();
  };

  return {
    profile: profileData.value?.profile,
    login
  };
}
