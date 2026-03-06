# 🌍 Countries Explorer

Uma aplicação web desenvolvida em **Angular** que permite explorar informações sobre países ao redor do mundo utilizando a **REST Countries API**.

This is a **web application built with Angular** that allows users to explore information about countries around the world using the **REST Countries API**.

---

# 🇧🇷 Português

## 📌 Sobre o Projeto

O **Countries Explorer** é uma aplicação web que consome a API pública **REST Countries** para exibir informações detalhadas sobre países.

A aplicação permite **filtrar, pesquisar e visualizar informações relevantes**, como bandeiras, população, idioma, região e capital.

Este projeto foi desenvolvido como **teste técnico para vaga de desenvolvedor Angular**, com foco em:

* boas práticas de arquitetura
* organização de código
* consumo de APIs
* reatividade com RxJS
* interface responsiva

---

## ✨ Funcionalidades

* 🌎 **Lista de países**

  * Exibição inicial de **50 países**

* 🔎 **Filtros em tempo real**

  * Nome
  * Região
  * Capital
  * Idioma
  * População

* 📊 **Filtros de população**

  * Crescente
  * Decrescente
  * Mais de 1 milhão
  * Mais de 1 bilhão

* 🏳️ **Bandeiras dos países**

  * Visualização das bandeiras
  * Efeito de **zoom ao passar o mouse**

* 📱 **Design Responsivo**

  * Desktop
  * Tablet
  * Mobile

* ⚡ **Experiência de usuário**

  * Spinner de carregamento
  * Tratamento de erros
  * Mensagem quando nenhum resultado é encontrado

* 🔄 **Atualização de dados**

  * Botão para recarregar dados da API

---

## 🧰 Tecnologias Utilizadas

* **Angular 21**
* **TypeScript**
* **RxJS**
* **REST Countries API**
* **HTML5**
* **CSS3**

---

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

* **Node.js** (18 ou superior)
* **Angular CLI** (21.2.0 ou superior)
* **Git**

---

## ⚙️ Instalação

Clone o repositório

```bash
git clone https://github.com/seu-usuario/explorador-paises.git
cd explorador-paises
```

Instale as dependências

```bash
npm install
```

Execute o projeto

```bash
ng serve
```

Abra no navegador

```
http://localhost:4200
```

---

## 📂 Estrutura do Projeto

```
src/
 ├── app/
 │   ├── core/
 │   │   ├── models/
 │   │   │   └── country.model.ts
 │   │   └── services/
 │   │       └── countries.service.ts
 │   │
 │   └── features/
 │       └── countries/
 │           └── pages/
 │               └── countries-list/
 │                   ├── countries-list.component.ts
 │                   ├── countries-list.component.html
 │                   └── countries-list.component.css
 │
 ├── assets/
 ├── styles.css
 └── index.html
```

A estrutura segue um padrão de organização baseado em:

* **core** → serviços e modelos globais
* **features** → funcionalidades da aplicação

---

## 🎯 Como Usar

### Filtrar países

Você pode filtrar países utilizando os seguintes campos:

* **Nome**
* **Região**
* **Capital**
* **Idioma**
* **População**

Os filtros são aplicados **em tempo real**.

---

### Recarregar dados

Clique no botão **Recarregar** para buscar novamente os dados da API.

---

### Visualizar detalhes

Passe o mouse sobre a bandeira para visualizar o **efeito de zoom**.

---

## 🧪 Testes

Executar testes unitários:

```bash
ng test
```

---

## 🏗️ Build de Produção

```bash
ng build
```

Os arquivos gerados ficarão em:

```
dist/
```

---

## 📱 Responsividade

A aplicação foi desenvolvida com layout responsivo:

| Dispositivo | Comportamento                         |
| ----------- | ------------------------------------- |
| Desktop     | Tabela completa e filtros             |
| Tablet      | Ajuste de espaçamento                 |
| Mobile      | Filtros em coluna e scroll horizontal |

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

# 🇺🇸 English

## 📌 About the Project

**Countries Explorer** is a web application that consumes the **REST Countries API** to display detailed information about countries around the world.

The application allows users to **search, filter and explore country information**, including flags, population, language, region, and capital.

This project was developed as a **technical assessment for an Angular developer position**, focusing on:

* clean architecture
* code organization
* API consumption
* reactive programming with RxJS
* responsive UI

---

## ✨ Features

* 🌍 **Countries list**

  * Displays an initial list of **50 countries**

* 🔎 **Real-time filters**

  * Name
  * Region
  * Capital
  * Language
  * Population

* 📊 **Population filters**

  * Ascending
  * Descending
  * Over 1 million
  * Over 1 billion

* 🏳️ **Country flags**

  * Flag visualization
  * **Hover zoom effect**

* 📱 **Responsive design**

  * Desktop
  * Tablet
  * Mobile

* ⚡ **User experience improvements**

  * Loading spinner
  * Error handling
  * Empty state message

* 🔄 **Data refresh**

  * Button to reload API data

---

## 🧰 Technologies Used

* **Angular 21**
* **TypeScript**
* **RxJS**
* **REST Countries API**
* **HTML**
* **CSS**

---

## 📋 Prerequisites

Before running the project, make sure you have installed:

* **Node.js** (18+)
* **Angular CLI**
* **Git**

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/countries-explorer.git
cd countries-explorer
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
ng serve
```

Open in your browser

```
http://localhost:4200
```

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── core/
 │   │   ├── models/
 │   │   └── services/
 │   │
 │   └── features/
 │       └── countries/
 │           └── pages/
 │               └── countries-list/
 │
 ├── assets/
 └── styles.css
```

The structure follows a **feature-based architecture**.

---

## 🧪 Running Tests

```bash
ng test
```

---

## 🏗️ Production Build

```bash
ng build
```

Build artifacts will be stored in:

```
dist/
```

---

## 📄 License

This project is licensed under the **MIT License**.

---
