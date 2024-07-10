const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/chatgpt', async (req, res) => {
    const { query } = req.body;
    
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-proj-MBRGq89auB10F9hhA2R6T3BlbkFJJHQSS3RlyjpqaasINqMo`
            },
            body: JSON.stringify({
                prompt: query,
                max_tokens: 150
            })
        });
        
        const data = await response.json();
        res.json({ response: data.choices[0].text });
    } catch (error) {
        console.error('Error fetching data from ChatGPT:', error);
        res.status(500).send('Error fetching data from ChatGPT');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
