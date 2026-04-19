# App Service OS 🛠️

Uma plataforma mobile-first robusta e elegante para gestão de Ordens de Serviço (OS), desenvolvida com **Expo SDK 54** e **React Native**. Projetada especificamente para técnicos em campo, oferecendo uma experiência premium e intuitiva.

## ✨ Funcionalidades

- 📱 **Mobile First & Premium UI**: Interface moderna com foco em usabilidade, animações sutis e design responsivo.
- 📍 **Geolocalização**: Lista de ordens de serviço ordenada automaticamente por proximidade do técnico (simulado).
- 📸 **Gestão de Evidências**: Captura de fotos para comprovação do serviço realizado.
- 📦 **Controle de Materiais**: Registro detalhado dos insumos utilizados em cada atendimento.
- ✍️ **Assinatura Digital**: Coleta de assinatura do cliente diretamente na tela (com suporte automático a modo paisagem).
- ✅ **Fluxo de Finalização**: Processo de conclusão de OS com atualização de status em tempo real e integração mock.
- 🔒 **Arquitetura Limpa (Clean Architecture)**: Divisão clara entre camadas de Domínio, Dados e Apresentação, facilitando a manutenção e testes.

## 🚀 Tecnologias Utilizadas

- **Core**: React Native & Expo SDK 54
- **Navegação**: Expo Router (File-based routing)
- **Estilização**: StyleSheet (Vanilla CSS approach) com sistema de tokens de cores e tipografia
- **Tipografia**: Google Fonts (Inter, Outfit, Space Grotesk)
- **Componentes**: React Native Reanimated, Expo Linear Gradient, Expo Image Picker
- **Assinatura**: React Native Signature Canvas
- **Linguagem**: TypeScript

## 🏗️ Arquitetura do Projeto

O projeto segue os princípios da **Clean Architecture**, organizado da seguinte forma:

```text
src/
├── app/               # Rotas e layouts do Expo Router
├── domain/            # Entidades, casos de uso e interfaces de repositório (Regras de Negócio)
├── data/              # Implementações de repositório e fontes de dados (Mock API)
├── presentation/      # Telas, ViewModels, Componentes e Estilos (UI Layer)
├── shared/            # Utilitários e constantes compartilhadas
```

## 🛠️ Como Executar

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- Expo Go no seu dispositivo móvel (opcional para testes reais)

### Instalação

1. Clone o repositório:
```bash
git clone git@github.com:brunoorosco/app-os.git
cd app-os
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor do Expo:
```bash
npm start
```

4. Use o QR Code gerado no terminal para abrir o app no **Expo Go** (Android/iOS) ou pressione `w` para abrir na web.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido por [Bruno Orosco](https://github.com/brunoorosco).
