import Conta from "../types/conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarMoeda, formatarData } from "../utils/formaters.js";
import { TipoTransacao } from "../types/TipoTransacao.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();
function renderizarExtrato(): void {
    const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes: string = "";

    for (let grupoTransacao of gruposTransacoes) 
    {
        let htmlTransacaoItem: string = "";
        for (let transacao of grupoTransacao.transacoes)
        {
            if (transacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || transacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {

            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                            <span class="tipo">${transacao.tipoTransacao}</span>
                            <strong class="valor" style="color: red">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `;
            } else if (transacao.tipoTransacao == TipoTransacao.DEPOSITO) {
                htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                            <span class="tipo">${transacao.tipoTransacao}</span>
                            <strong class="valor" style="color: green">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `;
            }

        }

        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group" style="color: black">${grupoTransacao.label}</strong>
                ${htmlTransacaoItem}
            </div>
        `;
    }

    if (htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = "<div>Não há transações registradas</div>"
    }

    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
    atualizar(): void {
        renderizarExtrato();
    }
}

export default ExtratoComponent;