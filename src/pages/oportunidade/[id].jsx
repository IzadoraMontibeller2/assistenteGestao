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

function EditarOportunidade() {
  
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));
  const router = useRouter();
  const { id } = router.query;
  console.log("banana", id);

  const [oportun, setOportun] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [motivo, setMotivo] = useState("");
  const [linkCompras, setLinkCompras] = useState("");
  const [linkComercial, setLinkComercial] = useState("");
  const [linkAtendimento, setLinkAtendimento] = useState("");
  const [linkProjetos, setLinkProjetos] = useState("");
  const [linkExternos, setLinkExternos] = useState("");

  useEffect(() => {
    if (id) {
      // Carregar os dados da oportunidade com base no ID
      const carregarDadosDaOportunidade = async () => {
        const oportunidadeRef = doc(db, "oportunidades", id);

        try {
          const docSnapshot = await getDoc(oportunidadeRef);
          if (docSnapshot.exists()) {
            const oportunidadeData = docSnapshot.data();

            // Defina os valores iniciais dos campos "Link Comercial" e "Link Atendimento"
            setOportun(oportunidadeData.oportun || "");
            setTipo(oportunidadeData.tipo || "");
            setStatus(oportunidadeData.status || "");
            setMotivo(oportunidadeData.motivo || "");
            setLinkCompras(oportunidadeData.linkCompras || "");
            setLinkComercial(oportunidadeData.linkComercial || "");
            setLinkAtendimento(oportunidadeData.linkAtendimento || "");
            setLinkProjetos(oportunidadeData.linkProjetos || "");
            setLinkExternos(oportunidadeData.linkExternos || "");
          } else {
            console.error("Oportunidade não encontrada");
          }
        } catch (error) {
          console.error("Erro ao carregar dados da oportunidade:", error);
        }
      };

      carregarDadosDaOportunidade();
    }
  }, [id]);

  const salvarEdicao = async () => {
    try {
      const oportunidadeRef = doc(db, "oportunidades", id);

      await updateDoc(oportunidadeRef, {
        oportun,
        tipo,
        status,
        motivo,
        linkCompras,
        linkComercial,
        linkAtendimento,
        linkProjetos,
        linkExternos,
      });

      console.log("Oportunidade atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a oportunidade:", error);
    }
  };

  const onClickNovo = async () => {
    router.push("/Oportunidade");
  };

  return (
    <>
    <MenuHeader/>
      <Stack marginLeft={65} marginRight={65}>
        <Div>
          {"Editar Oportunidade"} {id}
        </Div>
      </Stack>
      <Stack spacing={3}>
        <TextareaAutosize
          id="oportun"
          placeholder="Oportunidade"
          value={oportun}
          onChange={(e) => setOportun(e.target.value)}
          className="textAreaStyle"
          minRows={3}
        />
        <FormControl variant="filled">
          <InputLabel id="tipo">Tipo de oportunidade</InputLabel>
          <Select
            label="Tipo de oportunidade"
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <MenuItem value={"Hardware"}>Hardware</MenuItem>
            <MenuItem value={"Solução"}>Solução</MenuItem>
            <MenuItem value={"Serviço"}>Serviço</MenuItem>
            <MenuItem value={"Consultoria"}>Consultoria</MenuItem>
            <MenuItem value={"Revenda"}>Revenda</MenuItem>
            <MenuItem value={"Indicação"}>Indicação</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel id="status">Status</InputLabel>
          <Select
            label="Status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={"Abertura"}>Abertura</MenuItem>
            <MenuItem value={"Andamento"}>Andamento</MenuItem>
            <MenuItem value={"Futuro"}>Futuro</MenuItem>
            <MenuItem value={"Finalizada"}>Finalizada</MenuItem>
            <MenuItem value={"Cancelada"}>Cancelada</MenuItem>
            <MenuItem value={"Pausa"}>Pausa</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel id="motivo">Motivo</InputLabel>
          <Select
            label="Motivo"
            id="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          >
            <MenuItem value={"Oportunidade mapeada"}>
              Oportunidade mapeada
            </MenuItem>
            <MenuItem value={"Oportunidade Real"}>Oportunidade Real</MenuItem>
            <MenuItem value={"Solicitação empresa"}>
              Solicitação empresa
            </MenuItem>
            <MenuItem value={"Venda"}>Venda</MenuItem>
            <MenuItem value={"Escopo não aprovado"}>
              Escopo não aprovado
            </MenuItem>
            <MenuItem value={"Falta de interação"}>Falta de interação</MenuItem>
            <MenuItem value={"Outras prioridades"}>Outras prioridades</MenuItem>
            <MenuItem value={"Reprogramado"}>Reprogramado</MenuItem>
          </Select>
               </FormControl>
          <TextField
            id="linkCompras"
            label="Link de Compras"
            value={linkCompras}
            onChange={(e) => setLinkCompras(e.target.value)}
            variant="filled"
          />
   
        <TextField
          id="linkComercial"
          label="Link Comercial"
          value={linkComercial}
          onChange={(e) => setLinkComercial(e.target.value)}
          variant="filled"
        />

        <TextField
          id="linkAtendimento"
          label="Link Atendimento"
          value={linkAtendimento}
          onChange={(e) => setLinkAtendimento(e.target.value)}
          variant="filled"
        />
        <TextField
          id="linkProjetos"
          label="Link Projetos"
          value={linkProjetos}
          onChange={(e) => setLinkProjetos(e.target.value)}
          variant="filled"
        />
        <TextField
          id="linkExternos"
          label="Link Externo"
          value={linkExternos}
          onChange={(e) => setLinkExternos(e.target.value)}
          variant="filled"
        />
        <Stack margin={3} >
          <Button variant="contained" onClick={() => {
            salvarEdicao();
            onClickNovo();
          }}   sx={{marginLeft:75, marginRight:75}}>
            Salvar
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

// Chame esta função após o usuário clicar em "Salvar" na página de edição
export default EditarOportunidade;
