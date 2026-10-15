
document.addEventListener("DOMContentLoaded", () => {
    const produto = {
        nome: "Vestido de Veludo Manga Longa",
        telefone: "5511984440225"
    };

    // GALERIA
    const imagens = [
        "../imagens/natal2.jpeg",
        "../imagens/roupanatal2_5.png"
    ];

    const imagemPrincipal = document.getElementById("imagemPrincipal");
    const contador = document.getElementById("contador");
    const miniaturas = [...document.querySelectorAll(".miniatura")];

    let imagemAtual = 0;

    function atualizarImagem(indice) {
        imagemAtual = (indice + imagens.length) % imagens.length;

        imagemPrincipal.src = imagens[imagemAtual];
        contador.textContent = `${imagemAtual + 1} / ${imagens.length}`;

        miniaturas.forEach((miniatura, i) => {
            const ativa = i === imagemAtual;

            miniatura.classList.toggle("ativa", ativa);
            miniatura.setAttribute("aria-pressed", String(ativa));
        });
    }

    miniaturas.forEach((miniatura, indice) => {
        miniatura.addEventListener("click", () => {
            atualizarImagem(indice);
        });
    });

    document.querySelector(".anterior").addEventListener("click", () => {
        atualizarImagem(imagemAtual - 1);
    });

    document.querySelector(".proxima").addEventListener("click", () => {
        atualizarImagem(imagemAtual + 1);
    });

    // SELEÇÃO DE CORES
    let corAtual = "Rosa bebê";
    let tamanhoAtual = "";

    document.querySelectorAll(".cor-opcao").forEach((botao) => {
        botao.addEventListener("click", () => {
            corAtual = botao.dataset.cor;

            document.querySelectorAll(".cor-opcao").forEach((opcao) => {
                const selecionada = opcao === botao;

                opcao.classList.toggle("selecionada", selecionada);
                opcao.setAttribute("aria-pressed", String(selecionada));
            });

            document.getElementById("corSelecionada").textContent =
                `— ${corAtual}`;

            atualizarAviso();
        });
    });

    // SELEÇÃO DE TAMANHOS
    document.querySelectorAll(".tamanho-opcao").forEach((botao) => {
        botao.addEventListener("click", () => {
            tamanhoAtual = botao.dataset.tamanho;

            document.querySelectorAll(".tamanho-opcao").forEach((opcao) => {
                const selecionado = opcao === botao;

                opcao.classList.toggle("selecionado", selecionado);
                opcao.setAttribute("aria-pressed", String(selecionado));
            });

            document.getElementById("tamanhoSelecionado").textContent =
                `— ${tamanhoAtual}`;

            atualizarAviso();
        });
    });

    function atualizarAviso() {
        const aviso = document.getElementById("avisoWhatsApp");

        if (corAtual && tamanhoAtual) {
            aviso.textContent =
                "Cor e tamanho selecionados. Você já pode continuar.";
        } else if (!tamanhoAtual) {
            aviso.textContent = "Selecione o tamanho desejado.";
        } else {
            aviso.textContent = "Selecione a cor desejada.";
        }
    }

    // WHATSAPP COM LINK DO PRODUTO
    document.getElementById("botaoWhatsApp").addEventListener("click", () => {
        const aviso = document.getElementById("avisoWhatsApp");

        if (!corAtual || !tamanhoAtual) {
            aviso.textContent =
                "Por favor, selecione a cor e o tamanho antes de continuar.";

            document.querySelector(
                tamanhoAtual ? ".opcoes-cores" : ".opcoes-tamanhos"
            ).scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }

        const linkProduto = window.location.href;

        const mensagem =
            `Olá! Tudo bem? \n\n` +
            `Gostaria de reservar este produto:\n` +
            `${produto.nome}\n` +
            `Link do produto: ${linkProduto}\n\n` +
            `Cor escolhida: ${corAtual}\n` +
            `Tamanho escolhido: ${tamanhoAtual}\n\n` +
            `Poderia confirmar a disponibilidade e me orientar ` +
            `sobre os próximos passos para finalizar a compra?\n\n` +
            `Agradeço desde já! `;

        const url =
            `https://wa.me/${produto.telefone}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank", "noopener,noreferrer");
    });

    atualizarImagem(0);
});
