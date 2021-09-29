import React, { useState } from 'react'
import { useEffect } from 'react';

function Quote() {

  const [quote, setQuote] = useState([]);

  useEffect(() => {
    const fetchQuote = async () => {
      await fetch(`https://type.fit/api/quotes`)
        .then(response => response.json())
        .then(data => {
          setQuote(data[Math.floor(Math.random() * data.length)]);
        })
    }
    fetchQuote();
  }, []);

  return (
    <div>
      <p>{quote.text}</p>
      <p>{quote.author}</p>
    </div >
  )
}

export default Quote;