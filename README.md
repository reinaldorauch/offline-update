# offline-update

App para teste de updates offline


## Instalação

1. Clona o repositório ou baixa o tar.gz ao lado

2. Navega até a pasta e digita

```
npm install
```

3. Instala ou atualiza as dependências globais

```
npm install -g bower cordova ionic
```

4. Instala as dependências do bower

```
bower install
```

5. Instala as dependências do ngCordova

```
cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git
```

Se não estiver instalado o android studio, instale.

Certifique-se que as variáveis de ambiente JAVA_HOME e ANDROID_HOME estejam
configuradas corretamente.

Se já estiver instalado o android studio, roda:

```
ionic platform add android
```

Para buildar o projeto:

```
ionic build
```

Para rodar o projeto no device conectado

```
ionic run --device
```
