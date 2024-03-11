const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const runGemini = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
};

const splitResponse = (response) => {
    const maxLength = 2000;
    const chunks = [];

    for (let i = 0; i < response.length; i += maxLength) {
        chunks.push(response.substring(i, i + maxLength));
    }

    return chunks;
};


module.exports = { runGemini, splitResponse };