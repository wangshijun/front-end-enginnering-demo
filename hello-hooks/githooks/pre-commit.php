#!/usr/bin/env php
<?php
error_reporting(0);

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', getGitRoot() . DS);

$REDIRECT = ' 2> /dev/null';
$CWD = getcwd();
$PHP = 'php';
$ESLINT = 'eslint';
$ESLINT_RC = findDotfile($CWD . DS . '.eslintrc');
$ESLINT_IGNORE = findDotfile($CWD . DS . '.eslintignore');
$CSSLINT = 'csslint';
$TMP = ROOT . '.tmp' . DS;

mkdir($TMP);

$exitCode = 0;
$fileList = array();

// get ignored file list
$ignored = getIgnoredFiles($ESLINT_IGNORE);

// get changed file list
exec("git rev-parse --verify HEAD $REDIRECT", $output, $return);
$against = $return ? '4b825dc642cb6eb9a060e54bf8d69288fbee4904' : 'HEAD';
exec("git diff-index --cached --full-index --diff-filter=ACMR $against --", $fileList);

$errmsg = array();
foreach ($fileList as $fileAttrs) {
    $fileAttrs = preg_replace('/\s+/i', ' ', $fileAttrs);
    $attrs = explode(' ', $fileAttrs);
    $sha = $attrs[3];
    $status = strtoupper($attrs[4]);
    $filename = $attrs[5];

    if (array_search($filename, $ignored) !== false) {
        echo 'ignore file: ', $filename, PHP_EOL;
        continue;
    }

    if (strpos($filename, 'vendor/') !== false) {
        continue;
    }

    if (!preg_match('/\.(php|js|css)$/i', $filename, $match)) {
        continue;
    }

    // make tmp file
    $ext = strtolower($match[1]);
    $tmpFilename = $TMP . $filename;
    $tmpFileDir = dirname($tmpFilename);
    if (!is_dir($tmpFileDir)) {
        exec('mkdir -p ' . $tmpFileDir);
    }
    exec("git cat-file blob $sha > $tmpFilename");

    $output = array();
    $return = 0;

    switch ($ext) {
        // php -l
        case 'php':
            exec("$PHP -l $tmpFilename $REDIRECT", $output, $return);
            if ($return) {
                $exitCode = 1;
                array_shift($output);
                array_pop($output);
                foreach ($output as $line) {
                    $errmsg[] = sprintf(" - %s:%s \n", $filename, $line);
                }
            }

        break;

        // eslint
        case 'js':
            if (file_exists($ESLINT_RC)) {
                exec("$ESLINT -f json --config $ESLINT_RC --ignore-path $ESLINT_IGNORE $tmpFilename", $output, $return);
                if ($return) {
                    $exitCode = 1;
                    $data = json_decode($output[0]);
                    $object = array_shift($data);
                    $filepath = str_replace($tmpFilename, $filename, $object->filePath);
                    foreach ($object->messages as $message) {
                        if (!empty($message->ruleId)) {
                            $errmsg[] = sprintf(" - %s:%d:%d [%s]\t%s\n", $filepath, $message->line, $message->column, $message->ruleId, $message->message);
                        }
                    }
                }
            }
        break;

        // csslint
        case 'css':
            exec("$CSSLINT --format=compact --quiet $tmpFilename $REDIRECT", $output, $return);
            if (!empty($output)) {
                $exitCode = 1;
                foreach ($output as $line) {
                    if (empty($line)) {
                        continue;
                    }
                    $errmsg[] = sprintf(" - %s \n", str_replace(array($tmpFilename, ' line ', ', col '), array($filename, '', ':'), $line));
                }
            }
        break;
    }

    unlink($tmpFilename);
}

exec('rm -rf ' . $TMP);

$passTips = array(
    'code is poetry',
    'done is better than perfect',
    'go big or go home',
    'code wins arguments',
    'move fast and break things',
    'the foolish wait',
    'fortune love bold',
    'proceed and be bold',
    'keep it simple, stupid',
    'talk is cheap, show me the code',
    'stay focused and keep shipping',
);

if ($exitCode) {
    echo implode('', $errmsg);
    echo "[\033[01;31mFAIL\033[0m] fix and try again." . "\n";
} else {
    if (count($fileList)) { // if have something to commit, show the pass tip
        shuffle($passTips);
        echo "[\033[00;32mPASS\033[0m] \033[00;36m" . ($passTips[0]) . "\033[0m\n";
    }
}

exit($exitCode);

// 简单输出
function debug($message, $exit = false) {
    echo $message, PHP_EOL;
    if ($exit) exit();
}

// 找到 dotfile 所在的位置，不论在哪里提交都能那倒正确的配置
function findDotfile($file) {
    if (file_exists($file)) {
        return $file;
    }

    // stop when reaching git root
    $pathinfo = pathinfo($file);
    if ($pathinfo['dirname'] . DS === ROOT) {
        return false;
    }

    return findDotfile(dirname($pathinfo['dirname']) . DS . $pathinfo['basename']);
}

// 获取需要忽略的文件列表
function getIgnoredFiles($ignoreConfigFile) {
    $ignored = [];
    if (!file_exists($ignoreConfigFile)) {
        return $ignored;
    }
    $patterns = explode(PHP_EOL, file_get_contents($ignoreConfigFile));
    foreach ($patterns as $pattern) {
        $ignored = array_merge($ignored, glob($pattern));
    }

    return $ignored;
}

// 获取当前仓库根目录
function getGitRoot() {
    exec('git rev-parse --show-toplevel', $output);
    return $output[0];
}
