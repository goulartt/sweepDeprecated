
'use strict';
class Deprecated {
    constructor(funcao, motivo, solucao) {
        this.funcao = funcao;
        this.motivo = motivo;
        this.solucao = solucao;
    }
}

module.exports = {
    getPhp: () => {
        var deprecateds = [];
        var deprecated = new Deprecated('phpinfo',
            'Para esses casos, não há um risco totalmente explicito, mas caso um atacante poder verificar o retorno de uma dessas funções, junto com outras informações adquiridas pode torna-la perigosa',
            'Nunca deixar visível publicamente o resultado dessas funções ou arquitetar bem o sistema para que caso seja vazada um desses retornos, o atacante não possa utiliza-lo de maneira maliciosa');
        
        deprecateds.push(deprecated);
        deprecateds.push(new Deprecated('exec',
                'Retorna a última linha de comando do output',
                undefined));

        return deprecateds;
    }
};