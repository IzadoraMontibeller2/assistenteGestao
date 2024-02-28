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
import useContatos from "../firebase/colections/contatos";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as XLSX from "xlsx";
import SearchIcon from "@mui/icons-material/Search";

export default function Contatos() {
  const router = useRouter();
  const { contatos } = useContatos(); // Obtém a lista de contatos do hook
  const [visibilidadeRetangulo, setVisibilidadeRetangulo] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContatos, setFilteredContatos] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredContatos(contatos);
    } else {
      const filteredContatos = contatos.filter((contato) =>
        contato.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContatos(filteredContatos);
    }
  };

  useEffect(() => {
    if (contatos) {
      setFilteredContatos(contatos);
    }
  }, [contatos]);
  

  const onClickNovo = async () => {
    router.push("/novoContato");
  };

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
  }));

  function exportToExcel(data) {
    if (data && data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Contatos");

      XLSX.writeFile(wb, "contatos.xlsx");
    } else {
      console.error("Os dados não estão no formato correto");
    }
  }


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
        <Div>{"Lista de Contatos"}</Div>
        <Stack display={"flex"} flexDirection={"row"}>
          <Button onClick={onClickNovo} variant="contained">
            Adicionar Contato
          </Button>
          <Button
            sx={{ marginLeft: 3 }}
            variant="contained"
            onClick={() => exportToExcel(contatos)}
          >
            Excel
          </Button>
        </Stack>
      </Stack>
      {filteredContatos && filteredContatos.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone Celular</TableCell>
                <TableCell>Telefone Fixo</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Ações</TableCell>
                <TableCell>Visualizar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContatos &&
                filteredContatos.map((contato) => (
                  <React.Fragment key={contato.id}>
                    <TableRow key={contato.id}>
                      <TableCell>{contato.nome}</TableCell>
                      <TableCell>{contato.email}</TableCell>
                      <TableCell>{contato.telefoneCelular}</TableCell>
                      <TableCell>{contato.telefoneFixo}</TableCell>
                      <TableCell>{contato.cargo}</TableCell>
                      <TableCell>{contato.empresa}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            router.push(`/contato/${contato.id}`);
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
                              [contato.id]: !prevState[contato.id],
                            }));
                          }}
                        >
                          {visibilidadeRetangulo[contato.id] ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {visibilidadeRetangulo[contato.id] && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Stack
                            display={"flex"}
                            justifyContent={"space-between"}
                            flexDirection={"row"}
                          >
                            <div>Departamento: {contato.departamento}</div>
                            <div>Aniversario: {contato.aniversario}</div>
                            <div>Linkedin: {contato.linkedin}</div>
                            <div>Observacao: {contato.observacao}</div>
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
        <Typography>Nenhum contato encontrado.</Typography>
      )}
    </>
  );
}