<?php
$json = file_get_contents('colours.json');
$data = json_decode($json);
$data[] = htmlspecialchars($_GET['hex']);
if(preg_match('/^#[a-f0-9]{6}$/i', htmlspecialchars($_GET['hex']))) //hex color is valid
{
file_put_contents('colours.json', json_encode($data));
sleep(0.5);
header('Location: ../');
} else if(preg_match('/^#[a-f0-9]{3}$/i', htmlspecialchars($_GET['hex'])))
{
file_put_contents('colours.json', json_encode($data));
sleep(0.5);
header('Location: ../');
} else if(preg_match('/^[a-f0-9]{6}$/i', htmlspecialchars($_GET['hex']))) //hex color is valid
{
file_put_contents('colours.json', json_encode($data));
sleep(0.5);
header('Location: ../');
} else if(preg_match('/^[a-f0-9]{3}$/i', htmlspecialchars($_GET['hex'])))
{
file_put_contents('colours.json', json_encode($data));
sleep(0.5);
header('Location: ../');
} else{
header('Location: ../');
}

?>