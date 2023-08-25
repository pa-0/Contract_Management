import LoginComponent from "@/Components/LoginComponent/LoginComponent";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { onLoginRedux } from "@/store/Authentication/Action"; 
import CustomSnackbar from "@/ReusableComponets/CustomSnackbar/CustomSnackbar";
import { useState } from "react";
import { UnAuthorizedGSSP } from "@/Auth/UnAuthorizedGSSP/UnAuthorizedGSSP";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

function Login() {
  //particle
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  //snakbar
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({
    duration: 5000,
    type: "error",
    infomation: "Invalid credential !!",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const onMainLogin = async (data, loginType) => {
    let temp;
    if (loginType == "MS") {//if microsoft account means !!;
      temp = { emailID: data.account.username, username: data.account.name }
    } else if (loginType == "GOOGLE") {//if google account means !!
      temp = { emailID: data.email, username: data.name, picture: data.picture };
    }else if(loginType == "NORMAL"){
      temp = {emailID : data.email , password : data.password};
      if(temp.emailID == "" && temp.password == ""){
        setsnackbarValue({...snackbarValue, infomation: "Please enter emailID and password !!" });
        setsnackbarOpen(true);
        return;
      }
      if(temp.emailID == ""){
        setsnackbarValue({...snackbarValue, infomation: "Please enter emailID !!" });
        setsnackbarOpen(true);
        return;
      }
      if(temp.password == ""){
        setsnackbarValue({...snackbarValue, infomation: "Please enter password !!" });
        setsnackbarOpen(true);
        return;
      }
    }
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: temp.emailID , password : temp.password  }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status == "Success") {
          await dispatch(onLoginRedux(response.data));
          await router.push('/');
        }
        else if(response.status == "failure"){
          setsnackbarValue({...snackbarValue, infomation: "Invalid credential !!" });
          setsnackbarOpen(true);
        }else{
          setsnackbarValue({...snackbarValue, infomation: "server not found" });
          setsnackbarOpen(true);
          await router.push('/500');
        }
      })
      .catch((err) => {
        setsnackbarValue({ ...snackbarValue, infomation: err });
        setsnackbarOpen(true);
      });
  };

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          // speed : 20000,
          // fpsLimit: 20000,
          background: {
            color: {
              value: "#fff",
            },
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#33afc1", "#FFA384"],
            },
            links: {
              enable: true,
              color: {
                value: ["#33afc1", "#FFA384"],
              },
              distance: 120,
              enable: true,
              opacity: 0.5,
              width: 1.8,
            },
            collisions: {
              enable: false,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 150,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 4 },
            },
          },
          detectRetina: true,
          speed: 1,
        }}
      />
      <LoginComponent onMainLogin={onMainLogin} />
      {/* snackbar infomation */}
      <CustomSnackbar
        open={snackbarOpen}
        setOpen={setsnackbarOpen}
        snackbarValue={snackbarValue}
      />
    </>
  );
}
 
Login.Layout = true;
export default Login;

export const getServerSideProps = UnAuthorizedGSSP(async (context) => {
  return {
    props: {},
  };
});
