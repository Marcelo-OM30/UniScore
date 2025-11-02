# Configuração do Firebase Security Rules

## Como aplicar as regras de segurança

### 1. Acessar o Console do Firebase

1. Vá para [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto UniScore
3. No menu lateral, clique em "Firestore Database"
4. Clique na aba "Regras" (Rules)

### 2. Copiar as regras

1. Abra o arquivo `firestore.rules` na raiz do projeto
2. Copie todo o conteúdo
3. Cole no editor de regras do Firebase Console

### 3. Publicar as regras

1. Clique em "Publicar" (Publish)
2. Aguarde a confirmação de que as regras foram aplicadas

## Como as regras funcionam

### 🎓 **Para Estudantes (Usuários Comuns)**

- ✅ Podem ler todas as avaliações (público)
- ✅ Podem criar avaliações quando logados
- ✅ Podem editar/deletar apenas suas próprias avaliações
- ❌ Não podem acessar dados de universidades

### 🏛️ **Para Universidades**

- ✅ Podem acessar apenas seus próprios dados na coleção "universidades"
- ✅ Podem criar, editar e deletar eventos
- ✅ Podem moderar avaliações dos seus eventos
- ✅ Têm acesso completo ao dashboard institucional
- ❌ Não podem ver dados de outras universidades

### 📊 **Para Avaliações**

- ✅ Leitura pública (todos podem ver)
- ✅ Criação apenas por usuários autenticados
- ✅ Edição/exclusão pelo autor ou pela universidade do evento

### 🔒 **Validações de Email**

- As regras incluem funções para validar emails institucionais
- Aceita domínios .edu, universidade, faculdade, instituto, etc.
- Validação automática no lado do servidor

## Benefícios desta abordagem

### ✅ **Segurança Robusta**

- Validação no servidor (Firebase)
- Impossível de burlar no frontend
- Controle granular de permissões

### ✅ **Performance**

- Menos código no frontend
- Validações otimizadas pelo Firebase
- Cache automático de permissões

### ✅ **Manutenção**

- Regras centralizadas
- Fácil de atualizar
- Logs de segurança automáticos

### ✅ **Experiência do Usuário**

- Erros claros e específicos
- Sem necessidade de workarounds
- Interface sempre responsiva

## Testando as regras

### 1. Usuário Normal

1. Faça login como estudante
2. Tente acessar `/dashboard-universidade`
3. Deve receber erro de permissão e ser redirecionado

### 2. Universidade

1. Cadastre uma universidade
2. Faça login com as credenciais
3. Acesse `/dashboard-universidade`
4. Deve funcionar normalmente

### 3. Avaliações

1. Crie uma avaliação como estudante
2. Tente editar como outro usuário
3. Deve ser negado pelo Firebase

## Monitoramento

No Firebase Console:

1. Vá para "Firestore Database" > "Uso"
2. Monitore tentativas de acesso negadas
3. Verifique logs de segurança em tempo real

## Rollback

Se algo der errado:

1. Mantenha backup das regras antigas
2. Cole as regras anteriores
3. Publique novamente

As regras atuais são muito permissivas para desenvolvimento. Em produção, ajuste conforme necessário.
