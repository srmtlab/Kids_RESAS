Kids RESAS
====
Kids RESAS is to assist class of social studies using RESAS.  

## Description
Kids RESAS is the Web application to assist class of social studies using RESAS. This project is taken over from the [gtskler (GitHub)](https://github.com/srmtlab/Kids_RESAS/tree/gtskler).  

## Online demo
- Under Construnction

## Requirement
- Laravel v5.5 LTS
- mysql 

## How to start
### make .env
make .env by copying .env.example, and then generate app's key, copy the key into APP_KEY in .env
```bash
cp .env.example .env
php artisan key:generate
```
### To develop
#### run the server
```bash
php artisan serve
```

### To deploy
Open .env and change the APP_DEBUG's value to `false`
#### run the server
```bash
php artisan serve
```

## Author
- Akira Kamiya
- Tsuyoshi Ureshino
  - Code for Aichi
- Shota Naito
- Youta Sakurai

## LICENCE
- The MIT Licence (MIT)
