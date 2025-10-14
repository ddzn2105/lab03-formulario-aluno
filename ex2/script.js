let lista = [];

function cadastrar() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const notaFinal = document.getElementById('notaFinal').value;
        lista = [];
        lista.push({ nome, idade, curso, notaFinal });
        
        const tbody = document.getElementById('tabela');
        lista.forEach(element => {
            const tr = document.createElement('tr');
            const tdNome = document.createElement('td');
            tdNome.textContent = element.nome;
            const tdIdade = document.createElement('td');
            tdIdade.textContent = element.idade;
            const tdCurso = document.createElement('td');
            tdCurso.textContent = element.curso;
            const tdNotaFinal = document.createElement('td');
            tdNotaFinal.textContent = element.notaFinal;
            const tdBtn = document.createElement('td');

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', function() {
                tbody.removeChild(tr);
            });

            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', function() {
                document.getElementById('nome').value = element.nome;
                document.getElementById('idade').value = element.idade;
                document.getElementById('curso').value = element.curso;
                document.getElementById('notaFinal').value = element.notaFinal;
                tbody.removeChild(tr);
            });
            
            tr.appendChild(tdNome);
            tr.appendChild(tdIdade);
            tr.appendChild(tdCurso);
            tr.appendChild(tdNotaFinal);
            tdBtn.appendChild(btnEditar);
            tdBtn.appendChild(btnExcluir);
            tr.appendChild(tdBtn);
            tbody.appendChild(tr);
        });
    };