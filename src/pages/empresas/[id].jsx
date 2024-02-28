import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/db";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import MenuHeader from "@/components/menuInicial";


function EditarEmpresa() {
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));
  const router = useRouter();
  const { id } = router.query;
  console.log("banana", id);

  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");
  const [seguimento, setSeguimento] = useState("");
  const [site, setSite] = useState("");
  const [solicitante, setSolicitante] = useState("");

  useEffect(() => {
    if (id) {
      // Carregar os dados da oportunidade com base no ID
      const carregarDadosDaEmpresa = async () => {
        const empresaRef = doc(db, "empresas", id);

        try {
          const docSnapshot = await getDoc(empresaRef);
          if (docSnapshot.exists()) {
            const empresaData = docSnapshot.data();

            // Defina os valores iniciais dos campos "Link Comercial" e "Link Atendimento"
            setCidade(empresaData.cidade || "");
            setEstado(empresaData.estado || "");
            setTipo(empresaData.tipo || "");
            setSeguimento(empresaData.seguimento || "");
            setSite(empresaData.site || "");
            setSolicitante(empresaData.solicitante || "");
          } else {
            console.error("Oportunidade não encontrada");
          }
        } catch (error) {
          console.error("Erro ao carregar dados da oportunidade:", error);
        }
      };

      carregarDadosDaEmpresa();
    }
  }, [id]);

  const salvarEdicao = async () => {
    try {
      const empresaRef = doc(db, "empresas", id);

      await updateDoc(empresaRef, {
        cidade,
        estado,
        tipo,
        seguimento,
        site,
        solicitante,
      });

      console.log("empresa atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a empresa:", error);
    }
  };

  const onClickNovo = async () => {
    router.push("/Empresas");
  };

  return (
    <>
    <MenuHeader/>
      <Stack marginLeft={60} marginRight={60}>
        <Div>
          {"Editar Empresa:"} {id}
        </Div>
      </Stack>
      <Stack spacing={3}>
        <TextField
          id="cidade"
          label="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          variant="filled"
        />
        <TextField
          id="estado"
          label="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          variant="filled"
        />
        <FormControl variant="filled">
          <InputLabel id="tipo">Tipo</InputLabel>
          <Select
            label="Tipo"
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <MenuItem value={"Cliente"}>Cliente</MenuItem>
            <MenuItem value={"Fornecedor"}>Fornecedor</MenuItem>
            <MenuItem value={"Canal de Venda"}>Canal de Venda</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel id="seguimento">Seguimento</InputLabel>
          <Select
            id="seguimento"
            label="Seguimento"
            value={seguimento}
            onChange={(e) => setSeguimento(e.target.value)}
          >
            <MenuItem value={"Industria"}>Industria</MenuItem>
            <MenuItem value={"Varejo"}>Varejo</MenuItem>
            {/* ... (other items) ... */}
          </Select>
        </FormControl>
        <TextField
          id="site"
          label="Site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          variant="filled"
        />
        <TextField
          id="solicitante"
          label="Solicitante"
          value={solicitante}
          onChange={(e) => setSolicitante(e.target.value)}
          variant="filled"
        />
        <Stack margin={3}>
          <Button
            variant="contained"
            onClick={() => {
              salvarEdicao();
              onClickNovo();
            }}
            sx={{ marginLeft: 75, marginRight: 75 }}
          >
            Salvar
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default EditarEmpresa;
