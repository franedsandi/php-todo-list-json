<?php

$json_string = file_get_contents('todo-list.json');

$list = json_decode($json_string, true);

if(isset($_POST['todoItem'])){
  $newItem = $_POST['todoItem'];
  $list[] = array("task" => $newItem, "completed" => false);
  file_put_contents('todo-list.json', json_encode($list));
}

if(isset($_POST['indexToDelete'])){
  $indexToDelete = $_POST['indexToDelete'];
  if ($list[$indexToDelete]['completed'] === true) {
    array_splice($list, $indexToDelete, 1);
    file_put_contents('todo-list.json', json_encode($list));
  }
}

if (isset($_POST['indexToUpdate']) && isset($_POST['completed'])) {
  $indexToUpdate = $_POST['indexToUpdate'];
  $completed = $_POST['completed'] === 'true' ? true : false;
  $list[$indexToUpdate]['completed'] = $completed;
  file_put_contents('todo-list.json', json_encode($list));
}

header('Content-Type: application/json');
echo json_encode($list);

?>