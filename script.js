document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('cadastrar');
    button.addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const curso = document.getElementById('curso').value;
        const notaFinal = document.getElementById('notaFinal').value;
        // Convertendo idade e notaFinal para números
        const idadeNum = parseInt(idade, 10);
        const notaFinalNum = parseFloat(notaFinal);
        lista = [];
        lista.push({ nome, idade: idadeNum, curso, notaFinal: notaFinalNum });
        console.log(`Nome: ${nome}, Idade: ${idadeNum}, Curso: ${curso}, Nota Final: ${notaFinalNum}`);
        
    });
    
});