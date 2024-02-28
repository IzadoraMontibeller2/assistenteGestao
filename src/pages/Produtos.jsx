import MenuHeader from "../components/menuInicial";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import useProdutos from "../firebase/colections/produtos";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as XLSX from "xlsx";
import SearchIcon from "@mui/icons-material/Search";

export default function Produtos() {
  const router = useRouter();
  const { produtos } = useProdutos();
  const [visibilidadeRetangulo, setVisibilidadeRetangulo] = useState({});
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredProdutos(produtos);
    } else {
      const filteredProdutos = produtos.filter((produto) =>
       ( produto.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        produto.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProdutos(filteredProdutos);
    }
  };

  useEffect(() => {
    if (produtos) {
      setFilteredProdutos(produtos);
    }
  }, [produtos]);

  const onClickNovo = async () => {
    router.push("/novoProduto");
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
      <Stack
        display={"flex"}
        direction={"row"}
        justifyContent={"space-between"}
        margin={2}
      >
        <FormControl
          size="small"
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">Buscar</InputLabel>
          <OutlinedInput
            id="outlined-adornment-Buscar"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FormControl>
        <Div>{"Produtos"}</Div>
        <Button onClick={onClickNovo} variant="contained">
          Adicionar produtos
        </Button>
      </Stack>

      {filteredProdutos && filteredProdutos.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Sku</TableCell>
                <TableCell>PN</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>NCM</TableCell>
                <TableCell>CEST</TableCell>
                <TableCell>Tipo de produto</TableCell>
                <TableCell>Foto</TableCell>
                <TableCell>Ações</TableCell>
                <TableCell>Visualizar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProdutos &&
                filteredProdutos.map((produto) => (
                  <React.Fragment key={produto.id}>
                    <TableRow key={produto.id}>
                      <TableCell>{produto.codigo}</TableCell>
                      <TableCell>{produto.sku}</TableCell>
                      <TableCell>{produto.pn}</TableCell>
                      <TableCell>{produto.descricao}</TableCell>
                      <TableCell>{produto.ncm}</TableCell>
                      <TableCell>{produto.cest}</TableCell>
                      <TableCell>{produto.tipoProduto}</TableCell>
                      <TableCell>{produto.foto}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            router.push(`/produtos/${produto.id}`);
                          }}
                        >
                          Editar
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            setVisibilidadeRetangulo((prevState) => ({
                              ...prevState,
                              [produto.id]: !prevState[produto.id],
                            }));
                          }}
                        >
                          {visibilidadeRetangulo[produto.id] ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {visibilidadeRetangulo[produto.id] && (
                      <TableRow>
                        <TableCell colSpan={10}>
                          <Stack
                            display={"flex"}
                            justifyContent={"space-between"}
                            flexDirection={"row"}
                          >
                            <Stack >Peso: {produto.peso}</Stack>
                            <Stack>PesoBruto: {produto.pesoBruto}</Stack>
                            <Stack>PesoLiquido: {produto.pesoLiquido}</Stack>
                            <Stack>Dimensão: {produto.dimensao}</Stack>
                            <Stack>Largura: {produto.largura}</Stack>
                            <Stack>Altura: {produto.altura}</Stack>
                            <Stack>Profundidade: {produto.profundidade}</Stack>
                            <Stack>Datasheet: {produto.datasheet}</Stack>
                            <Stack>Observações: {produto.observacoes}</Stack>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Nenhum produto encontrado.</Typography>
      )}
    </>
  );
}
