'use strict';

var gProjs = [{
    id: 'Minesweeper',
    name: 'Minesweeper',
    title: 'Simple Startagy Game',
    desc: 'Minesweeper is my first project that I did for the bootcamp',
    url: 'Minesweeper',
    publishedAt: 1448693940000,
    labels: ['Matrixes', 'Games'],
},
{
    id: 'In-The-Picture',
    name: 'In-Picture Game',
    title: 'Simple Choise Game',
    desc: 'In-Picture Game is a simple game that gives you 2 options to choose from and only one correct answer',
    url: 'In-The-Picture',
    publishedAt: 1448693940000,
    labels: ['Quiz', 'Games'],
},
{
    id: 'touch-nums',
    name: 'Touch Nums',
    title: 'Simple Arcade Game',
    desc: 'A game that works on your speed and instinct',
    url: 'touch-nums',
    publishedAt: 1448693940000,
    labels: ['Arcade', 'Games'],
},
{
    id: 'Ball-Board',
    name: 'Ball Board',
    title: 'Simple Arcade Game',
    desc: 'Ball Board is a simple game. You play a monster that collects balls',
    url: 'Ball-Board',
    publishedAt: 1448693940000,
    labels: ['Arcade', 'Games'],
},
{
    id: 'book-shop',
    name: 'Book Shop',
    title: 'Simple Shop',
    desc: 'Book Shop is a book shop model that you can modify your books yourself',
    url: 'book-shop',
    publishedAt: 1448693940000,
    labels: ['Shop', 'Educational'],
}
];

function getProj(id) {
    return gProjs.find(proj => proj.id === id);
}