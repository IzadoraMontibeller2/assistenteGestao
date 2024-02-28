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
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Menu,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import useEmpresas from "../firebase/colections/empresas";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as XLSX from "xlsx";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";


export default function Empresas() {
  const router = useRouter();
  const { empresas } = useEmpresas();
  const [visibilidadeRetangulo, setVisibilidadeRetangulo] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState("Todas"); // Adicione essa variável
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null); // Adicione esta linha

  const handleSearch = useCallback(() => {
    const filteredEmpresas = empresas.filter((empresa) => {
      const tipo = empresa.tipo.toLowerCase();
      return (
        (selectedTipo === "Todas" || tipo === selectedTipo.toLowerCase()) &&
        empresa.nomeEmpresa.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredEmpresas(filteredEmpresas);
  }, [empresas, selectedTipo, searchQuery]);

  
  useEffect(() => {
    if (empresas) {
      handleSearch();
    }
  }, [empresas, selectedTipo, handleSearch]);

  

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleFilter = (tipo) => {
    setSelectedTipo(tipo); // Defina o tipo selecionado
    handleFilterMenuClose(); // Feche o menu
    handleSearch(); // Aplique o filtro
  };

  const resetFilter = () => {
    setSelectedTipo("Todas");
    handleSearch(); // Atualize as oportunidades com base no status selecionado
    handleFilterMenuClose(); // Feche o menu
  };

  const onClickNovo = async () => {
    router.push("/novaEmpresa");
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
      XLSX.utils.book_append_sheet(wb, ws, "Empresas");

      XLSX.writeFile(wb, "empresas.xlsx");
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
            <MenuItem onClick={() => handleFilter("Cliente")}>
              Filtar por Cliente
            </MenuItem>
            <MenuItem onClick={() => handleFilter("Fornecedor")}>
              Filtar por Fornecedor
            </MenuItem>
            <MenuItem onClick={() => handleFilter("Canal de Venda")}>
              Filtar por Canal de Venda
            </MenuItem>
            <MenuItem onClick={resetFilter}>Limpar Filtros</MenuItem>
          </Menu>

          <FormControl
            size="small"
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Buscar
            </InputLabel>
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
        <Div>{"Empresas Cadastradas"}</Div>
        <Stack display={"flex"} flexDirection={"row"}>
          <Button onClick={onClickNovo} variant="contained">
            Adicionar Empresa
          </Button>
          <Button
            sx={{ marginLeft: 3 }}
            variant="contained"
            onClick={() => exportToExcel(empresas)}
          >
            Excel
          </Button>
        </Stack>
      </Stack>
      {filteredEmpresas && filteredEmpresas.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome da Empresa</TableCell>
                <TableCell>CNPJ</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Seguimento</TableCell>
                <TableCell>Data de Cadastro</TableCell>
                <TableCell>Solicitante</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Visualizar</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmpresas &&
                filteredEmpresas.map((empresa) => (
                  <React.Fragment key={empresa.id}>
                    <TableRow>
                      <TableCell>{empresa.nomeEmpresa}</TableCell>
                      <TableCell>{empresa.cnpj}</TableCell>
                      <TableCell>{empresa.tipo}</TableCell>
                      <TableCell>{empresa.seguimento}</TableCell>
                      <TableCell>{empresa.dataCadastro}</TableCell>
                      <TableCell>{empresa.solicitante}</TableCell>
                      <TableCell>{empresa.cidade}</TableCell>
                      <TableCell>{empresa.estado}</TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            // Toggle a visibilidade do retângulo ao clicar no ícone do olho
                            setVisibilidadeRetangulo((prevState) => ({
                              ...prevState,
                              [empresa.id]: !prevState[empresa.id],
                            }));
                          }}
                        >
                          {visibilidadeRetangulo[empresa.id] ? (
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
                            router.push(`/empresas/${empresa.id}`);
                          }}
                        >
                          editar
                        </Button>
                      </TableCell>
                    </TableRow>
                    {visibilidadeRetangulo[empresa.id] && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          {/* Conteúdo do retângulo abaixo da linha da empresa */}
                          <Stack
                            display={"flex"}
                            justifyContent={"space-between"}
                            flexDirection={"row"}
                            marginLeft={10}
                          >
                            <Stack display={"flex"} flexDirection={"column"}>
                              <Typography>Compras</Typography>
                              <div>
                                Nome do comprador: {empresa.nomeComprador}
                              </div>
                              <div>Email: {empresa.emailComprador}</div>
                              <div>
                                Telefone Fixo: {empresa.telefoneFixoComprador}
                              </div>
                              <div>
                                Telefone Celular:{" "}
                                {empresa.telefoneCelularComprador}
                              </div>
                              <div>
                                Política de pagamento:
                                {empresa.politicaPagamento}
                              </div>
                              <div>
                                Agendamento entrega:{empresa.agendamentoEntrega}
                              </div>
                              <div>
                                Informações fiscais:{" "}
                                {empresa.informacoesFiscais}
                              </div>
                              <div>Contribuinte ICMS: {empresa.icms}</div>
                              <div>
                                Observações: {empresa.observacoesCompras}
                              </div>
                              <Stack display={"flex"} flexDirection={"row"}>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    router.push(
                                      `/empresaCompras/${empresa.id}`
                                    );
                                  }}
                                >
                                  editar
                                </Button>
                              </Stack>
                            </Stack>
                            <Stack
                              marginLeft={25}
                              marginRight={-20}
                              display={"flex"}
                              flexDirection={"column"}
                            >
                              <Typography>Financeiro e Fiscal</Typography>
                              <div>
                                E-mail para enviar xml: {empresa.emailXml}
                              </div>
                              <div>
                                E-mail para financeiro:{" "}
                                {empresa.emailFinanceiro}
                              </div>
                              <div>
                                Inscrição Estadual: {empresa.insestadual}
                              </div>
                              <div>
                                Inscrição Municipal: {empresa.insmunicipal}
                              </div>
                              <div>Regras para pagamento: {empresa.regras}</div>
                              <div>Banco: {empresa.banco}</div>
                              <div>Agência: {empresa.agencia}</div>
                              <div>Conta: {empresa.conta}</div>
                              <div>Chave PIX: {empresa.pix}</div>
                              <div>Observações: {empresa.observacoes}</div>
                              <div>
                                {empresa.cnpj} - PDF em anexo:{" "}
                                <a
                                  href={empresa.anexar}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Link para o PDF
                                </a>
                              </div>
                              <Stack display={"flex"} flexDirection={"row"}>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    router.push(
                                      `/empresaFinaceiro/${empresa.id}`
                                    );
                                  }}
                                >
                                  editar
                                </Button>
                              </Stack>
                            </Stack>

                            <Stack
                              marginRight={-40}
                              marginLeft={40}
                              display={"flex"}
                              flexDirection={"column"}
                            >
                              <div>Site: {empresa.site}</div>

                              <div>
                                Informações adicionais:{" "}
                                {empresa.informacoesAdicionais}
                              </div>
                              <Stack display={"flex"} flexDirection={"row"}>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    router.push(
                                      `/empresaAdicional/${empresa.id}`
                                    );
                                  }}
                                >
                                  editar
                                </Button>
                              </Stack>
                            </Stack>
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
