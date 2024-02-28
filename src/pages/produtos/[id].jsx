import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/db";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import useProdutos from "@/firebase/colections/produtos";
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

export default function EditarProdutos() {
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));
  const router = useRouter();
  const { id } = router.query;
  console.log("banana", id);

  const [codigo, setCodigo] = useState("");
  const [sku, setSku] = useState("");
  const [pn, setPn] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ncm, setNcm] = useState("");
  const [cest, setCest] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [foto, setFoto] = useState("");
  const [peso, setPeso] = useState("");
  const [pesoBruto, setPesoBruto] = useState("");
  const [pesoLiquido, setPesoLiquido] = useState("");
  const [dimensao, setDimensao] = useState("");
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [profundidade, setProfundidade] = useState("");
  const [datasheet, setDatasheet] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    if (id) {
      // Carregar os dados do produto com base no ID
      const carregarDadosDoProduto = async () => {
        const produtoRef = doc(db, "produtos", id);

        try {
          const docSnapshot = await getDoc(produtoRef);
          if (docSnapshot.exists()) {
            const produtoData = docSnapshot.data();

            // Defina os valores iniciais dos campos "Link Comercial" e "Link Atendimento"
            setCodigo(produtoData.codigo || "");
            setSku(produtoData.sku || "");
            setPn(produtoData.pn || "");
            setDescricao(produtoData.descricao || "");
            setNcm(produtoData.ncm || "");
            setCest(produtoData.cest || "");
            setTipoProduto(produtoData.tipoProduto || "");
            setFoto(produtoData.foto || "");
            setPeso(produtoData.peso || "");
            setPesoBruto(produtoData.pesoBruto || "");
            setPesoLiquido(produtoData.pesoLiquido || "");
            setDimensao(produtoData.dimensao || "");
            setLargura(produtoData.largura || "");
            setAltura(produtoData.altura || "");
            setProfundidade(produtoData.profundidade || "");
            setDatasheet(produtoData.datasheet || "");
            setObservacoes(produtoData.observacoes || "");
          } else {
            console.error("Produto não encontrado");
          }
        } catch (error) {
          console.error("Erro ao carregar dados do produto:", error);
        }
      };

      carregarDadosDoProduto();
    }
  }, [id]);

  const salvarEdicao = async () => {
    try {
      const produtoRef = doc(db, "produtos", id);

      await updateDoc(produtoRef, {
        codigo,
        sku,
        pn,
        descricao,
        ncm,
        cest,
        tipoProduto,
        foto,
        peso,
        pesoBruto,
        pesoLiquido,
        dimensao,
        largura,
        altura,
        profundidade,
        datasheet,
        observacoes,
      });

      console.log("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };


  const onClickNovo = async () => {
    router.push("/Produtos");
  };


  return (
    <>
    <MenuHeader/>
    <Stack marginLeft={70} marginRight={70}>
        <Div>{"Editar Produto"}</Div>
    </Stack>
    <Stack spacing={3}>
        <TextField
        id="codigo"
        label="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        variant="filled"
        />
        <TextField
        id="sku"
        label="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        variant="filled"
        />
        <TextField
        id="pn"
        label="PN"
        value={pn}
        onChange={(e) => setPn(e.target.value)}
        variant="filled"
        />
        <TextField
        id="descricao"
        label="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        variant="filled"
        />
        <TextField
        id="ncm"
        label="NCM"
        value={ncm}
        onChange={(e) => setNcm(e.target.value)}
        variant="filled"
        />
        <TextField
        id="cest"
        label="Cest"
        value={cest}
        onChange={(e) => setCest(e.target.value)}
        variant="filled"
        />
        <TextField
        id="tipoProduto"
        label="Tipo de Produto"
        value={tipoProduto}
        onChange={(e) => setTipoProduto(e.target.value)}
        variant="filled"
        />
        <TextField
        id="foto"
        label="Foto"
        value={foto}
        onChange={(e) => setFoto(e.target.value)}
        variant="filled"
        />
        <TextField
        id="peso"
        label="Peso"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        variant="filled"
        />
        <TextField
        id="pesoBruto"
        label="Peso Bruto"
        value={pesoBruto}
        onChange={(e) => setPesoBruto(e.target.value)}
        variant="filled"
        />
        <TextField
        id="pesoLiquido"
        label="Peso Liquido"
        value={pesoLiquido}
        onChange={(e) => setPesoLiquido(e.target.value)}
        variant="filled"
        />
        <TextField
        id="dimensao"
        label="Dimensão"
        value={dimensao}
        onChange={(e) => setDimensao(e.target.value)}
        variant="filled"
        />
        <TextField
        id="largura"
        label="Largura"
        value={largura}
        onChange={(e) => setLargura(e.target.value)}
        variant="filled"
        />
        <TextField
        id="altura"
        label="Altura"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
        variant="filled"
        />
        <TextField
        id="profundidade"
        label="Profundidade"
        value={profundidade}
        onChange={(e) => setProfundidade(e.target.value)}
        variant="filled"
        />
        <TextField
        id="datasheet"
        label="Datasheet"
        value={datasheet}
        onChange={(e) => setDatasheet(e.target.value)}
        variant="filled"
        />
        <TextareaAutosize
         id="observacoes"
         placeholder="Observações"
         value={observacoes}
         onChange={(e) => setObservacoes(e.target.value)}
         className="textAreaStyle"
         minRows={3}
        />
        <Stack margin={3}>
          <Button variant="contained" onClick={() => {
            salvarEdicao();
            onClickNovo();
          }} sx={{ marginLeft: 75, marginRight: 75 }}>
            Salvar
          </Button>
        </Stack>
    </Stack>
    </>
  );
}
