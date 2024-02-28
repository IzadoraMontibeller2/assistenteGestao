import React, { useCallback } from "react";
import MenuHeader from "../components/menuInicial";
import {
  Typography,
  Button,
  Paper,
  TableContainer,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useOportunidades from "../firebase/colections/oportunidades";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as XLSX from "xlsx";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

export default function Oportunidade() {
  const router = useRouter();
  const { oportunidades } = useOportunidades();
  const [visibilidadeRetangulo, setVisibilidadeRetangulo] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOportunidades, setFilteredOportunidades] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Todas"); // Adicione essa variável
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null); // Adicione esta linha



  const handleSearch = useCallback(() => {
    // Selecione oportunidades com base no status selecionado
    const filteredOpportunities = oportunidades.filter((oportunidade) => {
      const status = oportunidade.status.toLowerCase();
      return (
        (selectedStatus === "Todas" || status === selectedStatus.toLowerCase()) &&
        (oportunidade.num.toLowerCase().includes(searchQuery.toLowerCase()) ||
          oportunidade.empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
          oportunidade.vendedor.toLowerCase().includes(searchQuery.toLowerCase()))
        // Adicione outros campos aqui, se necessário
      );
    });
    setFilteredOportunidades(filteredOpportunities);
  }, [oportunidades, selectedStatus, searchQuery]);
  
  useEffect(() => {
    if (oportunidades) {
      handleSearch();
    }
  }, [oportunidades, selectedStatus, handleSearch]); // Adicione selectedStatus e handleSearch como dependências
  
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleFilter = (status) => {
    setSelectedStatus(status.toLowerCase()); // Defina o tipo selecionado
    handleSearch(); // Atualize as oportunidades com base no status selecionado
    handleFilterMenuClose(); // Feche o menu
  };

  const resetFilter = () => {
    setSelectedStatus("Todas");
    handleSearch(); // Atualize as oportunidades com base no status selecionado
    handleFilterMenuClose(); // Feche o menu
  };

  const onClickNovo = async () => {
    router.push("/novaOportunidade");
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
      XLSX.utils.book_append_sheet(wb, ws, "Oportunidades");

      XLSX.writeFile(wb, "oportunidades.xlsx");
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
        <Stack display={"flex"} direction={"row"}>
          <IconButton aria-label="filter" onClick={handleFilterMenuOpen}>
            <FilterListIcon color="primary" fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={filterMenuAnchor}
            open={Boolean(filterMenuAnchor)}
            onClose={handleFilterMenuClose}
          >
            <MenuItem onClick={() => handleFilter("Abertura")}>
              Abertura
            </MenuItem>
            <MenuItem onClick={() => handleFilter("Andamento")}>
              Andamento
            </MenuItem>
            <MenuItem onClick={() => handleFilter("Futuro")}>
              Futuro
            </MenuItem>
            <MenuItem onClick={() => handleFilter("Finalizada")}>
              Finalizada
            </MenuItem>
            <MenuItem onClick={() => handleFilter("Cancelada")}>
              Cancelada
            </MenuItem>
            <MenuItem onClick={() => handleFilter("Pausa")}>
              Pausa
            </MenuItem>
            <MenuItem onClick={resetFilter}>Limpar Filtros</MenuItem>
          </Menu>

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
        </Stack>
        <Div>{"Oportunidades"}</Div>
        <Stack display={"flex"} flexDirection={"row"}>
          <Button onClick={onClickNovo} variant="contained">
            Adicionar oportunidade
          </Button>
          <Button
            sx={{ marginLeft: 3 }}
            variant="contained"
            onClick={() => exportToExcel(oportunidades)}
          >
            Excel
          </Button>
        </Stack>
      </Stack>
      {filteredOportunidades && filteredOportunidades.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Data de Cadastro</TableCell>
                <TableCell>Vendedor</TableCell>
                <TableCell>Visualizar</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOportunidades &&
                filteredOportunidades.map((oportunidades) => (
                  <React.Fragment key={oportunidades.id}>
                    <TableRow key={oportunidades.id}>
                      <TableCell>{oportunidades.num}</TableCell>
                      <TableCell>{oportunidades.empresa}</TableCell>
                      <TableCell>{oportunidades.status}</TableCell>
                      <TableCell>{oportunidades.tipo}</TableCell>
                      <TableCell>{oportunidades.motivo}</TableCell>
                      <TableCell>{oportunidades.dataCadastro}</TableCell>
                      <TableCell>{oportunidades.vendedor}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            // Toggle a visibilidade do retângulo ao clicar no ícone do olho
                            setVisibilidadeRetangulo((prevState) => ({
                              ...prevState,
                              [oportunidades.id]: !prevState[oportunidades.id],
                            }));
                          }}
                        >
                          {visibilidadeRetangulo[oportunidades.id] ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            router.push(`/oportunidade/${oportunidades.id}`);
                          }}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                    {visibilidadeRetangulo[oportunidades.id] && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          {/* Conteúdo do retângulo abaixo da linha da empresa */}
                          <Stack
                            display={"flex"}
                            justifyContent={"space-between"}
                            flexDirection={"row"}
                            alignItems={"center"}
                          >
                            <Stack marginRight={2}>
                              Oportunidade: {oportunidades.oportun}
                            </Stack>
                            <Stack marginRight={2}>
                              Link Compras: {oportunidades.linkCompras}
                            </Stack>
                            <Stack marginRight={2}>
                              Link Comercial: {oportunidades.linkComercial}
                            </Stack>
                            <Stack marginRight={2}>
                              Link Atendimentos: {oportunidades.linkAtendimento}
                            </Stack>
                            <Stack marginRight={2}>
                              Link Projetos: {oportunidades.linkProjetos}
                            </Stack>
                            <Stack>
                              Link externo: {oportunidades.linkExternos}
                            </Stack>
                            <Button
                              variant="contained"
                              onClick={() => {
                                router.push(
                                  `/oportunidadeLinks/${oportunidades.id}`
                                );
                              }}
                            >
                              editar
                            </Button>
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
        <Typography>Nenhuma oportunidade cadastrada.</Typography>
      )}
    </>
  );
}
