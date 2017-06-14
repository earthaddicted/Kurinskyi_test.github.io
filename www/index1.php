<?php
/**
 * Главная точка входа в наше веб-приложение
 *
 * @author markrobertgold
 *
 */
$start_time = microtime(true);//Фиксируем время начало генерации страницы

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(dirname(__FILE__)));
define('VIEWS_PATH', ROOT.DS.'views'.DS);

require_once(ROOT.DS.'lib'.DS.'init.php');

/*echo "<pre>";
$router = new Router($_SERVER['REQUEST_URI']);
print_r('Route - '.$router->getRoute() . PHP_EOL);
print_r('Controller - ' . $router->getController() . PHP_EOL);
print_r('language - ' . $router->getLanguage() . PHP_EOL);
print_r('Action - ' . $router->getMethodPrefix() . $router->getAction() . PHP_EOL);
print_r('Params - ' . $router->getParams());
echo "</pre>";*/

App::run($_SERVER['REQUEST_URI']);

echo "<pre>";
echo microtime(true) - $start_time;//вывод времени генерации страницы