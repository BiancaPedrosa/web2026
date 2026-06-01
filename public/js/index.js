// Importando as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Configuração do projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdH2PwoUOK1TbInSPn4MeqFRsWFtg2O7k",
  authDomain: "web2026-53761.firebaseapp.com",
  projectId: "web2026-53761",
  storageBucket: "web2026-53761.firebasestorage.app",
  messagingSenderId: "860920246692",
  appId: "1:860920246692:web:680dfa6b26f30c8c095131"
};

// Inicializa o Firebase e o Banco de Dados
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Pega a referência do corpo da tabela no HTML
const tabelaMusicas = document.getElementById("tabela-musicas");

// Referência para o nó 'Musicas' no banco
const musicasRef = ref(db, 'Musicas');

// Listener em tempo real para exibir os dados na tabela
onValue(musicasRef, (snapshot) => {
    // Limpa a tabela antes de preencher
    tabelaMusicas.innerHTML = ''; 

    if (snapshot.exists()) {
        // Itera sobre o snapshot e cria uma linha (<tr>) para cada música
        snapshot.forEach((data) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${data.key}</strong></td>
                <td>${data.val().titulo}</td>
                <td>${data.val().artista}</td>
            `;
            tabelaMusicas.appendChild(tr);
        });
    } else {
        // Se não houver músicas no banco
        tabelaMusicas.innerHTML = '<tr><td colspan="3" class="text-center py-3">Nenhuma música cadastrada no momento.</td></tr>';
    }
}, (error) => {
    console.error("Erro ao ler dados do Realtime Database:", error);
    tabelaMusicas.innerHTML = '<tr><td colspan="3" class="text-center text-danger py-3">Erro ao carregar as músicas.</td></tr>';
});