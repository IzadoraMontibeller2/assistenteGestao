import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/db";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import MenuHeader from "@/components/menuInicial";


const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  fontSize: "16px",
}));

function EditarLinks() {
  const router = useRouter();
  const { id } = router.query;
  console.log("banana", id);

  const [linkCompras, setLinkCompras] = useState("");
  const [linkComercial, setLinkComercial] = useState("");
  const [linkAtendimento, setLinkAtendimento] = useState("");
  const [linkProjetos, setLinkProjetos] = useState("");
  const [linkExternos, setlinkExternos] = useState("");


  useEffect(() => {
    if (id) {
      const carregarDadosDaOportunidade = async () => {
        const oportunidadeRef = doc(db, "oportunidades", id);

        try {
          const docSnapshot = await getDoc(oportunidadeRef);
          if (docSnapshot.exists()) {
            const oportunidadeData = docSnapshot.data();
            setLinkCompras(oportunidadeData.linkCompras || "");
            setLinkComercial(oportunidadeData.linkComercial || "");
            setLinkAtendimento(oportunidadeData.linkAtendimento || "");
            setLinkProjetos(oportunidadeData.linkProjetos || "");
            setlinkExternos(oportunidadeData.linkExternos || "");

          } else {
            console.error("Empresa não encontrada");
          }
        } catch (error) {
          console.error("Erro ao carregar dados da empresa:", error);
        }
      };

      carregarDadosDaOportunidade();
    }
  }, [id]);

  const salvarEdicao = async () => {
    try {
      const oportunidadeRef = doc(db, "oportunidades", id);

      await updateDoc(oportunidadeRef, {
        linkCompras,
        linkComercial,
        linkAtendimento,
        linkProjetos,
        linkExternos,
      });

      console.log("Empresa atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a empresa:", error);
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
          {"Links da oportunidade: "} {id}
        </Div>
      </Stack>
      <Stack spacing={3}>
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
          onChange={(e) => setlinkExternos(e.target.value)}
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

export default EditarLinks;
