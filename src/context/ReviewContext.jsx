import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const useReviews = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('weiss_reviews');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        source: "New Construction",
        rating: 5,
        text: "Incredible attention to detail. The structural integrity is unmatched.",
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        id: 2,
        source: "Industrial Roofing",
        rating: 5,
        text: "Protocol executed perfectly. The new shield system withstood a massive storm last night with zero breaches.",
        date: new Date(Date.now() - 86400000 * 12).toISOString(),
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('weiss_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review) => {
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    setReviews([newReview, ...reviews]);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};
