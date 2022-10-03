import { useOidcUser, OidcUserStatus } from "@axa-fr/react-oidc";

export const DisplayUser = () => {
  const { oidcUser, oidcUserLoadingState } = useOidcUser();

  switch (oidcUserLoadingState) {
    case OidcUserStatus.Loading:
    case OidcUserStatus.Unauthenticated:
    case OidcUserStatus.LoadingError:
      return <div></div>;
    default:
      return <div>{oidcUser.name}</div>;
  }
};
