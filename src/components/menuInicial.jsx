import { Button, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import firebase from "@/firebase/db"; // Importe o Firebase para a função de logout
import Image from "next/image"

export default function MenuHeader() {
  const router = useRouter();

  const onClickEmpresa = async () => {
    router.push("/Empresas");
  };
  const onClickContato = async () => {
    router.push("/Contatos");
  };
  const onClickOportunidades = async () => {
    router.push("/Oportunidade");
  };
  const onClickProdutos = async () => {
    router.push("/Produtos");
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut(); // Realize o logout
      router.push("login"); // Redirecione para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    fontSize: "17px", // Aumente o tamanho da fonte aqui
  }));

  return (
    <Stack>
    <Stack  marginTop={1} marginBottom={-10} marginLeft={3} >
      <Image src="/images/hasar.png" width={100} height={72} alt="logo hasar"/></Stack>
      <Stack
        display={"flex"}
        direction="row"
        spacing={4}
        margin={2}
        marginTop={3}
        justifyContent={"space-evenly"}
        marginLeft={10}
      >
        <Item  onClick={onClickEmpresa}>Empresas</Item>
        <Item onClick={onClickContato}>Contatos</Item>
        <Item onClick={onClickOportunidades}>Oportunidades</Item>
        <Item onClick={onClickProdutos}>Produtos</Item>
        <Button onClick={handleLogout} variant="outlined">sair</Button>
      </Stack>
    </Stack>
  );
}
