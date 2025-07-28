import "@emotion/react";

declare module "react" {
  interface Attributes {
    css?: import("@emotion/react").Interpolation<
      import("@emotion/react").Theme
    >;
  }
}
