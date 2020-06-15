# Frontend - Posto Certo

## Descrição

Esta é a parte visual do projeto Posto Certo.

## Pré-requisitos

Os requisitos para o funcionamento adequado do sistema são necesários as seguintes ferramentas:

* Node v14.1.0
* NPM v6.14.4

## Scripts

Na pasta de seu projeto vocẽ deve no terminial:

```{shell}
yarn start
```

A página será carregada no seu browser.

## Arquitetura

A arquitetura deta parte foi baseada em pastas contendo `components` e `containers`. Nos containers teriam as classes e nos containers teriam classes formadas por funções.

O arquivo `api` foi responsável pela comunicação com o backend.

### Exibição da arquitetura

    src
    api
    -- components
    -- containers
    routes

### Padrão para components e containers

* containers
```js
export default class NomeDaClasse extends Components{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return < NomeDaComponenteOuCódigo />
    }
}
```

* component
```js
export default function NomeDaFunção(){
    return < CódigoOuComponente/>
}
```