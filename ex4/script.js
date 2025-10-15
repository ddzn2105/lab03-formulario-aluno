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
        this.init();
    }

    init() {
        document.getElementById("btnCadastrar").addEventListener("click", (e) => this.salvar(e));
    }

    salvar(e) {
        e.preventDefault();
        let nome = document.getElementById("nome").value;
        let idade = document.getElementById("idade").value;
        let curso = document.getElementById("curso").value;
        let notaFinal = document.getElementById("notaFinal").value;

        if (this.editIndex !== null) {
            // Atualiza aluno existente
            this.alunos[this.editIndex] = new Aluno(nome, idade, curso, notaFinal);
            this.editIndex = null;
        } else {
            // Adiciona novo aluno
            const aluno = new Aluno(nome, idade, curso, notaFinal);
            this.alunos.push(aluno);
        }
        this.atualizarTabela();
        this.limparFormulario();
        alert("Aluno salvo com sucesso!");
        
    }

    atualizarTabela() {
        const tabela = document.getElementById('tabela');
        tabela.innerHTML = '';
        this.alunos.forEach((aluno, index) => {
            const row = tabela.insertRow();
            row.insertCell(0).innerText = index + 1;
            row.insertCell(1).innerText = aluno.nome;
            row.insertCell(2).innerText = aluno.idade;
            row.insertCell(3).innerText = aluno.curso;
            row.insertCell(4).innerText = aluno.notaFinal;

            const btnEditar = document.createElement('button');
            btnEditar.innerText = 'Editar';
            btnEditar.type = 'button';
            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.type = 'button';
            const actionCell = row.insertCell(5);
            actionCell.appendChild(btnEditar);
            actionCell.appendChild(btnExcluir);

            btnEditar.addEventListener('click', () => this.editar(index));
            btnExcluir.addEventListener('click', () => this.excluir(index));
        });
    }

    editar(index) {
        // Preenche o formulário com os dados do aluno selecionado
        const aluno = this.alunos[index];
        document.getElementById("nome").value = aluno.nome;
        document.getElementById("idade").value = aluno.idade;
        document.getElementById("curso").value = aluno.curso;
        document.getElementById("notaFinal").value = aluno.notaFinal;
        this.editIndex = index;
    }

    excluir(index) {
        this.alunos.splice(index, 1);
        this.atualizarTabela();
        // Se estava editando esse aluno, limpa o formulário e o índice
        if (this.editIndex === index) {
            this.limparFormulario();
            this.editIndex = null;
        }
        alert("Aluno excluído com sucesso!");
    }

    // Limpa os campos do formulário
    limparFormulario() {
        document.getElementById("nome").value = '';
        document.getElementById("idade").value = '';
        document.getElementById("curso").value = '';
        document.getElementById("notaFinal").value = '';
    }

    mediaDasNotas() {
        let total = this.alunos.reduce((acumulador, aluno) => acumulador + parseFloat(aluno.notaFinal), 0);
        return (this.alunos.length === 0) ? 0 : (total / this.alunos.length).toFixed(2);
    }

    mediaDasIdades() {
        let total = this.alunos.reduce((acumulador, aluno) => acumulador + parseInt(aluno.idade), 0);
        return (this.alunos.length === 0) ? 0 : (total / this.alunos.length).toFixed(2);
    }

    listarAlunosEmOrdemAlfabetica() {
        return this.alunos.slice().sort((a, b) => a.nome.localeCompare(b.nome));
    }

    qtdDeAlunosPorCurso(curso) {
        return this.alunos.filter(aluno => aluno.curso === curso).length;
    }

    listarAprovados() {
        return this.alunos.filter(a => parseFloat(a.notaFinal) >= 7);
    }

    mostrarAprovados() {
        const aprovados = this.listarAprovados();
        return aprovados.length > 0
            ? "Aprovados: " + aprovados.map(a => a.nome).join(", ")
            : "Nenhum aluno aprovado.";
    }

    mostrarMediaNotas() {
        return "Média das notas finais: " + this.mediaDasNotas();
    }

    mostrarMediaIdades() {
        return "Média das idades: " + this.mediaDasIdades();
    }

    mostrarOrdemAlfabetica() {
        const nomes = this.listarAlunosEmOrdemAlfabetica().map(a => a.nome);
        return nomes.length > 0
            ? "Alunos em ordem alfabética: " + nomes.join(", ")
            : "Nenhum aluno cadastrado.";
    }

    mostrarQtdPorCurso() {
        const cursos = ["JavaScript", "Python", "Java"];
        let texto = "Quantidade de alunos por curso:\n";
        cursos.forEach(curso => {
            texto += `${curso}: ${this.qtdDeAlunosPorCurso(curso)}\n`;
        });
        return texto;
    }

    toString() {
        return `Aluno: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}, Aprovado: ${this.isAprovado(this.notaFinal) ? 'Sim' : 'Não'}`;
    }
}

// Instancia global para uso no HTML
const controller = new AlunoController();

document.getElementById("btnAprovados").onclick = function() {
    document.getElementById("resultado").innerText = controller.mostrarAprovados();
};

document.getElementById("btnMediaNotas").onclick = function() {
    document.getElementById("resultado").innerText = controller.mostrarMediaNotas();
};

document.getElementById("btnMediaIdades").onclick = function() {
    document.getElementById("resultado").innerText = controller.mostrarMediaIdades();
};

document.getElementById("btnOrdemAlfabetica").onclick = function() {
    document.getElementById("resultado").innerText = controller.mostrarOrdemAlfabetica();
};

document.getElementById("btnQtdPorCurso").onclick = function() {
    document.getElementById("resultado").innerText = controller.mostrarQtdPorCurso();
};