import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    console.log('Received request:', { to, subject, text });

    try {
      const response = await axios.post(
        'https://api.resend.com/emails',
        {
          from: 'wesleyolivier443@gmail.com', // Add the `from` field here
          to,
          subject,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.YOUR_RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Email sent successfully:', response.data);
      return res.status(200).json({ message: 'Email sent successfully', data: response.data });
    } catch (error) {
      console.error('Error response:', error.response ? error.response.data : error.message);
      return res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
