
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

        deprecateds.push(new Deprecated('phpinfo',
            'Para esses casos, não há um risco totalmente explicito, mas caso um atacante poder verificar o retorno de uma dessas funções, junto com outras informações adquiridas pode torna-la perigosa',
            'Nunca deixar visível publicamente o resultado dessas funções ou arquitetar bem o sistema para que caso seja vazada um desses retornos, o atacante não possa utiliza-lo de maneira maliciosa'));
        deprecateds.push(new Deprecated('exec',
            'Retorna a última linha de comando do output',
            undefined));
        deprecateds.push(new Deprecated('passthru',
            'Passa o comando do output diretamente para o navegador e retorna a última linha',
            undefined));
        deprecateds.push(new Deprecated('system',
            'Passa o comando do output diretamente para o navegador e retorna a última linha',
            undefined));
        deprecateds.push(new Deprecated('shell_exec',
            'Retorna o comando do output',
            undefined));
        deprecateds.push(new Deprecated('`` (backticks)',
            'Retorna o comando do output',
            undefined));

        deprecateds.push(new Deprecated('popen', 'Abre um pipe de leitura ou escrita para o proceso de um comando', undefined));
        deprecateds.push(new Deprecated('proc_open', 'Abre um pipe de leitura ou escrita para o proceso de um comando', undefined));
        deprecateds.push(new Deprecated('pcntl_exec', 'Executa um programa', undefined));
        deprecateds.push(new Deprecated('eval()', 'Computa uma string como um código PHP, possível passar código malicioso', undefined));
        deprecateds.push(new Deprecated('assert()', 'Computa uma string como um código PHP, possível passar código malicioso', undefined));
        deprecateds.push(new Deprecated('preg_replace', 'Computa uma string como um código PHP, possível passar código malicioso', undefined));
        deprecateds.push(new Deprecated('create_function()', 'Computa uma string como um código PHP, possível passar código malicioso', undefined));
        deprecateds.push(new Deprecated('include()', 'Pode acabar processnado códigos PHP do arquivo, dependendo da sua extensão e configuração do servidor', undefined));
        deprecateds.push(new Deprecated('include_once()', 'Pode acabar processnado códigos PHP do arquivo, dependendo da sua extensão e configuração do servidor', undefined));
        deprecateds.push(new Deprecated('require()', 'Pode acabar processnado códigos PHP do arquivo, dependendo da sua extensão e configuração do servidor', undefined));
        deprecateds.push(new Deprecated('require_once()', 'Pode acabar processnado códigos PHP do arquivo, dependendo da sua extensão e configuração do servidor', undefined));
        deprecateds.push(new Deprecated('extract()', 'Essa função recebe um array como parâmetro e em seguida compila o conteúdo do array, sendo possível usar as viariáveis declaradas inicialmente apenas dentro dele. Abre a porta para attacks no register_global', undefined));
        deprecateds.push(new Deprecated('parse_str()', 'Funciona como extract() se há apenas um argumento', undefined));

        return deprecateds;
    }
};