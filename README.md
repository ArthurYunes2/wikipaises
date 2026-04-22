# WikiPaíses 🌍

Catálogo digital de nações soberanas construído com React + Vite, consumindo a [REST Countries API](https://restcountries.com).

## 🚀 Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/ArthurYunes2/wikipaises.git
cd wikipaises

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: `http://localhost:5173`

## 📦 Build para produção

```bash
npm run build
```

## 🛠️ Tecnologias utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Biblioteca de UI |
| Vite | 5 | Bundler / Dev server |
| React Router DOM | 6 | Navegação entre telas |
| Axios | 1.6 | Requisições HTTP |
| CSS Modules | — | Estilização por componente |

## 📁 Estrutura de pastas

```
src/
├── components/
│   ├── Card.jsx          # Card de país na listagem
│   ├── Card.module.css
│   ├── Header.jsx        # Cabeçalho com navegação por região
│   ├── Header.module.css
│   ├── InfoBlock.jsx     # Bloco de informação na tela de detalhes
│   ├── InfoBlock.module.css
│   ├── Footer.jsx
│   └── Footer.module.css
├── hooks/
│   └── useCountries.js   # Hook customizado com lógica de filtro e paginação
├── pages/
│   ├── Home.jsx          # Tela de listagem (/)
│   ├── Home.module.css
│   ├── Detail.jsx        # Tela de detalhes (/country/:code)
│   └── Detail.module.css
├── services/
│   └── api.js            # Camada de serviço com Axios
├── App.jsx               # Configuração de rotas
├── main.jsx              # Entry point
└── index.css             # Estilos globais e variáveis CSS
```

## 🌐 API utilizada

**Base URL:** `https://restcountries.com/v3.1`

| Endpoint | Descrição |
|---|---|
| `GET /all` | Lista todos os países |
| `GET /region/{region}` | Filtra por continente |
| `GET /name/{name}` | Busca por nome |
| `GET /alpha/{code}` | Busca pelo código cca3 |

## ✅ Funcionalidades implementadas

- [x] Listagem de países em grid com cards
- [x] Cards com bandeira, nome, capital, região (badge colorido) e população
- [x] Busca por nome em tempo real
- [x] Filtro por continente (Americas, Europe, Asia, Africa, Oceania)
- [x] Paginação com controles Anterior/Próximo e indicador de página
- [x] Navegação para tela de detalhes ao clicar no card
- [x] Tela de detalhes com todos os campos exigidos
- [x] Seção descritiva sobre o país
- [x] Botão "Voltar para a lista"
- [x] Responsividade (mobile e desktop)
- [x] Loading skeleton durante carregamento

## 📄 Deploy

Aplicação publicada em: **https://wikipaises-1eke.vercel.app**

---

*Desenvolvido para a disciplina T242 - Desenvolvimento Plataformas Web — UNIFOR*
