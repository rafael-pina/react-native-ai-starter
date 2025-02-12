import { useAuth0 } from 'react-native-auth0';
import { useStore } from './useStore';
import { Auth0User, UserMetadata, UserWithMetadata } from '@/types/user';
import { User } from 'react-native-auth0';

type UseAuthReturn = {
  user?: UserWithMetadata;
  auth0User: Auth0User | null;
  name: string;
  updateName: (newName: string) => Promise<void>;
  clearSession: () => Promise<void>;
  getCredentials: () => Promise<any>;
  isLoading: boolean;
  updateUserMetadata: (user: User, token: string, metadata: Partial<UserMetadata>) => void;
  [key: string]: any;
};

export const useAuth = (): UseAuthReturn => {
  const { user: auth0User, clearSession, getCredentials, isLoading: auth0Loading, ...auth0Rest } = useAuth0();
  const { user: storeUser, updateUserMetadata, isLoading: storeLoading } = useStore();

  const name = storeUser?.user_metadata?.name ?? auth0User?.name ?? '';

  const updateName = async (newName: string) => {
    if (!auth0User) return;

    const credentials = await getCredentials();
    if (!credentials?.accessToken) return;

    await updateUserMetadata(auth0User, credentials.accessToken, {
      ...storeUser?.user_metadata,
      meals: storeUser?.user_metadata?.meals ?? [],
      name: newName,
    });
  };

  return {
    user: storeUser,
    auth0User,
    name,
    updateName,
    clearSession,
    getCredentials,
    isLoading: auth0Loading || storeLoading,
    updateUserMetadata,
    ...auth0Rest,
  };
};
