import { useQuery, useMutation } from "@/graphql";
import { User } from "@/types";
import gql from "graphql-tag";
import { defineStore } from "pinia";
import { Ref, onBeforeUnmount } from "vue";

export const useProfileStore = defineStore({
  id: "profile",
  state(): {
    token: null | string;
  } {
    return {
      token: localStorage.getItem("token"),
    };
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
  },
});

export default function useProfile(): {
  profile: Ref<{ profile: User | undefined } | undefined>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
} {
  const profileStore = useProfileStore();
  const { data: profileData, refetch } = useQuery<{ profile: User }>(
    gql`
      query Profile {
        profile {
          name
          email
          id
        }
      }
    `,
    {
      fetchPolicy: "network-only",
    }
  );

  const [loginMutation, { error: loginError }] = useMutation<{
    login: string;
  }>(gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }
  `);

  const [registerMutation, { error: registerError }] = useMutation<{
    register: User;
  }>(gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        name
        id
        email
      }
    }
  `);

  const [refreshTokenMutation, { error: refreshError }] = useMutation<{
    refreshToken: string;
  }>(gql`
    mutation RefreshToken {
      refreshToken
    }
  `);

  const login = async (email: string, password: string) => {
    const { login } = await loginMutation({ variables: { email, password } });
    profileStore.setToken(login);
    refetch();
    loginError.value?.length ? Promise.reject() : Promise.resolve();
  };

  const register = async (name: string, email: string, password: string) => {
    await registerMutation({ variables: { name, email, password } });
    registerError.value?.length ? Promise.reject() : Promise.resolve();
  };

  const refreshToken = async () => {
    const { refreshToken } = await refreshTokenMutation();
    profileStore.setToken(refreshToken);
    refetch();
    refreshError.value?.length ? Promise.reject() : Promise.resolve();
  };

  const refreshInterval = setInterval(() => refreshToken(), 300000);

  onBeforeUnmount(() => clearInterval(refreshInterval));

  return {
    profile: profileData,
    login,
    register,
  };
}
