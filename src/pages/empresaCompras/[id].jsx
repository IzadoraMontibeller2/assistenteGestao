import React, { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/db";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import MenuHeader from "@/components/menuInicial";


function EditarCompras() {
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));
  const router = useRouter();
  const { id } = router.query;
  console.log("banana", id);

  const [nomeComprador, setNomeComprador] = useState("");
  const [emailComprador, setEmailComprador] = useState("");
  const [telefoneFixoComprador, setTelefoneFixoComprador] = useState("");
  const [telefoneCelularComprador, setTelefoneCelularComprador] = useState("");
  const [politicaPagamento, setPoliticaPagamento] = useState("");
  const [agendamentoEntrega, setAgendamentoEntrega] = useState("");
  const [informacoesFiscais, setInformacoesFiscais] = useState("");
  const [icms, setIcms] = useState("");
  const [observacoesCompras, setObservacoesCompras] = useState("");
  const [mostrarAreaTexto, setMostrarAreaTexto] = useState(false);
  const [textoAreaTexto, setTextoAreaTexto] = useState("");

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
            setNomeComprador(empresaData.nomeComprador || "");
            setEmailComprador(empresaData.emailComprador || "");
            setTelefoneFixoComprador(empresaData.telefoneFixoComprador || "");
            setTelefoneCelularComprador(
              empresaData.telefoneCelularComprador || ""
            );
            setPoliticaPagamento(empresaData.politicaPagamento || "");
            setAgendamentoEntrega(empresaData.agendamentoEntrega || "");
            setInformacoesFiscais(empresaData.informacoesFiscais || "");
            setIcms(empresaData.icms || "");
            setObservacoesCompras(empresaData.observacoesCompras || "");
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

  const handleRadioChange = (e) => {
    setAgendamentoEntrega(e.target.value);
    if (e.target.value === "sim") {
      setMostrarAreaTexto(true);
    } else {
      setMostrarAreaTexto(false);
    }
  };

  const salvarEdicao = async () => {
    try {
      const empresaRef = doc(db, "empresas", id);

       // Combine o valor de agendamentoEntrega com o texto da área de texto, separados por uma vírgula
       const agendamentoEntregaFinal = mostrarAreaTexto
       ? `${agendamentoEntrega}, ${textoAreaTexto}`
       : agendamentoEntrega;

      await updateDoc(empresaRef, {
        nomeComprador,
        emailComprador,
        telefoneFixoComprador,
        telefoneCelularComprador,
        politicaPagamento,
        agendamentoEntrega: agendamentoEntregaFinal,
        informacoesFiscais,
        icms,
        observacoesCompras,
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
          {"Informações adicionais da empresa:"} {id}
        </Div>
      </Stack>
      <Stack spacing={3}>
        <TextField
          id="nomeComprador"
          label="Nome Comprador"
          value={nomeComprador}
          onChange={(e) => setNomeComprador(e.target.value)}
          variant="filled"
        />
        <TextField
          id="emailComprador"
          label="Email Comprador"
          value={emailComprador}
          onChange={(e) => setEmailComprador(e.target.value)}
          variant="filled"
        />
        <TextField
          id="telefoneFixoComprador"
          label="Telefone Fixo"
          value={telefoneFixoComprador}
          onChange={(e) => setTelefoneFixoComprador(e.target.value)}
          variant="filled"
        />
        <TextField
          id="telefoneCelularComprador"
          label="Telefone Celular Comprador"
          value={telefoneCelularComprador}
          onChange={(e) => setTelefoneCelularComprador(e.target.value)}
          variant="filled"
        />
        <TextareaAutosize
          id="politicaPagamento"
          placeholder="Politica de Pagamento"
          value={politicaPagamento}
          onChange={(e) => setPoliticaPagamento(e.target.value)}
          variant="filled"
          className="textAreaStyle"
          minRows={3}
        />
        
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Agendamento Entrega:
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={agendamentoEntrega}
        onChange={handleRadioChange}
        name="radio-buttons-group"
      >
        <FormControlLabel value="sim" control={<Radio />} label="Sim" />
        <FormControlLabel value="nao" control={<Radio />} label="Não" />
      </RadioGroup>
    </FormControl>

    {mostrarAreaTexto && (
      <TextareaAutosize
        placeholder="Texto Agendamento Entrega"
        value={textoAreaTexto}
        onChange={(e) => setTextoAreaTexto(e.target.value)}
        variant="filled"
        className="textAreaStyle"
        minRows={3}
      />
    )}
        <TextareaAutosize
          id="informacoesFiscais"
          placeholder="Informações Fiscais"
          value={informacoesFiscais}
          onChange={(e) => setInformacoesFiscais(e.target.value)}
          variant="filled"
          className="textAreaStyle"
          minRows={3}
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Contribuinte ICMS:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={icms}
            onChange={(e) => setIcms(e.target.value)}
            name="radio-buttons-group"
          >
            <FormControlLabel value="sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="nao" control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>
        <TextareaAutosize
          id="observacoesCompras"
          placeholder="Observações"
          value={observacoesCompras}
          onChange={(e) => setObservacoesCompras(e.target.value)}
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

// Chame esta função após o usuário clicar em "Salvar" na página de edição
export default EditarCompras;
