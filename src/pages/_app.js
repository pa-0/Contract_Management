import '@/styles/globals.css'
import { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DefaultThemeSetting from '@/theme/DefaultThemeSetting';
import FullLayout from "@/Layout/FullLayout";
import DashboardLayout from "@/Layout/DashboardLayout";
import wrapper from "@/store/Store";
import AOS from "aos";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  const Gettheme = DefaultThemeSetting();
  const Layout = Component.Layout ? FullLayout : DashboardLayout;
  return (
    <>
      <Head>
        <title>Contract Management</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        {/* <link
          rel="icon"
          href="https://d24cdstip7q8pz.cloudfront.net/t/t20160628170229/content/common/images/Kaar%20Logo%20150X150.png"
          type="image/x-icon"
        ></link> */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          crossOrigin
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        {/* <link rel='manifest' href='/manifest.json' /> */}
      </Head>
      <ThemeProvider theme={Gettheme}>
        <CssBaseline />
        <Layout>
            {<Component {...pageProps} />}
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
