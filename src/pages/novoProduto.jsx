import MenuHeader from "../components/menuInicial";
import React, { useState } from "react";
import {
  Button,
  TextField,
  TextareaAutosize,
  InputAdornment,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import useProdutos from "../firebase/colections/produtos";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

export default function NovoProduto() {
  const router = useRouter();
  const { criar } = useProdutos();
  const [produtoData, setProdutoData] = useState({
    codigo: "",
    sku: "",
    pn: "",
    descricao: "",
    ncm: "",
    cest: "",
    tipoProduto: "",
    peso: "",
    pesoBruto: "",
    pesoLiquido: "",
    dimensao: "",
    largura: "",
    altura: "",
    profundidade: "",
    foto: "",
    datasheet: "",
    observacoes: "",
  });


  const cadastrarNovoProduto = async () => {
    // Certifique-se de que o campo "empresa" não esteja vazio antes de criar o contato
    if (produtoData.sku) {
      await criar(produtoData); // Criar a função criar que deve retornar true em caso de sucesso
  
      setProdutoData({
        codigo: "",
      sku: "",
      pn: "",
      descricao: "",
      ncm: "",
      cest: "",
      tipoProduto: "",
      peso: "",
      pesoBruto: "",
      pesoLiquido: "",
      dimensao: "",
      largura: "",
      altura: "",
      profundidade: "",
      foto: "",
      datasheet: "",
      observacoes: "",      
      }); 
      router.push("/Produtos");
    } else {
      // Exiba uma mensagem de erro ou lógica apropriada se o campo "sku" estiver vazio
      alert("Por favor, selecione uma digite o SKU.");
    }
  };
    

  const handleTextFieldChange = (event) => {
    const { id, value } = event.target;
    setProdutoData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

 
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));

  return (
    <>
      <MenuHeader />
      <Stack marginLeft={70} marginRight={70}>
        <Div>{"Cadastrar Produto"}</Div>
      </Stack>

      <Stack spacing={3}>
      <TextField
          id="codigo"
          label="Código"
          value={produtoData.codigo}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="sku"
          label="SKU"
          value={produtoData.sku}
          onChange={handleTextFieldChange}
          variant="filled"
        />
      <TextField
          id="pn"
          label="PN"
          value={produtoData.pn}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="descricao"
          label="Descrição"
          value={produtoData.descricao}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="ncm"
          label="NCM"
          value={produtoData.ncm}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="cest"
          label="CEST"
          value={produtoData.cest}
          onChange={handleTextFieldChange}
          variant="filled"
        />
      <TextField
          id="tipoProduto"
          label="Tipo de Produto"
          value={produtoData.tipoProduto}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="peso"
          label="Peso"
          value={produtoData.peso}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="pesoBruto"
          label="Peso Bruto"
          value={produtoData.pesoBruto}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="pesoLiquido"
          label="Peso Liquido"
          value={produtoData.pesoLiquido}
          onChange={handleTextFieldChange}
          variant="filled"
        />

      <TextField
          id="dimensao"
          label="Dimensão"
          value={produtoData.dimensao}
          onChange={handleTextFieldChange}
          variant="filled"
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          id="largura"
          label="Largura"
          value={produtoData.largura}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="altura"
          label="Altura"
          value={produtoData.altura}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="profundidade"
          label="Profundidade"
          value={produtoData.profundidade}
          onChange={handleTextFieldChange}
          variant="filled"
        />
      <TextField
          id="foto"
          label="Foto"
          value={produtoData.foto}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextField
          id="datasheet"
          label="Datasheet"
          value={produtoData.datasheet}
          onChange={handleTextFieldChange}
          variant="filled"
        />
        <TextareaAutosize
          id="observacoes"
          placeholder="Observações"
          value={produtoData.observacoes}
          onChange={handleTextFieldChange}
          className="textAreaStyle"
          minRows={3}
        />
      </Stack>

      <Stack margin={3} marginLeft={75} marginRight={75}>
        <Button
          onClick={() => {
            cadastrarNovoProduto();
          }}
          variant="contained"
        >
          Salvar
        </Button>
      </Stack>
    </>
  );
}
