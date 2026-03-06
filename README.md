# 🌍 Countries Explorer

![Angular](https://img.shields.io/badge/Angular-21-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![RxJS](https://img.shields.io/badge/RxJS-Reactive-purple)
![License](https://img.shields.io/badge/License-MIT-green)

A web application built with **Angular** that allows users to explore
information about countries around the world using the **REST Countries
API**.

Uma aplicação web desenvolvida em **Angular** que permite explorar
informações sobre países ao redor do mundo utilizando a **REST Countries
API**.

------------------------------------------------------------------------

# 🌐 Live Data Source

This project uses the public API:

https://restcountries.com/

------------------------------------------------------------------------

# 🇺🇸 English

## 📌 About the Project

**Countries Explorer** is a web application that consumes the public
**REST Countries API** to display detailed information about countries.

Users can **search, filter, and explore country data**, including:

-   Flags
-   Population
-   Languages
-   Region
-   Capital

------------------------------------------------------------------------

## 🌐 Application Language

The application interface was intentionally developed **in English**.

This decision was made because the data returned by the **REST Countries
API** is provided **entirely in English** (country names, languages,
regions, etc.).

Keeping the interface in English ensures:

-   Data consistency
-   No need for manual translations
-   Information displayed exactly as returned by the API

------------------------------------------------------------------------

## ✨ Features

### 🌎 Countries List

-   Initial display of **50 countries**

### 🔎 Real-time Filters

Users can filter countries by:

-   Name
-   Population
-   Region
-   Capital
-   Language

### 🏳️ Country Flags

-   Flag preview
-   **Zoom effect on hover**

### ⚡ User Experience

-   Loading spinner
-   Error handling
-   Message when no results are found
-   User confirmation messages

------------------------------------------------------------------------

## 🧰 Technologies Used

-   **Angular 21**
-   **TypeScript**
-   **RxJS**
-   **REST Countries API**
-   **HTML5**
-   **CSS3**

------------------------------------------------------------------------

# 🇧🇷 Português

## 📌 Sobre o Projeto

O **Countries Explorer** é uma aplicação web que consome a API pública
**REST Countries** para exibir informações detalhadas sobre países.

A aplicação permite **filtrar, pesquisar e visualizar informações
relevantes**, como:

-   Bandeiras
-   População
-   Idioma
-   Região
-   Capital

------------------------------------------------------------------------

## 🌐 Idioma da Aplicação

A interface da aplicação foi desenvolvida **em inglês**.

Essa decisão foi tomada porque os dados retornados pela **REST Countries
API** são fornecidos **inteiramente em inglês**, como nomes de países,
regiões e idiomas.

Manter a interface em inglês garante:

-   Consistência com os dados da API
-   Evita traduções manuais
-   Exibe as informações exatamente como são retornadas pela API

------------------------------------------------------------------------

## ✨ Funcionalidades

### 🌎 Lista de países

-   Exibição inicial de **50 países**

### 🔎 Filtros em tempo real

-   Nome
-   População
-   Região
-   Capital
-   Idioma

### 🏳️ Bandeiras dos países

-   Visualização das bandeiras
-   **Zoom ao passar o mouse**

### ⚡ Experiência do usuário

-   Spinner de carregamento
-   Tratamento de erros
-   Mensagem quando nenhum resultado é encontrado
-   Mensagens de confirmação

------------------------------------------------------------------------

## 🛠️ Decisões Técnicas

### Arquitetura e Organização

#### Angular 17+ com Standalone Components

**Motivo:**\
Adotei a arquitetura **standalone** por ser mais moderna e facilitar a
manutenção.\
Ela elimina a necessidade de **NgModules**, tornando o código mais limpo
e as importações mais diretas.

------------------------------------------------------------------------

#### Estrutura de pastas modular (feature‑first)

    src/
    ├── app/
    │   ├── core/           # Serviços singleton, guards, interceptors
    │   ├── features/       # Funcionalidades da aplicação (countries, etc)
    │   └── shared/         # Componentes, diretivas e pipes reutilizáveis

**Motivo:**\
Separação clara de responsabilidades e maior escalabilidade.

-   **core** → serviços globais e infraestrutura
-   **features** → funcionalidades isoladas
-   **shared** → código reutilizável

------------------------------------------------------------------------

#### Loading Service global

**Motivo:**\
Centraliza o controle de loading em um único lugar, evitando duplicação
de código e garantindo consistência visual em toda a aplicação.

------------------------------------------------------------------------

#### Tratamento de erros centralizado

**Motivo:**\
Uso de **HTTP Interceptors** e serviço de notificações para garantir uma
experiência consistente e amigável quando ocorre algum erro.

------------------------------------------------------------------------

#### Design System consistente

**Motivo:**\
Utilização de cores padronizadas:

-   `#025159`
-   `#f28705`

Isso cria uma **identidade visual consistente** e melhora a experiência
do usuário.

------------------------------------------------------------------------

#### Mapas com OpenStreetMap

**Motivo:**

-   Gratuito
-   Open‑source
-   Não exige chave de API

Isso torna o projeto **facilmente replicável e sem custos de
infraestrutura**.

------------------------------------------------------------------------

## ⏱️ O que faria diferente com mais tempo

### 🧪 Testes automatizados

-   Implementar **testes unitários mais abrangentes** para serviços e
    componentes
-   Adicionar **testes E2E com Cypress**
-   Incluir **testes automatizados de acessibilidade (a11y)**

------------------------------------------------------------------------

### ⚡ Performance

-   Melhorar otimizações de carregamento
-   Aplicar estratégias adicionais de caching e lazy loading

------------------------------------------------------------------------

### 📱 Experiência do usuário

-   Melhorar a **responsividade para dispositivos móveis**
-   Ajustar layouts para diferentes tamanhos de tela

------------------------------------------------------------------------

### 🌎 Funcionalidades

-   Permitir **comparar dois ou mais países lado a lado**
-   Adicionar **gráficos estatísticos** (população, crescimento, etc.)

------------------------------------------------------------------------

### 🧱 Infraestrutura

-   **Dockerizar a aplicação** para facilitar deploy e replicação do
    ambiente

------------------------------------------------------------------------

### ♿ Acessibilidade

-   Adicionar **ARIA labels mais descritivos**
-   Garantir **contraste de cores adequado**
-   Testar a aplicação com **leitores de tela**

------------------------------------------------------------------------

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

-   Node.js 18+
-   Angular CLI
-   Git

------------------------------------------------------------------------

## ⚙️ Instalação

Clone o repositório:

    git clone https://github.com/seu-usuario/explorador-paises.git
    cd explorador-paises

Instale as dependências:

    npm install

Execute o projeto:

    ng serve

Abra no navegador:

    http://localhost:4200

------------------------------------------------------------------------

## 🏗️ Build de Produção

    ng build

------------------------------------------------------------------------

## 📄 Licença

Este projeto está sob a licença **MIT**.
