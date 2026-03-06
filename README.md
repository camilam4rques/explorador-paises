# 🌍 Countries Explorer

Uma aplicação web desenvolvida em **Angular** que permite explorar informações sobre países ao redor do mundo utilizando a **REST Countries API**.

This is a **web application built with Angular** that allows users to explore information about countries around the world using the **REST Countries API**.

---

# 🇧🇷 Português

## 📌 Sobre o Projeto

O **Countries Explorer** é uma aplicação web que consome a API pública **REST Countries** para exibir informações detalhadas sobre países.

A aplicação permite **filtrar, pesquisar, ordenar e visualizar informações relevantes**, como bandeiras, população, idioma, região e capital.
---

## 🌐 Idioma da Aplicação

A interface da aplicação foi desenvolvida **em inglês**.

Essa decisão foi tomada porque os dados retornados pela **REST Countries API** são fornecidos **inteiramente em inglês**, como nomes de países, regiões e idiomas. Dessa forma, manter a aplicação em inglês evita inconsistências e mantém os dados exibidos exatamente como são retornados pela API pública.

---

## ✨ Funcionalidades

* 🌎 **Lista de países**

  * Exibição inicial de **50 países**

* 🔎 **Filtros em tempo real**

  * Nome
  * População
  * Região
  * Capital
  * Idioma

* 🏳️ **Bandeiras dos países**

  * Visualização das bandeiras
  * Efeito de **zoom ao passar o mouse**

* ⚡ **Experiência de usuário**

  * Spinner de carregamento
  * Tratamento de erros
  * Mensagem quando nenhum resultado é encontrado
  * Mensagem de confirmação para o usuário

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

Passe o mouse sobre a bandeira para visualizar os detalhes ou clice no botão com nome 'Detais'.


---

## 🏗️ Build de Produção

```bash
ng build
```

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---


🛠️ Decisões técnicas
Arquitetura e Organização
Angular 17+ com Standalone Components

Motivo: Adotei a arquitetura standalone por ser mais moderna e facilitar a manutenção. Elimina a necessidade de NgModules, tornando o código mais limpo e as importações mais diretas.

Estrutura de pastas modular (feature-first)

text
src/
├── app/
│   ├── core/           # Serviços singleton, guards, interceptors
│   ├── features/       # Módulos de funcionalidades (countries, shared)
│   └── shared/         # Componentes, diretivas e pipes reutilizáveis
Motivo: Separação clara de responsabilidades e facilita a escalabilidade. Core para serviços globais, features para funcionalidades isoladas e shared para código reutilizável.


Loading Service global

Motivo: Centraliza o controle de loading em um único lugar, evitando duplicação de código e garantindo consistência visual em toda a aplicação.


Tratamento de erros centralizado

Motivo: Interceptor para erros HTTP e serviço de notificações garantem uma experiência consistente e amigável quando algo dá errado.

Design System consistente

Motivo: Cores (#025159 e #f28705) e componentes visuais padronizados criam uma identidade visual forte e experiência de usuário coesa.

Mapas com OpenStreetMap

Motivo: Gratuito, open-source e não requer chaves de API, tornando o projeto facilmente replicável sem custos.

⏱️ O que faria diferente com mais tempo

Testes automatizados

Implementaria testes unitários mais abrangentes para serviços e componentes

Adicionaria testes e2e com Cypress para garantir fluxos críticos

Testes de acessibilidade (a11y) automatizados


Performance

Experiência do usuário

Melhoraria a responsividade para dispositivos móveis



Funcionalidades

Permitir comparar dois ou mais países lado a lado

Adicionar gráficos com estatísticas (população, crescimento)


Infraestrutura

Dockerizar a aplicação




Acessibilidade

Adicionar ARIA labels mais descritivos

Garantir contraste de cores adequado

Testar com leitores de tela
