import { db } from "@/firebase/db";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  query,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { useState, useEffect } from "react";

async function criar(produto) {
  await setDoc(doc(db, "produtos", produto.sku), {
    ...produto,
    id: produto.sku,
  });
}

async function editar(produtoId, novosDados) {
  const produtoRef = doc(db, "produtos", produtoId);
  await updateDoc(produtoRef, novosDados);
}


async function excluir(produtoId) {
  await deleteDoc(doc(db, "produtos", produtoId));

  return;
}


// Hook personalizado para manipular e listar produtos do banco
export default function useProdutos() {
  const [produtos, setProdutos] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "produtos"));
    onSnapshot(q, (querySnapshot) => {
      const allDocs = [];
      querySnapshot.forEach((doc) => {
        allDocs.push(doc.data());
      });
    //   console.log("Todos os docs: ", allDocs);
      setProdutos(allDocs);
    });
  }, []);

  return {
    criar,
    excluir,
    produtos,
    editar,
  };
}