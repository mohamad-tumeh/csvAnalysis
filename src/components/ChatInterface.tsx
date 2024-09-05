import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { useDataStore } from '../store/useCsvDataStore';

const ChatInterface: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const chatResponses = useDataStore((state) => state.chatResponses);
  const addChatResponse = useDataStore((state) => state.addChatResponse);
  const csvData = useDataStore((state) => state.csvData);

  const handleChat = async () => {
    if (!question || loading) return;

    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:3000/csv/chat`, { question, data: csvData });
      addChatResponse(response.data.answer || 'No answer returned');
      setLoading(false);
    } catch (error) {
      console.error('Error chatting with data:', error);
      addChatResponse('Error getting response from server.');
      setLoading(false);
    } finally {
      setLoading(false);
    }

    setQuestion('');
  };

  return (
    <div>
      <TextField
        label="Ask a question about your data"
        variant="outlined"
        fullWidth
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button
        onClick={handleChat}
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Ask'}
      </Button>
      {loading && <CircularProgress />}
      <Paper style={{ padding: 16, marginTop: 16 }}>
        <List>
          {chatResponses.map((response, index) => (
            <ListItem key={index}>
              <ListItemText primary={response} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default ChatInterface;
