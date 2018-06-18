
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
    },

    getPy2: () => {
        var deprecateds = [];
        
        deprecateds.push(new Deprecated('atof', 'Passe a usar a função float() passando uma string para obeter o mesmo efeito', undefined));
        deprecateds.push(new Deprecated('atoi', 'Passe a usar a função int() passando uma string para obeter o mesmo efeito', undefined));
        deprecateds.push(new Deprecated('atol', 'Passe a usar a função long() passando uma string para obeter o mesmo efeito', undefined));
        deprecateds.push(new Deprecated('capitalize', 'Deixou de ser utilizado por mau uso', undefined));
        deprecateds.push(new Deprecated('lower', 'Deixou de ser utilizado por mau uso', undefined));
        deprecateds.push(new Deprecated('expandtabs', 'Não aceita diferente de strings e não suporta caracteres especiais', undefined));
        deprecateds.push(new Deprecated('join', undefined, undefined));
        deprecateds.push(new Deprecated('joinfields', undefined, undefined));
        deprecateds.push(new Deprecated('lstrip', undefined, undefined));
        deprecateds.push(new Deprecated('rstrip', undefined, undefined));
        deprecateds.push(new Deprecated('strip', undefined, undefined));
        deprecateds.push(new Deprecated('swapcase', undefined, undefined));
        deprecateds.push(new Deprecated('ljust', undefined, undefined));
        deprecateds.push(new Deprecated('rjust', undefined, undefined));
        deprecateds.push(new Deprecated('linuxaudiodev', 'Deixou de ser utilizado por incompatibilidade de sistemas operacionais', 'Passe a utilizar ossaudiodev'));
        deprecateds.push(new Deprecated('rotor', 'Usa algoritmo de criptografia não seguro', 'Utilizar módulos de AES'));

        return deprecateds;
    }
};