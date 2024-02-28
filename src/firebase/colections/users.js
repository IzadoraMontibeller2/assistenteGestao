import { db } from "@/firebase/db";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  query,
  onSnapshot
} from "firebase/firestore";
import { useState, useEffect } from "react";

async function criar(user) {
  await setDoc(doc(db, "users", user.email), {
    ...user,
    id: user.email,
  });
}

async function editar(usersId, novosDados) {
  console.log("Editar user -> ", usersId);
  console.log("Data -> ", novosDados);
  // await setDoc(doc(db, "users", usersId), novosDados);
}

async function excluir(userId) {
  await deleteDoc(doc(db, "users", userId))

  return;
}


// Hook personalizado para manipular e listar clientes do banco
export default function useUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      const allDocs = [];
      querySnapshot.forEach((doc) => {
        allDocs.push(doc.data());
      });
    //   console.log("Todos os docs: ", allDocs);
      setUsers(allDocs);
    });
  }, []);

  return {
    criar,
    excluir,
    users,
    editar,
  };
}