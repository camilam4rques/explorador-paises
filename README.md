🌍 Explorador de Países
Uma aplicação web desenvolvida em Angular para explorar informações sobre países ao redor do mundo, consumindo a REST Countries API.

✨ Funcionalidades
📋 Lista de Países: Visualize uma lista com 50 países

🔍 Filtros em Tempo Real: Filtre países por:

Nome

Região

Capital

Idioma

População (crescente, decrescente, +1 milhão, +1 bilhão)

🏳️ Bandeiras: Visualize as bandeiras dos países com efeito de zoom

📱 Design Responsivo: Interface adaptável para desktop, tablet e mobile

⚡ Carregamento Otimizado: Spinner de carregamento e tratamento de erros

🔄 Recarregar Dados: Atualize a lista com novos dados da API

🚀 Tecnologias Utilizadas
Angular 21 - Framework front-end

TypeScript - Superset JavaScript com tipagem estática

RxJS - Programação reativa

REST Countries API - Fonte de dados sobre países

📋 Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:

Node.js (versão 18 ou superior)

Angular CLI (versão 21.2.0)

Git

🛠️ Instalação e Execução
Clone o repositório

bash
git clone https://github.com/seu-usuario/explorador-paises.git
cd explorador-paises
Instale as dependências

bash
npm install
Inicie o servidor de desenvolvimento

bash
ng serve
Acesse a aplicação
Abra o navegador e vá para http://localhost:4200/

A aplicação será recarregada automaticamente sempre que você modificar qualquer arquivo fonte.

📁 Estrutura do Projeto
text
explorador-paises/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── country.model.ts
│   │   │   └── services/
│   │   │       └── countries.service.ts
│   │   └── features/
│   │       └── countries/
│   │           └── pages/
│   │               └── countries-list/
│   │                   ├── countries-list.component.ts
│   │                   ├── countries-list.html
│   │                   └── countries-list.css
│   ├── assets/
│   ├── index.html
│   └── styles.css
├── angular.json
├── package.json
└── README.md
🎯 Como Usar
Filtros
Nome: Digite no campo "Filtrar por nome..." para buscar países específicos

População: Use o seletor para ordenar ou filtrar por faixa populacional

Região: Selecione uma região para ver apenas países daquela área

Capital: Digite para filtrar por capital

Idioma: Digite para filtrar por idioma oficial

Recarregar Dados
Clique no botão "Recarregar" para buscar novos dados da API.

Visualizar Detalhes
Passe o mouse sobre a bandeira para ampliar ou clique para ver detalhes do país.

🏗️ Comandos Úteis
Gerar um novo componente
bash
ng generate component nome-do-componente
Gerar um serviço
bash
ng generate service core/services/nome-do-servico
Gerar um modelo/model
bash
ng generate interface core/models/nome-do-modelo
Construir o projeto para produção
bash
ng build
Os artefatos de build serão armazenados no diretório dist/.

Executar testes unitários
bash
ng test
Os testes são executados com o Vitest.

Executar testes end-to-end
bash
ng e2e
📱 Responsividade
A aplicação é totalmente responsiva:

Desktop: Layout completo com tabela e todos os filtros

Tablet: Ajustes de espaçamento e esconder tooltips

Mobile: Filtros em coluna e tabela com rolagem horizontal

🎨 Estilização
Design moderno com gradientes e sombras

Efeitos hover em elementos interativos

Spinner animado durante carregamento

Tooltips informativos

Tarja de aviso quando nenhum resultado é encontrado

🤝 Contribuindo
Faça um fork do projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
