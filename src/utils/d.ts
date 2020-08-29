const d = dice => {
    const result = Math.ceil(Math.random() * dice);
    return result;
};

export default d;
