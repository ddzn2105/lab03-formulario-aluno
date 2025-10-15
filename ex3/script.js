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
        this.editIndex = null; // Adiciona controle do índice em edição
        this.init();
    }

    init(){
        document.getElementById("btnCadastrar").addEventListener("click", (e) => this.salvar(e));
        document.getElementById("btnExcluir").addEventListener("click", (e) => this.excluir(e));
        document.getElementById("btnEditar").addEventListener("click", (e) => this.editar(e));
    }

    salvar(e){
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

    toString() {
        return `Aluno: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}, Aprovado: ${this.isAprovado(this.notaFinal) ? 'Sim' : 'Não'}`;
    }
}

// Instancia global para uso no HTML
const controller = new AlunoController();
