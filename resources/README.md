# Recursos do Aplicativo

Este diretório contém os recursos de imagem do aplicativo.

## Estrutura

- `icon.png` - Ícone principal do aplicativo (1024x1024px)
- `splash.png` - Imagem da tela de abertura (2732x2732px)

## Gerando os recursos

Para gerar automaticamente todos os tamanhos de ícones e splash screens necessários, execute:

```bash
npm install -g @capacitor/assets
npx capacitor-assets generate
```

## Requisitos das imagens

### Ícone do App
- Dimensões: 1024x1024 pixels
- Formato: PNG
- Fundo: Sólido (sem transparência)
- Área segura: Mantenha elementos importantes dentro de 80% da área central

### Splash Screen
- Dimensões: 2732x2732 pixels
- Formato: PNG
- Fundo: Sólido (sem transparência)
- Área segura: Mantenha elementos importantes dentro de 1200x1200px centrais 