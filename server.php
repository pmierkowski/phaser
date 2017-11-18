<?php

/**
 * Simple equivalent for NODE Server
 */

$db = new PDO('sqlite:./server/database/game.db');

if ('GET' === $_SERVER['REQUEST_METHOD']) {
    $stmt = $db->query('
        SELECT id, name, score, created FROM users
        ORDER BY score DESC
        LIMIT 10');

    header('Content-type: application/json');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ('POST' === $_SERVER['REQUEST_METHOD']) {
    $name = $_REQUEST['name'];
    $score = $_REQUEST['score'];

    $stmt = $db->prepare('
        INSERT INTO users (name, score) 
        VALUES(
            :name, :score  
        );');
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->bindValue(':score', $score, PDO::PARAM_STR);

    $stmt->execute();

    header('Content-type: application/json');
    echo json_encode(['status' => true]);
}