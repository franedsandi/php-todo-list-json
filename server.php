<?php

$json_string = file_get_contents('todo-list.json');

$list = json_decode($json_string);
if(isset($_POST['todoItem'])){
  $newItem = $_POST['todoItem'];

  $list[] = $newItem;
  file_put_contents('todo-list.json', json_encode($list));
};

header('Content-Type: application/json');

echo json_encode($list);

?>