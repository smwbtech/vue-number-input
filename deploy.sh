#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

echo "START NPM BUILD"

# сборка
npm run build

echo "START NPM BUILD - SUCCEED"

# переход в каталог сборки
cd dist

echo $PWD

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

echo "GIT INIT"

git init
echo "GIT INIT ADD -A"
git add -A
echo "GIT COMMIT -M deploy"
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

echo "GIT PUSH"
# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:smwbtech/vue-number-input.git master:gh-pages

echo "DEPLOYMENT - SUCCEED"

cd -
