
// CLASSE ALUNO
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }
}

// CLASSE CONTROLADORA
class AlunoController {
    constructor() {
        this.alunos = [];
        this.editIndex = null;
        this.tbody = document.getElementById('tabela');
    }

    cadastrar(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const curso = document.getElementById('curso').value;
        const notaFinal = document.getElementById('notaFinal').value;

        if (this.editIndex !== null) {
            // Editando aluno existente
            this.alunos[this.editIndex] = new Aluno(nome, idade, curso, notaFinal);
            this.editIndex = null;
        } else {
            // Novo aluno
            this.alunos.push(new Aluno(nome, idade, curso, notaFinal));
        }
        this.mostrarNaTabela();
        this.limparFormulario();
    }

    excluir(index) {
        this.alunos.splice(index, 1);
        this.mostrarNaTabela();
    }

    editar(index) {
        const aluno = this.alunos[index];
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('notaFinal').value = aluno.notaFinal;
        this.editIndex = index;
    }

    mostrarNaTabela() {
        this.tbody.innerHTML = '';
        this.alunos.forEach((aluno, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.notaFinal}</td>
                <td>
                    <button type="button" onclick="controller.editar(${index})">Editar</button>
                    <button type="button" onclick="controller.excluir(${index})">Excluir</button>
                </td>
            `;
            this.tbody.appendChild(tr);
        });
    }

    limparFormulario() {
        document.getElementById('nome').value = '';
        document.getElementById('idade').value = '';
        document.getElementById('curso').value = '';
        document.getElementById('notaFinal').value = '';
    }
}

// Instancia global para uso no HTML
const controller = new AlunoController();
