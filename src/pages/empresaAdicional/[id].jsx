import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/db";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import MenuHeader from "@/components/menuInicial";


const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  fontSize: "16px",
}));

function EditarAdicional() {
  const router = useRouter();
  const { id } = router.query;
  console.log("banana", id);

  const [informacoesAdicionais, setInformacoesAdicionais] = useState("");

  useEffect(() => {
    if (id) {
      const carregarDadosDaEmpresa = async () => {
        const empresaRef = doc(db, "empresas", id);

        try {
          const docSnapshot = await getDoc(empresaRef);
          if (docSnapshot.exists()) {
            const empresaData = docSnapshot.data();
            setInformacoesAdicionais(empresaData.informacoesAdicionais || "");
          } else {
            console.error("Empresa não encontrada");
          }
        } catch (error) {
          console.error("Erro ao carregar dados da empresa:", error);
        }
      };

      carregarDadosDaEmpresa();
    }
  }, [id]);

  const salvarEdicao = async () => {
    try {
      const empresaRef = doc(db, "empresas", id);

      await updateDoc(empresaRef, {
        informacoesAdicionais,
      });

      console.log("Empresa atualizada com sucesso!");
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
      <Stack marginLeft={55} marginRight={40}>
        <Div>
          {"Informações adicionais da empresa:"} {id}
        </Div>
      </Stack>
      <Stack spacing={3}>
        <TextareaAutosize
          id="informacoesAdicionais"
          placeholder="Informações Adicionais"
          value={informacoesAdicionais}
          onChange={(e) => setInformacoesAdicionais(e.target.value)}
          variant="filled"
          className="textAreaStyle"
          minRows={3}
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

export default EditarAdicional;
