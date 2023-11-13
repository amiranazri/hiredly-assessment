// _app.tsx
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "./store/store";
import "./styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={wrapper.store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
