import React, { useState } from "react";
import firebase from "@/firebase/db";
import { useRouter } from "next/router";
import { FileX, Lock, Unlock } from "lucide-react";
import {
  Stack,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para a mensagem de erro
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Limpe a mensagem de erro quando o usuário começa a digitar
    setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Limpe a mensagem de erro quando o usuário começa a digitar
    setError(null);
  };

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.push("/Empresas"); // Redirecione após um login bem-sucedido
    } catch (error) {
      setError("Email ou senha inválidos"); // Defina a mensagem de erro
      console.log(error);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  function recoverPassword() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Email enviado com sucesso");
      })
      .catch((error) => {
        alert("Erro ao resetar a senha: " + error.message);
      });
  }

  return (
    <Stack>
      <Image src="/images/fundoimagem.jpg" alt="" layout="fill" objectFit="cover" />
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Stack display={"flex"} flexDirection={"row"}>
          <Image src="/images/logo.png" alt="" width={580} height={180} />
          <Stack marginLeft={15} display={"flex"} flexDirection={"column"}>
            <Stack margin={1}>
              <TextField
                color="secondary"
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                variant="filled"
                sx={{ backgroundColor: "white" }}
              />
            </Stack>
            <Stack margin={1}>
              <TextField
                type={passwordVisible ? "text" : "password"}
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                variant="filled"
                sx={{ backgroundColor: "white" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handleTogglePasswordVisibility}
                    >
                      <span
                        style={{
                          backgroundColor: "#0000000f",
                          padding: "10px",
                        }}
                      >
                        {passwordVisible ? (
                          <Unlock color="grey" size={28} cursor="pointer" />
                        ) : (
                          <Lock color="grey" size={28} cursor="pointer" />
                        )}
                      </span>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack margin={1}>
              {error && (
                <Typography color="error">{error}</Typography>
              )}
              <Button size="small" variant="contained" onClick={handleLogin}>
                Entrar
              </Button>
            </Stack>
            <Button
              variant="text"
              size="medium"
              href="#text-buttons"
              cursor={"pointer"}
              onClick={recoverPassword}
              sx={{ fontWeight: "bold" }}
            >
              {" "}
              <span
                style={{
                  textShadow:
                    "1px 1px 1px white, -1px -1px 1px white, 1px -1px 1px white, -1px 1px 1px white",
                  padding: "4px",
                }}
              >
                Alterar senha{" "}
              </span>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
