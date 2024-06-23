import axios from 'axios';

export const sendEmail = async (to, subject, text) => {
  try {
    const response = await axios.post('/api/send-email', { to, subject, text });
    console.log('Email sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in sendEmail utility:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.error : 'Error sending email');
  }
};
