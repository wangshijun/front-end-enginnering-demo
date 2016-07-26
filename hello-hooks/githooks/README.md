# Git Hooks

保障代码质量，检查编码风格，预防软件破窗户。

## Requirements

* PHP
* ESLint `npm install -g eslint`
* CSSLint `npm install -g csslint`

## Hooks

### pre-commit.php

代码提交前检查，主要检查基本语法错误和编码风格，PHP、JS，使用了 ESLint。

## Usage

```
cd /path/to/yourrepo
git submodule add git@gitlab.renrenche.com:web/githooks.git githooks
git submodule update --init

cd .git/hooks
ln -s ../../githooks/pre-commit.php pre-commit
```

