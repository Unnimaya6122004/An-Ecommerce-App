import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path = 'login'}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        replace: true,
        state: location.pathname,
      });
    }

    return () => clearInterval(timer);
  }, [count, navigate, location, path]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', flexDirection: 'column' }}
    >
      <h1 className="mb-3">Redirecting in {count} seconds...</h1>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="mt-3 text-muted">Please wait...</div>
    </div>
  );
};

export default Spinner;
