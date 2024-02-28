import { updateDoc, doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "@/firebase/db";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { Button, Stack, TextField } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/db";
import MenuHeader from "@/components/menuInicial";


function EditarFinanceiro() {

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));
  const router = useRouter();
  const { id } = router.query;

  const [emailXml, setEmailXml] = useState("");
  const [emailFinanceiro, setEmailFinanceiro] = useState("");
  const [insestadual, setInsestadual] = useState("");
  const [insmunicipal, setInsmunicipal] = useState("");
  const [regras, setRegras] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [pix, setPix] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [anexar, setAnexar] = useState("");

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
            setEmailXml(empresaData.emailXml || "");
            setEmailFinanceiro(empresaData.emailFinanceiro || "");
            setInsestadual(empresaData.insestadual || "");
            setInsmunicipal(empresaData.insmunicipal || "");
            setRegras(empresaData.regras || "");
            setBanco(empresaData.banco || "");
            setAgencia(empresaData.agencia || "");
            setConta(empresaData.conta || "");
            setPix(empresaData.pix || "");
            setObservacoes(empresaData.observacoes || "");
            setAnexar(empresaData.anexar || "");
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

  const handleFileUpload = async (file) => {
    if (file) {
      const caminho = `empresas/${id}/${file.name}`;
  
      const storageRef = ref(storage, caminho);
  
      try {
        // Faça o upload do novo arquivo para o Firebase Storage.
        await uploadBytes(storageRef, file);
  
        // Obtenha a URL de download do novo arquivo após o upload.
        const downloadURL = await getDownloadURL(storageRef);
  
        // Atualize o estado do "anexar" com a URL de download do novo arquivo.
        setAnexar(downloadURL);
  
        console.log("Novo arquivo enviado com sucesso:", downloadURL);
      } catch (error) {
        console.error("Erro ao enviar o novo arquivo:", error);
      }
    }
  };
  

  const salvarEdicao = async () => {
    try {
      const empresaRef = doc(db, "empresas", id);

      await updateDoc(empresaRef, {
        emailXml,
        emailFinanceiro,
        insestadual,
        insmunicipal,
        regras,
        banco,
        agencia,
        conta,
        pix,
        observacoes,
        anexar,
      });

      console.log("Empresa atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a oportunidade:", error);
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
          {"Informações financeiras da empresa:"} {id}
        </Div>
      </Stack>
      <Stack spacing={3}>
        <TextField
          id="E-mailxml:"
          label="E-mail para enviar xml"
          value={emailXml}
          onChange={(e) => setEmailXml(e.target.value)}
          variant="filled"
        />
        <TextField
          id="emailFinanceiro"
          label="E-mail para financeiro"
          value={emailFinanceiro}
          onChange={(e) => setEmailFinanceiro(e.target.value)}
          variant="filled"
        />
        <TextField
          id="insestadual"
          label="Inscrição Estadual"
          value={insestadual}
          onChange={(e) => setInsestadual(e.target.value)}
          variant="filled"
        />
        <TextField
          id="insmunicipal"
          label="Inscrição Municipal"
          value={insmunicipal}
          onChange={(e) => setInsmunicipal(e.target.value)}
          variant="filled"
        />
        <TextField
          id="regras"
          label="Regras para pagamento"
          value={regras}
          onChange={(e) => setRegras(e.target.value)}
          variant="filled"
        />
        <TextField
          id="banco"
          label="Banco"
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
          variant="filled"
        />
        <TextField
          id="agencia"
          label="Agência"
          value={agencia}
          onChange={(e) => setAgencia(e.target.value)}
          variant="filled"
        />
        <TextField
          id="conta"
          label="Conta"
          value={conta}
          onChange={(e) => setConta(e.target.value)}
          variant="filled"
        />
        <TextField
          id="pix"
          label="Chave PIX"
          value={pix}
          onChange={(e) => setPix(e.target.value)}
          variant="filled"
        />
        <TextField
          id="observacoes"
          label="Observações"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          variant="filled"
        />
        <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />

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

// Chame esta função após o usuário clicar em "Salvar" na página de edição
export default EditarFinanceiro;
