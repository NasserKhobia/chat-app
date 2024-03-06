export const funEmoji = [
    'n',
    'm',
    'k',
    'h',
    'd',
    'r',
    's'
];
export const getRandomEmoji =()=>{
    return funEmoji[Math.floor(Math.random()*funEmoji.length)];
}