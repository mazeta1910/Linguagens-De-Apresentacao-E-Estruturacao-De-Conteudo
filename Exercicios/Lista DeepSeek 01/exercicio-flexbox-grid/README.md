# Exercício: Flexbox e Grid

## Objetivo
Criar uma página web completa utilizando HTML e CSS, aplicando conceitos de **Flexbox** e **CSS Grid** para criar layouts responsivos e organizados.

## Estrutura do Projeto
```
exercicio-flexbox-grid/
├── index.html          # Arquivo HTML principal (estrutura básica criada)
├── css/
│   └── style.css       # Arquivo CSS (estrutura e comentários criados)
├── img/
│   ├── atendimento.png # Ícone para seção de serviços
│   ├── treinamento.png # Ícone para seção de serviços  
│   ├── equipe.png      # Ícone para seção de serviços
│   ├── avatar1.png     # Avatar para depoimentos
│   ├── avatar2.png     # Avatar para depoimentos
│   ├── avatar3.png     # Avatar para depoimentos
│   └── avatar4.png     # Avatar para depoimentos
└── README.md           # Este arquivo
```

## Tarefas a Completar

### 1. Seção de Serviços (Flexbox)
- **Objetivo**: Criar 3 caixas lado a lado usando Flexbox
- **Localização**: Primeira seção do `index.html`
- **Conteúdo das caixas**:
  1. **Atendimento ao Cliente** (img/atendimento.png)
     - Texto: "Tenha acesso a nossa plataforma de suporte ao cliente. Esclareça todas as suas dúvidas ou converse com um de nossos técnicos."
  2. **Agende seu treinamento** (img/treinamento.png)
     - Texto: "Agende seu treinamento e da sua equipe. Escolha o(s) tema(s) e agende a data desejada."
  3. **Faça parte da nossa equipe** (img/equipe.png)
     - Texto: "Venha fazer parte da nossa equipe. Envie seu currículo que entraremos em contato."

**Dicas CSS**:
- Use `display: flex` no contêiner
- Use `justify-content: center` para centralizar
- Aplique `background-color: #f2f2f2` nas caixas
- Use `border-radius: 15px` para bordas arredondadas
- Adicione `box-shadow` para profundidade

### 2. Seção de Depoimentos (CSS Grid)
- **Objetivo**: Criar 4 cards de depoimento em uma linha usando CSS Grid
- **Localização**: Segunda seção do `index.html`
- **Conteúdo dos depoimentos**:
  1. **Maria Silva** (img/avatar1.png)
     - "Excelente atendimento! A equipe sempre muito prestativa e eficiente."
  2. **João Santos** (img/avatar2.png)
     - "Os treinamentos são muito bem estruturados e práticos. Recomendo!"
  3. **Ana Costa** (img/avatar3.png)
     - "Trabalhar aqui tem sido uma experiência incrível de crescimento profissional."
  4. **Carlos Oliveira** (img/avatar4.png)
     - "Suporte técnico excepcional. Sempre resolvem rapidamente qualquer questão."

**Dicas CSS**:
- Use `display: grid` no contêiner
- Use `grid-template-columns: repeat(4, 1fr)` para 4 colunas iguais
- Use `border-radius: 50%` nas imagens para deixá-las redondas
- Centralize o conteúdo com `text-align: center`

### 3. Rodapé (Flexbox)
- **Objetivo**: Criar um rodapé com 3 colunas usando Flexbox
- **Localização**: Terceira seção do `index.html`
- **Conteúdo das colunas**:
  1. **FOOTER CONTENT** (ocupa 2x mais espaço)
     - "Here you can use rows and columns to organize your footer content."
  2. **SEJA NOSSO PARCEIRO**
     - Lista: Seja um associado, Anuncie seus produtos, Gerencie seu conteúdo, Faça sua carreira
  3. **CONHEÇA-NOS**
     - Lista: Informações corporativas, Carreiras, Comunidade, Acessibilidade

**Dicas CSS**:
- Use `background-color: #212529` e `color: white`
- Use `display: flex` no contêiner principal
- Use `flex: 2` na primeira coluna e `flex: 1` nas outras
- Use `list-style: none` para remover marcadores das listas
- Adicione uma seção de copyright centralizada no final

## Como Completar o Exercício

1. **Abra o arquivo `index.html`** e substitua os comentários `<!-- TODO: ... -->` pela estrutura HTML apropriada
2. **Abra o arquivo `css/style.css`** e complete as propriedades CSS marcadas com `/* TODO: ... */`
3. **Teste sua página** abrindo o `index.html` no navegador
4. **Ajuste os estilos** conforme necessário para que fique similar aos exemplos dos PDFs

## Conceitos Importantes

### Flexbox
- `display: flex` - Ativa o layout flexível
- `justify-content` - Alinhamento horizontal
- `align-items` - Alinhamento vertical
- `flex` - Define como o item cresce/encolhe

### CSS Grid
- `display: grid` - Ativa o layout em grade
- `grid-template-columns` - Define as colunas
- `gap` - Espaçamento entre itens

### Dicas Gerais
- Use `box-sizing: border-box` para facilitar o cálculo de tamanhos
- Teste sempre no navegador após cada mudança
- Use as ferramentas de desenvolvedor (F12) para debugar CSS

Boa sorte com o exercício! 🚀

